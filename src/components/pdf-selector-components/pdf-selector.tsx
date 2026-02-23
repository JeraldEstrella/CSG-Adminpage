import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PdfRedactorModal from "../pdf-selector-modal/Pdf-selector-modal.tsx";
// @ts-ignore
import pdfjsLib from "./pdfjs.js"; //

interface Box {
  id: string;
  page: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PdfRedactor() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<string>("");
  const [pages, setPages] = useState<number[]>([]);
  const [pageSizes, setPageSizes] = useState<Record<number, { w: number; h: number }>>({});
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [draft, setDraft] = useState<Box | null>(null);

  // Drawing Handlers
  const onMouseDown = (e: React.MouseEvent, page: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setDraft({ id: crypto.randomUUID(), page, startX: x, startY: y, x, y, width: 0, height: 0 });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draft) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const cy = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setDraft(prev => prev ? ({
      ...prev,
      x: Math.min(prev.startX, cx),
      y: Math.min(prev.startY, cy),
      width: Math.abs(cx - prev.startX),
      height: Math.abs(cy - prev.startY)
    }) : null);
  };

  const onMouseUp = () => {
    if (draft && draft.width > 0.005) setBoxes(prev => [...prev, draft]);
    setDraft(null);
  };

  // PDF Loading & Rendering
  useEffect(() => {
    if (!file || !isOpen || !containerRef.current) return;
    
    async function renderPdf() {
      const pdf = await pdfjsLib.getDocument(file).promise;
      containerRef.current!.innerHTML = "";
      const sizes: Record<number, { w: number; h: number }> = {};

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        
        // PAGE WRAPPER
        const wrapper = document.createElement("div");
        wrapper.dataset.page = String(i);
        wrapper.className = "pdf-page-wrapper";
        wrapper.style.width = `${viewport.width}px`;
        wrapper.style.height = `${viewport.height}px`;

        const canvas = document.createElement("canvas");
        canvas.className = "pdf-canvas";
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        wrapper.appendChild(canvas);
        containerRef.current!.appendChild(wrapper);
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
        
        sizes[i] = { w: viewport.width, h: viewport.height };
      }
      setPages(Array.from({ length: pdf.numPages }, (_, i) => i + 1));
      setPageSizes(sizes);
    }
    renderPdf();
  }, [file, isOpen]);

  return (
    <div className="p-4">
      <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-2 rounded">
        Launch Redactor
      </button>

      <PdfRedactorModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Redaction Areas">
        <div className="flex flex-col h-full bg-gray-500 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 bg-white border-b flex justify-between z-50">
            <input type="file" accept="application/pdf" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(URL.createObjectURL(f));
            }} />
            <button onClick={() => setBoxes(prev => prev.slice(0, -1))} className="border px-4 py-1 rounded">Undo</button>
          </div>

          {/* PDF Pages */}
          <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
            <div ref={containerRef} className="relative" />
            {pages.map(p => {
              const target = document.querySelector(`[data-page="${p}"]`);
              if (!target || !pageSizes[p]) return null;

              return createPortal(
                <svg
                  onMouseDown={(e) => onMouseDown(e, p)}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  className="selection-overlay-svg"
                  width={pageSizes[p].w}
                  height={pageSizes[p].h}
                >
                  {boxes.filter(b => b.page === p).map(box => (
                    <rect key={box.id} x={box.x * pageSizes[p].w} y={box.y * pageSizes[p].h} 
                          width={box.width * pageSizes[p].w} height={box.height * pageSizes[p].h}
                          fill="rgba(0,0,0,0.5)" stroke="#000" />
                  ))}
                  {draft?.page === p && (
                    <rect x={draft.x * pageSizes[p].w} y={draft.y * pageSizes[p].h}
                          width={draft.width * pageSizes[p].w} height={draft.height * pageSizes[p].h}
                          fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeDasharray="4" />
                  )}
                </svg>,
                target
              );
            })}
          </div>
        </div>
      </PdfRedactorModal>
    </div>
  );
}
