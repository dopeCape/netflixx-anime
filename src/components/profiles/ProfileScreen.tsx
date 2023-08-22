"use client";
import GetUserData from "@/lib/hooks/GetUserData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/slices/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfileScreen() {
  const user = GetUserData();
  const router = useRouter();
  const addProfile = useAppStore((state) => state.addProfiles)
  const { data, status } = useSession()
  const [newProfile, setNewProfile] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [imageLoading, setImageLoadin] = useState(false);
  const [name, setName] = useState<string>("");

  const query = api.user.getRandomImage.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });


  const mutateProfile = api.profile.create.useMutation()
  useEffect(() => {
    if (mutateProfile.data != null) {
      addProfile(mutateProfile.data.create_profile)
      setNewProfile(false);
      setName("")
      localStorage.setItem("profile", mutateProfile.data.create_profile.id)
      mutateProfile.reset()
    }
  }, [user, mutateProfile])
  useEffect(() => {
    if (status == "unauthenticated") {
      void router.push("/browse")
    }

  }, [status])
  const handleNewProfile = () => {
    if (name.length == 0) {
      setError("Please Enter a name")
    }
    setError("");

    mutateProfile.mutate({
      name: name,
      url: query.data?.image,
    }
    )

  }
  return newProfile ? (
    <div className="flex h-screen w-screen  flex-col flex-wrap content-center justify-center bg-[#141414] ">
      <h1 className="text-[4vw] text-white">Add Profile</h1>
      <h1 className="text-[1.3vw] text-[#666]">
        Add a profile for another person to watch Newflixx.
      </h1>
      <div className="mt-4 flex h-[25%] w-[40%] flex-wrap content-center justify-start border-[1px] border-transparent border-b-[#666] border-t-[#666]">
        <div className="h-[200px] w-[200px] overflow-hidden">
          {imageLoading ?
            "Loading.."
            :
            <img
              src={query.data?.image}
              className="h-[200px] w-[200px] rounded-[5px] object-center"
            />
          }
        </div>
        <div
          className="flex flex-col flex-wrap "
        >
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            className="bg-[#4f4f4f] w-[450px] h-[45px] ml-5  top-[25%]  px-4 py-3 border-none outline-none text-white mt-10"
            placeholder="Name"

          />
          <div
            className="text-[#d52d28]  ml-5  mt-1"
          >{error}</div>
        </div>
      </div>

      <div className="flex flex-warp  mt-7">

        <button className="w-[120px] h-[40px] bg-white text-black hover:bg-netflix_red hover:text-white"
          onClick={handleNewProfile}
          disabled={mutateProfile.isLoading}
        >
          {mutateProfile.isLoading ? "Loading" : "Continue"}
        </button>
        <button className="w-[120px] h-[40px] border-[1px] border-[#333] text-[#333] hover:border-white hover:text-white ml-5"
          onClick={() => setNewProfile(false)}
          disabled={mutateProfile.isLoading}
        >
          Cancle
        </button>
      </div>
    </div>
  ) : (
    <div className="flex h-screen w-screen flex-col flex-wrap content-center justify-center bg-[#141414] ">
      <div className="font-nunito-sans text-center text-[3.5vw] font-bold text-white ">
        Who&apos;s Watching?
      </div>
      <div className="flex-warp mt-5 flex w-full  content-center justify-center gap-8">
        {user?.profiles.map((profile, index) => {
          return (
            <div
              key={index}
              className="h-[400px] w-[250px] cursor-pointer overflow-hidden rounded-[10px]  object-contain "
            >
              <ProfileCard url={profile.DisplayPisc} name={profile.name} />
            </div>
          );
        })}
        {user?.profiles.length < 5 ?
          <div className="w-[250px] h-[250px] flex flex-wrap content-center justify-center hover:bg-[#e5e5e5]  rounded-[5px] cursor-pointer" onClick={async () => {

            const f = async () => {
              setImageLoadin(true)
              await query.refetch()
              setNewProfile(true)
              setImageLoadin(false)
            }
            if (!imageLoading) {


              await f()

            }
          }}>
            {imageLoading ? "Loading" :
              <FontAwesomeIcon icon={faCirclePlus} className="text-[5vw] text-[#808080]" />
            }
          </div>

          : null}
      </div>
    </div>
  );
}
