import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const [animation, setanimation] = useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row items-center md:justify-center">
      <div className="w-full md:w-[25%] h-[30%] px-5 md:px-0 mt-5 md:mt-0 md:h-[60%] lg:h-[75%] md:rounded-bl-2xl md:rounded-tl-2xl overflow-hidden shrink-0">
        <i
          className="ri-arrow-left-line text-white text-2xl block md:hidden"
          onClick={() => {
            navigate(-1);
          }}
        ></i>
        <img
          src="https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover object-center rounded-xl md:rounded-none"
        />
      </div>
      <div className="w-[100%] md:w-[50%] lg:w-[40%] md:h-[60%] lg:h-[75%] relative md:bg-[#1F1F2D] flex justify-center md:rounded-br-2xl md:rounded-tr-2xl shrink-0">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="w-12 h-12 bg-[#ef233eec] md:rounded-tr-xl  md:rounded-bl-xl md:flex items-center justify-center absolute top-0 right-0 z-[101] cursor-pointer hidden"
        >
          <i className="ri-close-fill text-3xl text-white"></i>
        </div>
        <div className="w-[90%] md:w-[70%] flex justify-center items-center overflow-hidden">
          <div
            className={`w-full shrink-0 ${
              animation ? "-translate-x-[51%]" : "translate-x-[50%]"
            } duration-300`}
          >
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-300 mt-5 md:mt-8">
              Welcome back,
            </h1>
            <p className="text-zinc-400">Sign in to your account</p>
            <div className="w-full flex flex-col justify-center mt-5 md:mt-15 relative">
              <input
                type="text"
                placeholder="Username"
                className="duration-300 w-full text-lg py-2 px-4 border-[1.5px] focus:border-[#EF233D] border-[#747482] rounded-lg outline-none text-zinc-400"
              />
              <i className="ri-user-line text-lg text-zinc-400 absolute right-5"></i>
            </div>
            <div className="w-full flex flex-col mt-5 md:mt-8 relative justify-center">
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="duration-300 w-full text-lg py-2 px-4 border-[1.5px] focus:border-[#EF233D] border-[#747482] rounded-lg outline-none text-zinc-300"
              />
              <i className="ri-lock-password-line text-lg text-zinc-400 absolute right-5"></i>
            </div>
            <div className="w-full flex items-center justify-between mt-5">
              <div className="flex">
                <input type="checkbox" />
                <h2 className="text-[#B5B5C3] font-semibold ml-2 text-[15px]">
                  Remember me
                </h2>
              </div>
              <h2 className="text-[#747482] font-semibold ml-2 text-[15px]">
                Forgot Password?
              </h2>
            </div>
            <button className="w-full bg-[#ef233eec] py-[6px] rounded text-lg font-semibold text-white mt-8">
              Login
            </button>
            <div className="flex mt-8 justify-center">
              <h2 className="text-[16px] text-zinc-300 font-semibold">
                Don't have an account?{" "}
                <span
                  onClick={() => setanimation(!animation)}
                  className="text-[#ef233eec] cursor-pointer"
                >
                  Sign up
                </span>
              </h2>
            </div>
          </div>
          <div
            className={`w-full shrink-0 ${
              animation ? "-translate-x-[50%]" : "translate-x-[50%]"
            } duration-300`}
          >
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-300 mt-5 md:mt-8">
              Create account
            </h1>
            <p className="text-zinc-400">Sign up for a new account</p>
            <div className="w-full flex flex-col justify-center relative mt-5 md:mt-8">
              <input
                type="text"
                placeholder="Username"
                className="duration-300 w-full text-lg py-2 px-4 border-[1.5px] focus:border-[#EF233D] border-[#747482] rounded-lg outline-none text-zinc-400"
              />
              <i className="ri-user-line text-lg text-zinc-400 absolute right-5"></i>
            </div>
            <div className="w-full flex flex-col justify-center relative mt-2 md:mt-4">
              <input
                type="email"
                placeholder="Email"
                className="duration-300 w-full text-lg py-2 px-4 border-[1.5px] focus:border-[#EF233D] border-[#747482] rounded-lg outline-none text-zinc-400"
              />
              <i className="ri-mail-line text-lg text-zinc-400 absolute right-5"></i>
            </div>
            <div className="w-full flex flex-col justify-center relative mt-2 md:mt-4">
              <input
                type="password"
                placeholder="Password"
                className="duration-300 w-full text-lg py-2 px-4 border-[1.5px] focus:border-[#EF233D] border-[#747482] rounded-lg outline-none text-zinc-400"
              />
              <i class="ri-lock-password-line text-lg text-zinc-400 absolute right-5"></i>
            </div>
            <div className="w-full flex flex-col justify-center relative mt-2 md:mt-4">
              <input
                type="password"
                placeholder="Confirm password"
                className="duration-300 w-full text-lg py-2 px-4 border-[1.5px] focus:border-[#EF233D] border-[#747482] rounded-lg outline-none text-zinc-400"
              />
              <i class="ri-lock-password-line text-lg text-zinc-400 absolute right-5"></i>
            </div>
            <button className="w-full bg-[#ef233eec] py-[6px] rounded text-lg font-semibold text-white mt-5">
              Sign up
            </button>
            <div className="flex mt-2 justify-center">
              <h2 className="text-[16px] text-zinc-300 font-semibold mb-4 md:mb-0">
                Already have an account?{" "}
                <span
                  onClick={() => setanimation(!animation)}
                  className="text-[#ef233eec] cursor-pointer"
                >
                  Login
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
