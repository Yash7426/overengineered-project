import axios from "axios";
import React, { useEffect, useState } from "react";
import Server_url from "../Utils/server_url";

const Comments = ({ bid }) => {
  const [comments, setComments] = useState([]);
  const Token = sessionStorage.getItem("token");

  useEffect(() => {
    function showComments(bid) {
      axios
        .post(
          `${Server_url}api/comments/getcomment`,
          {
            blogId: bid,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setComments(res.data.comments);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    showComments(bid);
  }, []);
  function deleteComment(e,cid, bid) {
    axios
      .delete(
        `${Server_url}api/comments/delete/${cid}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        // if (res.data.status == "success") {
        //   toast.success("Comment Deleted", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 1000,
        //   });
        axios
          .post(
            `${Server_url}api/comments/getcomment`,
            { blogId: bid },
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            //   setPosts(res.data.data);
            console.log(res);
            //   setMatchArray(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
        // } else {
        //   toast.error(res.data.message)
        // }
      })
      .catch((e) => {
        // toast.error("Error deleting comment");
        console.log(e);
      });
  }
  function addComment(e) {
    const desc=e.target[0].value;
    // send blogId and description
    const data = { description: desc, blogId: bid };
    axios
      .post(`${Server_url}api/comments/add`, data, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        e.target[0].value="";
        console.log(res);
        //   if (res.data.status == "success") {
        // let newar = posts.map((item) => {
        //   if (item.postId == comm) {
        //     return { ...item, comments: res.data.data };
        //   } else {
        //     return item;
        //   }
        // });
        console.log(res);
        // setPosts(newar);
        // setMatchArray(newar);
        //   } else {
        // toast.error(res.data.message)
        //   }
      })
      .catch((w) => {
        //   toast.error("Error adding comment");
        console.log(w);
      });
  }

  return (
    <>
      {comments.length === 0 && <div>No Comments</div>}
      {comments.length > 0 && (
        <>
          <span className="block text-gray-700 text-sm font-semibold mt-3">
            Comments
          </span>
          <ol className="h-20 overflow-y-scroll ">
            {comments.map((ite, id) => {
              return (
                <li key={id}>
                  <div className="py-4 px-4 border mt-1">
                    <div className="flex items-between gap-x-4">
                      <div className="flex-col items-start gap-x-4">
                        <div className="flex gap-x-4 justify-between">
                          <span className="block text-gray-700 text-sm font-semibold">
                            {ite.name}
                          </span>
                          <p className="block mt-px text-gray-600  text-xs">
                            {ite.createdAt.split("T")[0]}
                          </p>
                        </div>
                        <p className="block mt-px text-gray-600  text-xs">
                          {ite.description}
                        </p>
                      </div>

                      <div
                        className="ml-auto cursor-pointer"
                        onClick={(e) => deleteComment(e,ite.id, bid)}
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
                </li>
              );
            })}
          </ol>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment(e);
            }}
            className="mt-5 bottom-0 sm:flex flex-col items-center justify-center "
          >
            <textarea
              rows={1}
              placeholder="Comment"
              className="text-gray-500  p-3 rounded-md border outline-none focus:border-indigo-600"
            ></textarea>
            <button className=" mt-3 px-5 py-3 rounded-md text-white hover:bg-gray-200 active:bg-black-700 duration-150 outline-none shadow-md focus:shadow-none  sm:mt-0 sm:ml-3 sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
              >
                <path d="M16,464,496,256,16,48V208l320,48L16,304Z" />
              </svg>
            </button>
          </form>
        </>
      )}

      <div></div>
    </>
  );
};

export default Comments;
