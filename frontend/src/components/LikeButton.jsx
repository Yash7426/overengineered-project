import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Server_url from "../Utils/server_url";
import { FaHeart } from 'react-icons/fa';
const LikeButton = ({blogId}) => {
    const Token = sessionStorage.getItem("token");
    const [isLiked, setIsliked] = useState(false);
    function handleLike(e, id) {
        const idLoad = toast.loading("Please wait, processing...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        
            if (isLiked === true) {
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
                    setTimeout(
                        function () {
                          toast.update(idLoad, {
                            render: "Thank you for waiting.",
                            type: "success",
                            isLoading: false,
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                          });
                        },
                        [500]
                      );
                 setIsliked(false);
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
                  setIsliked(true)
                  setTimeout(
                    function () {
                      toast.update(idLoad, {
                        render: "Thank you for waiting.",
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
         
      }
      const checkIsLiked = async() =>{
        try {
            const response = await axios.post("http://localhost:5000/api/blogs/getisLiked", {
                blogId:blogId
            })
    
            // console.log(response.data);
            setIsliked(response.data.isLiked)
            
        } catch (error) {
            toast.error("Something went wrong.")
        }
      }
      useEffect(()=>{
        checkIsLiked();
      },[])
  return (
    <button
    onClick={(e) => {
      e.stopPropagation();
      handleLike(e, blogId);
    }}
    
    >
    <FaHeart
      style={{
        color: isLiked?"red": "",

        // isLiked(item.id) === true ? "red" :"#ddd",
        fontSize: "28px",
      }}
    />
  </button>
  )
}

export default LikeButton
