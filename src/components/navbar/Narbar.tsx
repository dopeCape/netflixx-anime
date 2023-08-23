'use client'


import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NetflixLogo from "../../../public/netflix (1).svg";
import GetUserData from "@/lib/hooks/GetUserData";
import GenricReaButton from "../homescreen/GenricButtonRed";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function NavBar() {
  const user = GetUserData();
  const router = useRouter()
  const [profileUrl, setProfileurl] = useState<string>("")
  const [profileId, setProfileId] = useState("")
  useEffect(() => {

    const pId = localStorage.getItem("profile")
    setProfileId(pId)
    const url = user.profiles.filter((p) => p.id == profileId)[0]
    setProfileurl(url);

  }, [
    user

  ])
  return (
    <div className="flex h-full w-full bg-transparent ">
      <Image src={NetflixLogo} className="ml-16 h-[80px] w-[150px] " />
      <div className="ml-10  mt-5 flex h-full w-[20%] flex-wrap content-center justify-around text-white">
        <h1 className="text-bold">Home</h1>
        <h1 className="cursor-pointer hover:text-gray-400 ">Movies</h1>
        <h1 className="cursor-pointer hover:text-gray-400 ">My list</h1>
        <h1 className="cursor-pointer hover:text-gray-400 ">Browse by genre</h1>
      </div>
      <div className="ml-auto mr-10 mt-5 flex flex h-full w-[20%] flex-wrap content-center justify-end">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-[30px] text-white relative top-[10%]"
        />
        {user ?
          <div className="">
            <img
              src={user.profiles.filter((p) => p.id == profileId)[0]?.DisplayPisc}
              className="w-[40px] h-[40px] rounded-[3px] ml-5"
            />

          </div>
          :
          <div>
            <GenricReaButton
              text={"login"}
              state={false}
              disabled={false}
              func={() => {
                void router.push("/login");
              }}
            />
          </div>
        }

      </div>
    </div>
  );
}
