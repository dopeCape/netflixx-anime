import { faCaretDown, faUser, faPencil, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anime from "animejs";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function ProfileMenu({ pic }: { pic: string }) {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null)
  const iconRef = useRef(null)
  const carotRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    anime(
      {
        targets: menuRef.current,
        opacity: visible ? [0, 0.9] : [0.9, 0],
        duration: 500,
      }
    )
  }, [visible])
  return (
    <div className="flex w-[60px]  justify-center cursor-pointer relative "
      ref={iconRef}
      onMouseOver={() => {
        setVisible(true);
        anime({
          targets: carotRef.current,
          rotate: 180,
          duration: 800,
        })
      }}
      onClick={() => {
        setVisible(false)
      }}
    >
      <img src={pic} className="ml-5 h-[40px] w-[40px] rounded-[3px]"
      />
      <FontAwesomeIcon className="text-white relative top-[30%] ml-3" icon={faCaretDown}
        ref={carotRef}
      />
      {
        visible ?
          <div className=" ">
            <div className=" absolute top-[180%] bg-black opacity-0 w-[200px] h-[210px] right-[-20%] cursor-default"
              ref={menuRef}
            >
              <div className="opacity-100 flex flex-col   flex-wrap content-start  text-white pl-3">
                <div className="mt-5 flex flex-wrap content-center justify-start cursor-pointer"
                  onClick={() => {
                    void router.push("/profiles")
                  }}
                >
                  <FontAwesomeIcon icon={faCircleUser}
                    className="text-gray-500 text-[26px] "
                  />
                  <span className="ml-2 text-[16px] hover:underline">Change Profiles</span>
                </div>
                <div className="mt-5 flex flex-wrap content-center justify-start cursor-pointer" >
                  <FontAwesomeIcon icon={faPencil}

                    className="text-gray-500 text-[26px]  "
                  />
                  <span
                    className="ml-2 text-[16px] hover:underline"
                  >Manage Profiles</span>
                </div>

                <div className="mt-5 flex flex-wrap content-center justify-start cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUser}

                    className="text-gray-500 text-[26px] "
                  />
                  <span
                    className="ml-3 text-[16px] hover:underline"
                  >Account</span>

                </div>
                <div className="w-full h-[1px] bg-gray-600 relative right-2 mt-5"></div>
                <div className="mt-4 hover:underline"
                  onClick={() => {
                    window.localStorage.removeItem("profile")
                    void signOut()
                  }}
                >
                  Sign out of Netflixx
                </div>
              </div>
            </div>
          </div>


          : null

      }
    </div>
  );
}
