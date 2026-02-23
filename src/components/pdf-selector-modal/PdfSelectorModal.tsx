import React from "react";
import './pdf-selector-modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function PdfRedactorModal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-content-area">
          <div className="pdf-viewer-centered-stack">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
