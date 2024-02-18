import HomeScreenheader from "./HomeScreenHeader";
import HomeScreenMidSection from "./HomeScreenMidSection";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function HomeScreen() {
  const { data, status } = useSession();
  // const user = GetUserData();
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      void router.push("/profiles");
    }
  }, [status]);

  return (
    <div className="flex h-full w-full flex-col  ">
      <div className="h-[70%] w-full  2xl:h-[60%]">
        <div className="absolute z-20 h-[70%] w-full  bg-gradient-to-b from-black 2xl:h-[60%]  "></div>
        {/* <div className="bg-gradient-radial absolute inset-0 z-20 h-[70%] w-full from-red-100 to-black"></div> */}
        <div className="absolute z-0 h-[70%] w-full 2xl:h-[60%]">
          <img src="banner.webp" alt="netflixx" className="h-full w-full" />
        </div>
        <div className="absolute    z-20 h-[70%] w-full bg-gradient-to-t from-black 2xl:h-[60%] "></div>
        <HomeScreenheader />
        <div className="absolute top-[20%]  z-30 ml-[10%] w-[80%] text-white  2xl:top-[16%]">
          <HomeScreenMidSection />
        </div>
      </div>
      <div className="z-30 h-[15px] w-full bg-[#232323] "></div>
      <div className="h-[531px] w-full bg-black "></div>
      <div className="">{/*Questions */}</div>
    </div>
  );
}
