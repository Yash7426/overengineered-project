import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Server_url from "../Utils/server_url";
import Comments from "./Comments";
import { FaHeart } from "react-icons/fa";

const SingleBlog = () => {
  const Token = sessionStorage.getItem("token");
  const [blog,setBlog]=useState(null);
  const username = sessionStorage.getItem("username");
  const params = useParams();
  useEffect(() => {
    axios.get(`${Server_url}api/blogs/getblogbyId/${params.id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((res)=>{
        setBlog(res.data);
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    });    
  }, []);

  return (
    <>
    {blog===null && <div>Invalid Blog Id</div>}
    {blog && 
          <div className="border-2 p-4 shadow-md rounded-md">
                    <div className="py-4 px-4">
                      <div className="flex items-center gap-x-4">
                        <div>
                          <h3 className="block mt-px text-black text-md font-medium">
                            {blog.title}
                          </h3>
                          <span className="block text-gray-700 text-sm font-semibold">
                            {username}
                          </span>

                          <p className="block mt-px text-gray-600 text-xs">
                            {blog.createdAt.split("T")[0]}
                          </p>
                        </div>
                        <div className="flex items-center justify-center ml-auto">
                          <div
                            className="cursor-pointer"
                            // onClick={(e) => deletepost(e, blog.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-600 mt-2">{blog.Description}</p>
                      <div className="mt-3 flex items-center gap-4 text-gray-700">
                        <button>
                          <FaHeart
                            onClick={(e) => {
                            //   handleLike(e, blog.id);
                            }}
                            // isLiked(item.id) === true ? "red" :
                            style={{
                              color: "#ddd",
                              fontSize: "28px",
                            }}
                          />
                        </button>
                        <span className=" -mt-1 block text-gray-700 text-lg font-semibold">
                          {blog.likes}
                        </span>
                      </div>
                    </div>
                    <Comments bid={params.id} />
                  </div>
}
    </>
  );
};

export default SingleBlog;
