import { useEffect, useState } from "react";
import GenricReaButton from "../homescreen/GenricButtonRed";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { isValidEmail } from "@/utils/helper";
import Link from "next/link";

export default function SignInBox() {
  const [pass, setPass] = useState<string>("");
  const [passWarning, setPassWarning] = useState<boolean>(false);
  const [passWarningContent, setPassWarningContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailWarning, setEmailWarning] = useState<boolean>(false);
  const [emailWarningContent, setEmailWarningContent] = useState<string>("");
  const [loading, setLoadin] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      void router.push("/");
    }
  }, [status])


  const handleSginIn = async () => {
    if (!isValidEmail(email)) {
      setEmailWarningContent("Invalid Emil")
      setEmailWarning(true)
      return;
    }
    if (pass.length == 0) {
      setPassWarningContent("password must be atleast 4 char long")
      setPassWarning(true)
      return;

    }
    setLoadin(true)

    const res = await signIn("credentials", {
      email: email,
      password: pass,
      redirect: false,
      type: "login"
    })
    setLoadin(false)
    if (res?.error) {
      setEmailWarningContent("Invalid credentials")
      setPassWarningContent("Invalid credentials")
      setEmailWarning(true)
      setPassWarning(true)
    }

  }


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
              setEmailWarningContent("invalid email")
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

              setEmailWarningContent("invalid email")

            }
          }}

        />
        <label
          htmlFor="email"
          className="absolute  top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-[18px] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#8c8c8c] "
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
              setPassWarningContent("password must have 4 chars")
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

              setPassWarningContent("password must have 4 chars")
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
      <div className="relative mt-[13%] h-[60px]">
        <GenricReaButton
          disabled={loading}
          state={loading}
          func={
            handleSginIn
          }
          text={"Sign in"}
        />
      </div>
      <h1 className=" mt-10 text-[18px] text-[#8c8c8c]">
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
