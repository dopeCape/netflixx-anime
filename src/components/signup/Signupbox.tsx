import { useState } from "react";
import GenricReaButton from "../homescreen/GenricButtonRed";
import { isValidEmail } from "@/utils/helper";
import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

export default function SignUpBox() {
  const [pass, setPass] = useState<string>("");
  const [passWarning, setPassWarning] = useState<boolean>(false);
  const [passWarningContent, setPassWarningContent] = useState<string>("");
  const [passConf, setPassConf] = useState<string>("");
  const [passWarningConf, setPassWarningConf] = useState<boolean>(false);
  const router = useRouter()

  const { data: session, status } = useSession();
  if (status == "authenticated") {
    void router.push("/");
  }
  const [passConfWarningContent, setConfPassWarningContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailWarning, setEmailWarning] = useState<boolean>(false);

  const [emailWarningContent, setEmailWarningContent] = useState<string>("");

  const [userName, setUserName] = useState<string>("");
  const [userNameWarning, setUserNameWarning] = useState<boolean>(false);
  const [userNameWarningContent, setUserNameWarningContent] = useState<string>("");
  const [loadin, setLoadin] = useState<boolean>(false)

  const mutation = api.user.signup.useMutation()
  const handleSignup = async () => {
    if (pass.length == 0) {
      setPassWarningContent("Password should be atleast 4 chars long");
      setPassWarning(true);
      return;
    }
    if (pass != passConf) {
      setConfPassWarningContent("Password do not match")
      setPassWarningConf(true);
      return;
    }
    if (userName.replace(" ", "").length < 3) {
      setUserNameWarningContent("Username should be atleast 3 chars long")
      setUserNameWarning(true)
      return;
    }
    if (!isValidEmail(email)) {
      setEmailWarningContent("Invalid email");
      setEmailWarning(true);
      return;
    }
    setLoadin(true)
    const data = await signIn("credentials", {
      email: email,
      username: userName,
      password: pass,
      type: "signup"
    })
    setLoadin(false)

    console.log(data);
    if (data?.error) {
      setEmailWarningContent("Invalid credentials");
      setEmailWarning(true);
    }

  }




  return (

    <div className="relative z-40 flex h-full w-full flex-col flex-wrap   justify-start bg-[#000000bf] px-16 text-white ">
      <h1 className="text-bold relative z-40  mt-16 text-[40px] text-white">
        Sign Up
      </h1>
      <div className="relative mt-5 rounded-[5px]  bg-input_gray px-6 py-2 focus:ring-0 border-b-[3px] "
        style={{ borderBottomColor: `${userNameWarning ? "#E1680e" : "transparent"}` }}
      >
        <input
          type="text"
          id="floating_filled"
          className="peer block h-[40px] w-full appearance-none rounded-[5px]   bg-input_gray  pt-5 text-[18px] text-white   outline-none  focus:ring-0 "
          value={userName}
          onBlur={() => {
            if (userName.length < 3) {
              setUserNameWarning(true);
              setUserNameWarningContent("username must be atleast 3 char long")
            } else {
              setUserNameWarning(false)
            }
          }}
          placeholder=" "
          onChange={(e) => {
            setUserName(e.target.value);
            if (e.target.value.replace(" ", "").length >= 3) {
              setUserNameWarning(false)
            } else {
              setUserNameWarning(true)
              setUserNameWarningContent("username must be atleast 3 char long")

            }
          }}

        />
        <label
          htmlFor="username"
          className="absolute  top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
        >
          Username
        </label>
      </div>

      {userNameWarning ? <div className="text-netflix_orange mt-1 text-[14px]">{userNameWarningContent}</div> : null}
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
              setEmailWarningContent("Invalid Email ")
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

              setEmailWarningContent("Invalid Email ")

            }
          }}

        />
        <label
          htmlFor="email"
          className="absolute  top-4 z-10 origin-[0] -translate-y-4  scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
        >
          Email
        </label>
      </div>{" "}

      {emailWarning ? <div className="text-netflix_orange mt-1 text-[14px]">{emailWarningContent}</div> : null}

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
              setPassWarningContent("Passwod must be atleast 4 char long ")
            } else {

              setPassWarning(false);

            }
          }}
          placeholder=" "
          onChange={(e) => {
            setPass(e.target.value);
            if (e.target.value.length >= 4) {
              setPassWarning(false)
            } else {
              setPassWarning(true)
              setPassWarningContent("Passwod must be atleast 4 char long ")

            }
          }}
        />
        <label
          htmlFor="Password"
          className="absolute  top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
        >
          Password
        </label>
      </div>
      {passWarning ? <div className="text-netflix_orange mt-1 text-[14px]">{passWarningContent}</div> : null}
      <div className="relative mt-5 rounded-[5px]  bg-input_gray px-6 py-2 focus:ring-0 border-b-[3px] "
        style={{ borderBottomColor: `${passWarningConf ? "#E1680e" : "transparent"}` }}
      >
        <input
          type="text"
          id="floating_filled"
          className="peer block h-[40px] w-full appearance-none rounded-[5px]   bg-input_gray  pt-5 text-[18px] text-white   outline-none  focus:ring-0 "
          value={passConf}
          onBlur={() => {
            if (passConf != pass) {
              setPassWarningConf(true);
              setConfPassWarningContent("Password do not match")
            } else {
              setPassWarningConf(false)
            }
          }}
          placeholder=" "
          onChange={(e) => {
            setPassConf(e.target.value);
            if (e.target.value == pass) {
              setPassWarningConf(false)
            } else {
              setPassWarningConf(true)
              setConfPassWarningContent("Password do not match")
            }
          }}

        />
        <label
          htmlFor="Confirm"
          className="absolute  top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
        >
          Confirm Password
        </label>
      </div>
      {passWarningConf ? <div className="text-netflix_orange mt-1 text-[14px]">{passConfWarningContent}</div> : null}

      <div className="relative mt-[8%] h-[60px]">
        <GenricReaButton
          state={loadin}
          disabled={loadin}
          func={
            handleSignup
          }
          text={"Sign in"}
        />
      </div>
      <h1 className=" mt-3 text-[18px] text-[#8c8c8c]">
        Already have a account?
        <Link className="decoration-none cursor-pointer  text-white hover:underline " href="/login">
          {" "}
          Login now.{" "}
        </Link>
      </h1>
    </div>
  );
}
