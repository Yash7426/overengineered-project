import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const TextEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  // Handle Quill changes
  const handleQuillChange = (html) => {
    setEditorHtml(html);
  };

  // Handle saving the content
  const saveContent = () => {
    console.log(editorHtml)
    // You can send `editorHtml` to your backend for storage
  };

  return (
    <div className="w-screen">
    <div className="w-4/5 m-auto mt-6">
      <ReactQuill
        value={editorHtml}
        onChange={handleQuillChange}
        placeholder="Compose your blog..."
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'], // Added 'video' option
            [{ color: [] }, { background: [] }], // Text color and background color
            ['blockquote', 'code-block'], // Blockquote and code block
            [{ align: [] }], // Text alignment
            ['clean'], // Remove formatting
          ],
        }}
      />
      <div className="flex justify-end mt-2">
        <button onClick={saveContent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  </div>
  );
};

export default TextEditor;
