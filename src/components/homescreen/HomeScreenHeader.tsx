import { useRouter } from "next/router";
import GenricReaButton from "./GenricButtonRed";

export default function HomeScreenheader() {
  const router = useRouter();
  return (
    <div className="absolute z-30 flex h-[10%] w-screen justify-between px-5 pt-5 2xl:justify-around ">
      <img
        src="netflix.png"
        alt="netflix"
        className="relative  z-30 w-[160px] 2xl:right-[10%] 2xl:w-[200px]"
      />

      <div className=" relative top-[10%] h-[40px] w-[100px] 2xl:left-[10%] ">
        <GenricReaButton
          func={() => {
            void router.push("/login");
          }}
          text={"Sign in"}
        />
      </div>
    </div>
  );
}
