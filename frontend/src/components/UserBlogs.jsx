import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Server_url from "../Utils/server_url";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const UserBlogs = () => {
  const Token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const [blogs, setBlogs] = useState([]);
  const [noMatch, setNoMatch] = useState(null);
  const [matchArray, setMatchArray] = useState([]);

  function findMatches(wordToMatch, blogs) {
    return blogs.filter((blog) => {
      let regex;
      try {
        regex = new RegExp(wordToMatch, "gi");
      } catch (e) {
        if (blog.title != null) {
          return blog.title;
        }
      }
      if (blog.title != null) {
        return blog.title.match(regex);
      }
    });
  }
  function handleSearch(e) {
    // console.log(e);
    const matchArray = findMatches(e.target.value, blogs);
    // console.log(matchArray);
    if (e.target.value.length > 0) {
      if (matchArray.length === 0) {
        setNoMatch("no");
      } else {
        setMatchArray(matchArray);
        setNoMatch(null);
      }
    } else {
      setNoMatch(null);
      setMatchArray(blogs);
    }
  }
  //   useEffect(() => {
  //     axios
  //       .get(`${url}`, {
  //         headers: {
  //           Authorization: `Bearer ${Token}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.status == "success") {
  //           setPosts(res.data.data);
  //           setMatchArray(res.data.data);
  //         } else {
  //           toast.error(res.data.message)
  //         }
  //       })
  //       .catch((e) => {
  //         toast.error("Error fetching posts");
  //       });
  //   }, []);

  function deletepost(e, pid) {
    // console.log(pid)
    const idLoad = toast.loading("Please wait, deleting post...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios
      .delete(`${Server_url}api/blogs/delete/${pid}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        // console.log(res)
        // if (res.data.status == "success") {
        //   toast.success("Post Deleted", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 1000,
        //   });
       

        axios
          .get(`${Server_url}api/blogs/getuserblog`, {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
            // console.log(res);
            //   setPosts(res.data.data);
            //   setMatchArray(res.data.data);
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Successfuly deleted the blog.",
                  type: "success",
                  isLoading: false,
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              },
              [500]
            );
          })
          .catch((e) => {
            //   toast.error("Error deleting posts");
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Error deleting post.",
                  type: "error",
                  isLoading: false,
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              },
              [500]
            );
            console.log(e);
          });
        // } else {
        // console.log("error")
        //   toast.error(res.data.message)
        // }
      })
      .catch((err) => {
        // toast.error("Error deleting posts");
        setTimeout(
          function () {
            toast.update(idLoad, {
              render: "Error deleting post.",
              type: "error",
              isLoading: false,
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          },
          [500]
        );
        console.log(err);
      });
  }

  function handleLike(e, id) {
    const idLoad = toast.loading("Please wait, saving in backend...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios
      .post(
        `${Server_url}api/blogs/getisLiked`,
        {
          blogId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.isLiked === true) {
          axios
            .post(
              `${Server_url}api/blogs/dislikeblog`,
              { blogId: id },
              {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              axios
                .get(`${Server_url}api/blogs/getuserblog`, {
                  headers: {
                    Authorization: `Bearer ${Token}`,
                  },
                })
                .then((res) => {

                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              //   toast.error("Error unliking the post");
              setTimeout(
                function () {
                  toast.update(idLoad, {
                    render: "Error unliking the post",
                    type: "error",
                    isLoading: false,
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                  });
                },
                [500]
              );
              console.log(e);
            });
        } else {
          axios
            .post(
              `${Server_url}api/blogs/likeblog`,
              { blogId: id },
              {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              axios
                .get(`${Server_url}api/blogs/getuserblog`, {
                  headers: {
                    Authorization: `Bearer ${Token}`,
                  },
                })
                .then((res) => {
                  // console.log(res);
                  // setPosts(res.data.data);
                  // setMatchArray(res.data.data);
                  setTimeout(
                    function () {
                      toast.update(idLoad, {
                        render: "Your blogs are here.",
                        type: "success",
                        isLoading: false,
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                      });
                    },
                    [500]
                  );
                })
                .catch((e) => {
                  // toast.error("Network Error");
                  setTimeout(
                    function () {
                      toast.update(idLoad, {
                        render: "Network Error",
                        type: "error",
                        isLoading: false,
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                      });
                    },
                    [500]
                  );
                  console.log(e);
                });
            })
            .catch((e) => {
              //   toast.error("Error liking the post");
              setTimeout(
                function () {
                  toast.update(idLoad, {
                    render: "Error Liking the post",
                    type: "error",
                    isLoading: false,
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                  });
                },
                [500]
              );
              console.log(e);
            });
        }
      })
      .catch((err) => {
        setTimeout(
          function () {
            toast.update(idLoad, {
              render: "Error Liking the post",
              type: "error",
              isLoading: false,
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          },
          [500]
        );
        console.log(e);
        return false;
      });
  }

  // function isLiked(bid) {
  //   axios
  //     .post(`${Server_url}api/blogs/getisLiked`, {
  //       blogId: bid,
  //     },{
  //       headers: {
  //         Authorization: `Bearer ${Token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.isLiked)
  //       if(res.data.isLiked===true){
  //         return true;
  //       }
  //       else{
  //         return false
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return false;
  //     });
  // }
  useEffect(() => {
    const id = toast.loading("Fetching Blogs...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios
      .get(`${Server_url}api/blogs/getuserblog`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBlogs(res.data.blog);
        setMatchArray(res.data.blog);
        setTimeout(
          function () {
            toast.update(id, {
              render: "Your blogs are here.",
              type: "success",
              isLoading: false,
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          },
          [500]
        );
      })
      .catch((e) => {
        //   toast.error("Error deleting posts");
        setTimeout(
          function () {
            toast.update(id, {
              render: "Error getting posts",
              type: "error",
              isLoading: false,
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          },
          [500]
        );
        console.log(e);
      });
  }, []);

  return (
    <section>
      <section className="overflow-y-scroll h-screen noscrollbar py-6  min-h-screen .overflow-auto .overscroll-auto">
        {matchArray.length > 0 && (
          <h3 className="m-4 text-gray-800 text-3xl font-semibold sm:text-4xl">
            Manage Blogs -
          </h3>
        )}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 ">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              onChange={(e) => {
                handleSearch(e);
              }}
              type="text"
              placeholder="Search Posts"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>

          <div className="mt-12 flex justify-center ">
            <ul className="grid gap-8 sm:grid-cols-1 w-4/5  md:grid-cols-2">
              {matchArray.length !== 0 && noMatch && (
                <span className="block text-gray-700 text-sm font-semibold">
                  No match found
                </span>
              )}
              {matchArray.length === 0 && (
                <span className="block text-gray-700 text-sm font-semibold">
                  You have no blogs. Please Add a New Blog.
                </span>
              )}
              {noMatch == null &&
                matchArray.length > 0 &&
                matchArray.map((item, idx) => (
                  <Link to={item.id} key={idx} className="border-2 p-4 shadow-md rounded-md">
                    <div className="py-4 px-4">
                      <div className="flex items-center gap-x-4">
                        <div>
                          <h3 className="block mt-px text-black text-md font-medium">
                            {item.title}
                          </h3>
                          <span className="block text-gray-700 text-sm font-semibold">
                            {username}
                          </span>

                          <p className="block mt-px text-gray-600 text-xs">
                            {item.createdAt.split("T")[0]}
                          </p>
                        </div>
                        <div className="flex items-center justify-center ml-auto">
                          <div
                            className="cursor-pointer"
                            onClick={(e) => deletepost(e, item.id)}
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
                      <p className="text-gray-600 mt-2">{item.Description}</p>
                      <div className="mt-3 flex items-center gap-4 text-gray-700">
                        <button>
                          <FaHeart
                            onClick={(e) => {
                              handleLike(e, item.id);
                            }}
                            style={{
                              color: "red",
                                // isLiked(item.id) === true ? "red" :"#ddd",
                              fontSize: "28px",
                            }}
                          />
                        </button>
                        <span className=" -mt-1 block text-gray-700 text-lg font-semibold">
                          {item.likes}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
    // <div>hello</div>
  );
};
