/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
"use client";
import Loader from "../../../public/Eclipse-1s-200px.svg"
import GetUserData from "@/lib/hooks/GetUserData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import ProfileCard from "./ProfileCard";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/slices/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import anime from "animejs";
import Image from "next/image";

export default function ProfileScreen() {
  const user = GetUserData();
  const router = useRouter();
  const addProfile = useAppStore((state) => state.addProfiles)
  const { data, status } = useSession()
  const [newProfile, setNewProfile] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [imageLoading, setImageLoadin] = useState(false);
  const [name, setName] = useState<string>("");
  const selectorRef = useRef()
  const makerRef = useRef()
  const makeProileRef = useRef();
  useEffect(() => {
    // Define the animation properties
    const animationProps = {
      scale: [1.1, 1.0],
    };

    // Apply the animation using Anime.js
    anime({
      targets: !newProfile ? selectorRef.current : makerRef.current,
      ...animationProps,
      duration: 400,
      easing: 'easeInOutQuad',
    });
  }, [newProfile, user]);
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
      mutateProfile.reset()
    }
  }, [user, mutateProfile])
  useEffect(() => {
    if (status == "unauthenticated") {
      void router.push("/browse")
    }
  }, [status])

  useEffect(() => {
    // Trigger the animation when the component mounts
    const element = selectorRef.current;

    anime({
      targets: element,
      z: 1,
      scale: [1.1, 1.0],
      duration: 400, // Animation duration in milliseconds
      easing: 'easeOutQuad', // Easing function
    });
  }, []);
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
  return (
    <div className="bg-[#141414] w-screen h-screen">
      {newProfile ? (
        <div className="flex h-full  flex-col flex-wrap content-center justify-center bg-[#141414]  "
        >
          <div className=""
            ref={makerRef}
          >
            <h1 className="text-[4vw] text-white">Add Profile</h1>
            <h1 className="text-[1.3vw] text-[#666]">
              Add a profile for another person to watch Newflixx.
            </h1>
            <div className="mt-4 flex  p-5  flex-wrap content-center justify-start border-[1px] border-transparent border-b-[#666] border-t-[#666]">

              <div className="h-[200px] w-[200px] overflow-hidden">
                <img
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  alt={"img"}
                  src={query.data?.image}
                  ref={makeProileRef}
                  className="h-[200px] w-[200px] rounded-[5px] object-center " />
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
                {mutateProfile.isLoading ? <Image
                  src={Loader}
                  className="w-[40px] m-auto"

                /> : "Continue"}
              </button>
              <button className="w-[120px] h-[40px] border-[1px] border-[#333] text-[#333] hover:border-white hover:text-white ml-5"
                onClick={() => setNewProfile(false)}
                disabled={mutateProfile.isLoading}
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen flex-col flex-wrap content-center justify-center bg-[#141414]   "
        >
          {user.id != "" ?

            <div
              ref={selectorRef}
            >
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
                      <ProfileCard url={profile.DisplayPisc} name={profile.name} id={profile.id} />
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
                    {imageLoading ? <Image
                      src={Loader}
                      className="w-[80px]"

                    /> :
                      <FontAwesomeIcon icon={faCirclePlus} className="text-[5vw] text-[#808080]" />
                    }
                  </div>
                  : null}
              </div>
            </div>
            :
            <Image
              src={Loader}
            />
          }
        </div>
      )
      }
    </div>
  )

}
