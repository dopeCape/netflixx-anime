import { useRouter } from "next/router";
import SignUpBox from "./Signupbox";

export default function SignUp() {
  const router = useRouter()
  return (
    <div className="flex h-screen w-screen flex-wrap content-center justify-center ">
      <img
        src="banner.webp"
        alt="Netflixx"
        className="absolute z-0 h-screen w-screen"
      />
      <div className="absolute z-10 h-screen w-screen bg-black opacity-80"></div>
      <img
        className=" absolute left-12 top-0 z-20 w-[240px]  cursor-pointer"
        alt="netflixx"
        src="netflix.png"
        onClick={() => {
          void router.push("/");
        }}
      />
      <div className="h-[75%] w-[27%]">
        <SignUpBox />
      </div>
    </div>
  );
}
