import React, { useEffect ,useState} from "react";
import "./register.css"

import Server_url from "../Utils/server_url"
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export function loader({ request }) {
  if (sessionStorage.getItem("token") !== null) {
    throw redirect("/dashboard?message=AlreadyLogin");
  }
  return null;
}

const Register = () => {
  const navigate=useNavigate()
  const [signup,setSignup]=useState({
    email:"",
    password:"",
    username:"",
    location:"rajasthan"
  }) 
  const [signin,setSignin]=useState({
    email:"",
    password:"",
  })
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if(sign_up_btn && container)
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  if(sign_in_btn && container)
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
  
  }, [])
  
  
  function handleSignupChange(e){
    const {name,value}=e.target;
    setSignup(prev=>({...prev,[name]:value}));
  }

  function handleSigninChange(e){
    const {name,value}=e.target;
    setSignin(prev=>({...prev,[name]:value}));
  }
  function handleSignin(e){
    console.log(signin)
    e.preventDefault();
    const idLoad = toast.loading("Checking Credentials...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios.post(`${Server_url}api/users/login`,signin)
    .then((res)=>{
      sessionStorage.setItem("token",res.data.user.token)
      sessionStorage.setItem("email",res.data.user.email)
      sessionStorage.setItem("username",res.data.user.username)
      sessionStorage.setItem("userId", res.data.user.id)
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Welcome to BlogBunny",
            type: "success",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      navigate("/dashboard")

      console.log(res)
    })
    .catch((err)=>{
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Invalid Credentials",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      console.log(err)
    })
  }
  
  function handleSignup(e){
    e.preventDefault();
    const idLoad = toast.loading("Checking Credentials...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios.post(`${Server_url}api/users/register`,signup)
    .then((res)=>{
      sessionStorage.setItem("token",res.data.user.token)
      sessionStorage.setItem("email",res.data.user.email)
      sessionStorage.setItem("username",res.data.user.username)
      sessionStorage.setItem("userId", res.data.user.id)
      navigate("/dashboard")
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Welcome to BlogBunny",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      console.log(res)  
    })
    .catch((err)=>{
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Invalid Credentials",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      console.log(e);
      console.log(err)
    })
  }
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSignin} className="sign-in-form">
              <h2 className="title">Welcome Back!!</h2>
              <div className="input-field">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input type="email" name="email" onChange={handleSigninChange} placeholder="Email" />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input type="password" name="password" onChange={handleSigninChange} placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              
            </form>
            <form onSubmit={handleSignup} className="sign-up-form">
              <h2 className="title">Welcome to BlogIt</h2>
              <div className="input-field">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
                <input type="text" name="username" onChange={handleSignupChange} placeholder="Username" />
              </div>
              <div className="input-field">
                <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input type="email" name="email" onChange={handleSignupChange} placeholder="Email" />
              </div>
              <div className="input-field">
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input type="password" name="password" onChange={handleSignupChange} placeholder="Password" />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Register Now and Get Started today...
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already Registered?</h3>
              <p>
                Sign In , Publish your Passions, your way
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

// <div className={`relative w-full bg-white min-h-screen overflow-hidden before:content-[''] before:absolute before:h-[2000px] before:w-[2000px] before:top-[-10%] before:-translate-y-2/4 before:bg-[linear-gradient(-45deg,#4481eb_0%,#04befe_100%)] before:transition-[1.8s] before:duration-[ease-in-out] before:z-[6] before:rounded-[50%] before:right-[48%] ${mode==="up" ? "before:translate-x-full before:-translate-y-2/4 before:right-[52%]":""}`}>
//  <div className="absolute w-full h-full left-0 top-0">
// <div className={`absolute -translate-x-2/4 -translate-y-2/4 w-6/12 transition-[1s] duration-[0.7s] ease-[ease-in-out] grid grid-cols-[1fr] z-[5] left-3/4 top-2/4 ${mode==="up"?"left-1/4":""} `}>
// <form className={`flex items-center justify-center flex-col transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0 z-[2] ${mode==="up"?"opacity-0 z-[1]":""}`}>
//            <h2 className="text-[2.2rem] text-[#444] mb-2.5">Sign in</h2>
//            <div className="max-w-[380px] w-full bg-[#f0f0f0] h-[55px] grid grid-cols-[15%_85%] relative mx-0 my-2.5 px-[0.4rem] py-0 rounded-[55px]">
//              <i className="text-center leading-[55px] text-[#acacac] transition-[0.5s] text-[1.1rem] fas fa-user"></i>
//              <input className='font-semibold text-[1.1rem] text-[#333] border-[none] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium' type="text" placeholder="Username" />
//            </div>
//            <div className="max-w-[380px] w-full bg-[#f0f0f0] h-[55px] grid grid-cols-[15%_85%] relative mx-0 my-2.5 px-[0.4rem] py-0 rounded-[55px]">
//              <i className="text-center leading-[55px] text-[#acacac] transition-[0.5s] text-[1.1rem] fas fa-lock"></i>
//              <input className='font-semibold text-[1.1rem] text-[#333] border-[none] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium' type="password" placeholder="Password" />
//            </div>
//            <input className='font-semibold text-[1.1rem] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium w-[150px] bg-[#5995fd] h-[49px] text-white uppercase cursor-pointer transition-[0.5s] mx-0 my-2.5 rounded-[49px] border-[none] hover:bg-[#4d84e2] ' type="submit" value="Login" />
//            <p className="text-base px-0 py-[0.7rem]">Or Sign in with social platforms</p>
//            <div className="flex justify-center">
//              <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//                <i className="fab fa-facebook-f"></i>
//              </p>
//              <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//                <i className="fab fa-twitter"></i>
//              </p>
//              <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//                <i className="fab fa-google"></i>
//              </p>
//              <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//                <i className="fab fa-linkedin-in"></i>
//              </p>
//            </div>
//          </form>
//          {/* signup   */}
//         <form className={`flex items-center justify-center flex-col transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0 opacity-0 z-[1] ${mode==="up"?"opacity-100 z-[2]":""}`}>
//           <h2 className="text-[2.2rem] text-[#444] mb-2.5">Sign up</h2>
//           <div className="max-w-[380px] w-full bg-[#f0f0f0] h-[55px] grid grid-cols-[15%_85%] relative mx-0 my-2.5 px-[0.4rem] py-0 rounded-[55px]">
//             <i className="text-center leading-[55px] text-[#acacac] transition-[0.5s] text-[1.1rem] fas fa-user"></i>
//             <input className='font-semibold text-[1.1rem] text-[#333] border-[none] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium' type="text" placeholder="Username" />
//           </div>
//           <div className="max-w-[380px] w-full bg-[#f0f0f0] h-[55px] grid grid-cols-[15%_85%] relative mx-0 my-2.5 px-[0.4rem] py-0 rounded-[55px]">
//             <i className="text-center leading-[55px] text-[#acacac] transition-[0.5s] text-[1.1rem] fas fa-envelope"></i>
//             <input className='font-semibold text-[1.1rem] text-[#333] border-[none] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium' type="email" placeholder="Email" />
//           </div>
//           <div className="max-w-[380px] w-full bg-[#f0f0f0] h-[55px] grid grid-cols-[15%_85%] relative mx-0 my-2.5 px-[0.4rem] py-0 rounded-[55px]">
//             <i className="text-center leading-[55px] text-[#acacac] transition-[0.5s] text-[1.1rem] fas fa-lock"></i>
//             <input className='font-semibold text-[1.1rem] text-[#333] border-[none] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium' type="password" placeholder="Password" />
//           </div>
//           <input className='font-semibold text-[1.1rem] border-[none] outline-none bg-transparent placeholder:text-[#aaa] placeholder:font-medium w-[150px] bg-[#5995fd] h-[49px] text-white uppercase cursor-pointer transition-[0.5s] mx-0 my-2.5 rounded-[49px] hover:bg-[#4d84e2]' type="submit" value="Sign up" />
//           <p className="text-base px-0 py-[0.7rem]">Or Sign up with social platforms</p>
//           <div className="flex justify-center">
//             <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//               <i className="fab fa-facebook-f"></i>
//             </p>
//             <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//               <i className="fab fa-twitter"></i>
//             </p>
//             <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//               <i className="fab fa-google"></i>
//             </p>
//             <p className="h-[46px] w-[46px] flex justify-center items-center text-[#333] border no-underline text-[1.1rem] transition-[0.3s] mx-[0.45rem] my-0 rounded-[50%] border-solid border-[#333] hover:text-[#4481eb] hover:border-[#4481eb]">
//               <i className="fab fa-linkedin-in"></i>
//             </p>
//           </div>
//      </form>
//      </div>
//   </div>
//    {/* panel container  */}
//     <div className="absolute h-full w-full grid grid-cols-[repeat(2,1fr)] left-0 top-0">
//   {/* left panel  */}
//   <div className={`flex flex-col items-end justify-around text-center z-[6] pl-[12%] pr-[17%] pt-12 pb-8 ${mode==="up"?"pointer-events-none":""}`}>
//     <div className={`text-white transition-transform duration-[0.9s] ease-[ease-in-out] delay-[0.6s] ${mode==="up"?"translate-x-[-800px]":""}`}>
//       <h3 className='font-semibold leading-none text-2xl'>New here ?</h3>
//       <p className='text-[0.95rem] px-0 py-[0.7rem]'>
//         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
//         ex ratione. Aliquid!
//       </p>
//       <button className="outline-none bg-[#5995fd] text-white uppercase cursor-pointer transition-[0.5s] mx-0 my-2.5 rounded-[49px] border-[none] hover:bg-[#4d84e2] w-[130px] h-[41px] font-semibold text-[0.8rem] m-0 border-2 border-solid border-white bg-transparent" id="sign-up-btn" onClick={()=>{setMode("up")}}>
//         Sign up
//       </button>
//     </div>
//     <img src="img/log.svg" className={`w-full transition-transform duration-[1.1s] ease-[ease-in-out] delay-[0.4s] ${mode==="up"?"translate-x-[-800px]":""} `} alt="" />
//   </div>
//   {/* right panel  */}
//   <div className={`flex flex-col items-end justify-around text-center z-[6] pointer-events-none pl-[17%] pr-[12%] pt-12 pb-8 ${mode==="up"?"pointer-events-auto":""}`}>
//     <div className={`text-white transition-transform duration-[0.9s] ease-[ease-in-out] delay-[0.6s] translate-x-[800px] ${mode==="up"?"translate-x-[0%]":""}`}>
//       <h3 className='font-semibold leading-none text-2xl'>One of us ?</h3>
//       <p className='text-[0.95rem] px-0 py-[0.7rem]'>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
//         laboriosam ad deleniti.
//       </p>
//       <button className="outline-none bg-[#5995fd] text-white uppercase cursor-pointer transition-[0.5s] mx-0 my-2.5 rounded-[49px] border-[none] hover:bg-[#4d84e2] w-[130px] h-[41px] font-semibold text-[0.8rem] m-0 border-2 border-solid border-white bg-transparent" id="sign-in-btn" onClick={()=>{setMode("in")}}>
//         Sign in
//       </button>
//     </div>
//     <img src="img/register.svg" className={`w-full transition-transform duration-[1.1s] ease-[ease-in-out] delay-[0.4s] translate-x-[800px] ${mode==="up"?"translate-x-[0%]":""}`} alt="" />
//   </div>
//     </div>
// </div>
