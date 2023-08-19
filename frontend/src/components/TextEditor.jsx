import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import { IoMdSend } from "react-icons/io";
import Accordian from "./Accordian";
import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";
export function loader({ request }) {
  if (sessionStorage.getItem("token") === null) {
    throw redirect("/?message=PleaseLogin");
  }
  return null;
}
const TextEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  // Handle Quill changes

  const handleQuillChange = async (html) => {
    try {
      const imageTags = html.match(/<img[^>]+src="([^">]+)"/g);

      if (imageTags) {
        for (const imgTag of imageTags) {
          const imgUrl = imgTag.match(/src="([^"]+)"/)[1];

          if (imgUrl.startsWith("data:image")) {
            // Image is in base64 format, upload to Cloudinary
            setUploadingImage(true);
            const formData = new FormData();
            formData.append("file", imgUrl);
            // Replace with your upload preset
            formData.append("cloud_name", "dvyl9zjkp");
            formData.append("upload_preset", "an7tddha");
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dvyl9zjkp/image/upload",
              {
                method: "post",
                body: formData,
              }
            );
            const imgData = await response.json();
            const newImgSrc = imgData.url.toString();
            html = html.replace(imgUrl, newImgSrc); // Replace with Cloudinary URL
          }
        }
      }

      setEditorHtml(html);
    } catch (error) {
      
    } finally {
      setUploadingImage(false);
    }

    // setEditorHtml(html);
  };

  // Handle saving the content
  const saveContent = async () => {
      if(!title){
       return toast.error("Please provide title.");
      }
      if(!label){
        return toast.error("Please provide label")
      }
      if(!editorHtml){
        return toast.error("Please write something.")
      }
      const formdata= {
        title,
        label,
        description: editorHtml
      }
      try {
        const postBlog =await axios.post("http://localhost:5000/api/blogs/create", formdata);
        console.log(postBlog.data);
      } catch (error) {
        return toast.error("Something went wrong.")
      }
  };

  return (
    <div className="min-w-screen min-h-screen">
      <Navbar />
      <hr className="border-t border-gray-300 my-3 hidden md:block" />
      <div className="h-full flex  flex-col ">
        <div className="w-full  flex justify-between items-center py-1 px-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle((prev)=> (e.target.value))}
            className="focus:outline-none border-b-2 md:w-[85%] w-[58%] md:m-0 mr-1 border-indigo-400 px-5  text-lg"
          />
          <input
            type="text"
            placeholder="label"
            value={label}
            onChange={(e)=>setLabel((prev)=> (e.target.value))}
            className="focus:outline-none md:hidden block border-b-2 w-[25%] border-indigo-400 px-5 py-1  text-sm"
          />
          
          <button className=" px-3 py-2 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-md min-w-[50px] min-h-[30px] shadow md:inline">
            <div className="flex justify-center items-center  md:space-x-2 text-lg"  onClick={saveContent}>
              <IoMdSend className="text-lg inline-block  " />
              <div className="md:block hidden pl-3 border-indigo-200 font-normal border-l">
                Publish
              </div>
            </div>
          </button>
        </div>
        <div className="w-full flex">
          <div className="md:w-[85%] w-full flex  md:border-r-2 px-1 md:px-7 mt-1 h-[40.5rem]">
            <ReactQuill
              theme="snow"
              className="h-[38rem] w-full"
              value={editorHtml}
              onChange={handleQuillChange}
              placeholder="Compose your blog..."
              readOnly={uploadingImage}
              modules={TextEditor.modules}
              formats={TextEditor.formatArray}
            />
          </div>
          <Accordian label={label} setLabel={setLabel} />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;

TextEditor.formatArray = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

TextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"], // Added 'video' option
    [{ color: [] }, { background: [] }], // Text color and background color

    [{ align: [] }], // Text alignment
    ["clean"], // Remove formatting
  ],
};
