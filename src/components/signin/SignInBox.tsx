import { useEffect, useRef, useState } from "react";
import GenricReaButton from "../homescreen/GenricButtonRed";
import { isValidEmail } from "@/utils/helper";
import Link from "next/link";

export default function SignInBox() {
  const [pass, setPass] = useState<string>("");
  const [passWarning, setPassWarning] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailWarning, setEmailWarning] = useState<boolean>(false);

  return (
    <div className="relative z-40 flex h-full w-full flex-col flex-wrap   justify-start bg-[#000000bf] px-16 text-white ">
      <h1 className="text-bold relative z-40  mt-16 text-[40px] text-white">
        Sign In
      </h1>
      <div className="relative mt-5 rounded-[5px]  bg-input_gray px-6 py-2 focus:ring-0 border-b-[3px] "
        style={{ borderBottomColor: `${emailWarning ? "#E1680e" : "transparent"}` }}
      >

        <input
          type="text"
          id="floating_filled"
          className="peer block h-[40px] w-full appearance-none rounded-[5px]   bg-input_gray  pt-5 text-[18px] text-white   outline-none  focus:ring-0 "
          value={email}
          onBlur={() => {
            if (!isValidEmail(email)) {
              setEmailWarning(true);
            } else {
              setEmailWarning(false)

            }
          }}
          placeholder=" "
          onChange={(e) => {
            setEmail(e.target.value);
            if (isValidEmail(e.target.value)) {
              setEmailWarning(false)
            } else {
              setEmailWarning(true)

            }
          }}

        />
        <label
          htmlFor="email"
          className="absolute  top-4 z-10 origin-[0] -translate-y-6 scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
        >
          Email
        </label>
      </div>{" "}

      {emailWarning ? <div className="text-netflix_orange mt-1 text-[14px]">Enter a valid email</div> : null}

      <div className="relative mt-5 rounded-[5px]  bg-input_gray px-6 py-2 focus:ring-0 border-b-[3px] "
        style={{ borderBottomColor: `${passWarning ? "#E1680e" : "transparent"}` }}
      >
        <input
          type="password"
          id="floating_filled"
          className="peer block h-[40px] w-full appearance-none rounded-[5px]   bg-input_gray  pt-5 text-[18px] text-white   outline-none   "
          value={pass}
          onBlur={() => {
            if (pass.length < 4) {
              setPassWarning(true);
            }
          }}
          placeholder=" "
          onChange={(e) => {
            setPass(e.target.value);
            if (e.target.value.length >= 4) {
              setPassWarning(false)
            }
          }}
        />
        <label
          htmlFor="Password"
          className="absolute  top-4 z-10 origin-[0] -translate-y-6 scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
        >
          Password
        </label>
      </div>
      {passWarning ? <div className="text-netflix_orange mt-1 text-[14px]">Password must be atleast 4 chars</div> : null}
      <div className="relative mt-[13%] h-[60px]">
        <GenricReaButton
          func={() => {
            return;
          }}
          text={"Sign in"}
        />
      </div>
      <div>
        <input
          type="checkbox"
          className=" top-[16%]  mt-3 h-[15px] w-[30px] bg-input_gray outline-none"
        />
        <label className=" text-[#8c8c8c]">Remember me</label>
      </div>
      <h1 className=" mt-5 text-[18px] text-[#8c8c8c]">
        New to Netflixx?
        <Link className="decoration-none cursor-pointer  text-white hover:underline " href={"/signup"}>
          {" "}
          Sign up now.{" "}
        </Link>
      </h1>
      <h1 className=" mt-5 text-sm text-[#8c8c8c]">
        This page is protected by god,so if you are a bot good luck.
      </h1>
    </div>
  );
}
