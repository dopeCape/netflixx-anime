/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'


import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NetflixLogo from "../../../public/netflix (1).svg";
import GetUserData from "@/lib/hooks/GetUserData";
import GenricReaButton from "../homescreen/GenricButtonRed";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SearchInput from "./SearchInput";
import ProfileMenu from "./ProileMenu";
export default function NavBar() {
  const user = GetUserData();
  const { data, status } = useSession()
  const router = useRouter()
  const { pathname } = router
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
  const handlePush = (route: string) => {
    void router.push("/" + route)


  }
  return (
    <div className="flex h-full w-full bg-transparent ">
      <Image src={NetflixLogo} className="ml-16 h-[70px] w-[150px] relative top-[20%] cursor-pointer " onClick={() => {
        if (pathname != "/browse") {
          handlePush("browse");
        }

      }} alt={""} />
      <div className="ml-10  mt-5 flex h-full w-[20%] flex-wrap content-center justify-around text-white">
        <h1 className={`${pathname != "/browse" ? "hover:text-gray-400" : null} text-[14px]`} style={pathname == "/browse" ? {
          fontWeight: "bold",
          cursor: "default"
        } : {
          cursor: "pointer",
        }}
          onClick={() => {
            if (pathname != "/browse") {

              handlePush("browse")
            }

          }}
        >Home</h1>
        <h1 className={`${pathname != "/movies" ? "hover:text-gray-400" : null} text-[14px]`} style={pathname == "/movies" ? {
          fontWeight: "bold",
          cursor: "default"
        } : {
          cursor: "pointer",
        }}
          onClick={() => {
            if (pathname != "/movies") {

              handlePush("movies")
            }

          }}

        >Movies</h1>
        <h1 className={`${pathname != "/mylist" ? "hover:text-gray-400" : null} text-[14px]`} style={pathname == "/mylist" ? {
          fontWeight: "bold",
          cursor: "default"
        } : {
          cursor: "pointer",
        }}
          onClick={() => {
            if (pathname != "/mylis") {

              handlePush("mylist")
            }

          }}

        >My list</h1>
        <h1 className={`${pathname != "/genre" ? "hover:text-gray-400" : null}text-[14px]`} style={pathname == "/genre" ? {
          fontWeight: "bold",
          cursor: "default"
        } : {
          cursor: "pointer",
        }}
          onClick={() => {
            if (pathname != "/genre") {

              handlePush("genre")
            }

          }}

        >Browse by genre</h1>
      </div>

      <div className="ml-auto mr-16 mt-5  flex h-full w-[20%] flex-wrap content-center justify-end">
        <div className="w-[250px] flex content-end flex-wrap">
          <SearchInput />
        </div>
        {status == "authenticated" ?
          <ProfileMenu
            pic={user.profiles.filter((p) => p.id == profileId)[0]?.DisplayPisc}
          />
          :
          <div className="w-[80px] ml-5">
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
