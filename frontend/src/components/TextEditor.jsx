// import React, { useRef, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './texteditor.css';

// const TextEditor = () => {
//   const [editorHtml, setEditorHtml] = useState('');
//   const quillRef = useRef(null)
//   const handleQuillChange = (html) => {
//     setEditorHtml(html);
//   };
//   // let quillRef;

//   const handleFormat = (e,format) => {
//     // e.target.classList.toggle("highLight")
//     if(quillRef){

//       const quill = quillRef.getEditor();
//       quill.format(format, !quill.getFormat()[format]);
//     }
//   };

//   const formats = [
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet', 'link', 'image',
//     'blockquote', 'code-block', 'align', 'background', 'color',
//   ];


//   return (
//     <div className="text-editor-container">
//       <div className="editor-toolbar">
//         {formats.map(format => (
//           <button
//             key={format}
//             className={`toolbar-button ${ quillRef && quillRef.getEditor().getFormat()[format] ? 'highLight' : ''}`}
//             onClick={(e) => handleFormat(e,format)}
//           >
//             <i className={`fas fa-${format}`} />
//           </button>
//         ))}
//       </div>
//       <ReactQuill
//          ref={(el) => { quillRef = el; }}
//         value={editorHtml}
//         onChange={handleQuillChange}
//         placeholder="Compose your blog..."
//         modules={{
//           toolbar: false,
//         }}
//       />
//       <div className="editor-actions">
//         <button onClick={() => console.log(editorHtml)} className="save-button">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TextEditor;

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
    <div className="w-4/5 h-full m-auto mt-6">
      <ReactQuill
      theme="snow"
      className=" h-[600px]"
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
      <div className="flex justify-end mx-1">
        <button onClick={saveContent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  </div>
  );
};

export default TextEditor;
