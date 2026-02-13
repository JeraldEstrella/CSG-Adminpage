import React, { useRef, useState } from 'react';
import './form.css';

interface FormProps {
  forType: 'announcement' | 'document';
  id?: string | null;
  setOpen: (open: boolean) => void;
}

const Form = ({ forType, id, setOpen }: FormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const url =
    forType === 'announcement'
      ? `/api/announcement/${id ? `update/${id}` : 'upload'}`
      : `/api/document/${id ? `update/${id}` : 'upload'}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const file = fileInputRef.current?.files?.[0];

    formData.append('title', title);
    formData.append('description', description);

    if (file) {
      formData.append('image', file);
    }

    fetch(url, {
      method: 'POST',
      body: formData,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className='form-container'>
      <div className='form-header'>
        <h2>Add New File</h2>
      </div>
      <form className='form-layout' onSubmit={handleSubmit}>
        <div className='form-fields'>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              placeholder='System Maintenance'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              placeholder='Scheduled maintenance for system updates...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className='image-upload'>
          <label>Image</label>
          <div
            className={`image-preview${preview ? ' has-image' : ''}`}
            id='imagePreview'
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          >
            {!preview ? (
              <div className='image-placeholder'>
                <div className='upload-icon'>📁</div>
                {forType === 'announcement' ? (
                  <div className='upload-text'>
                    <strong>Click to upload</strong> or drag and drop
                    <br />
                    PNG, JPG up to 10MB
                  </div>
                ) : (
                  <div className='upload-text'>
                    <strong>Click to upload</strong> <br />
                    File
                  </div>
                )}
              </div>
            ) : (
              <img id='previewImage' alt='Preview' src={preview} />
            )}
          </div>
          <input
            type='file'
            id='fileInput'
            accept='image/*'
            ref={fileInputRef}
            name='file'
            placeholder='image'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className='form-actions'>
          <button
            type='button'
            className='btn btn-cancel'
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-submit'>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
