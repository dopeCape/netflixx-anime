import { faCaretDown, faCarrot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anime from "animejs";
import { useEffect, useRef, useState } from "react";

export default function ProfileMenu({ pic }: { pic: string }) {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null)
  const iconRef = useRef(null)
  const carotRef = useRef(null);

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
            <div className=" absolute top-[180%] bg-black opacity-0 w-[250px] h-[400px] right-[-20%]"
              ref={menuRef}
              onMouseOut={() => {
                anime({
                  targets: carotRef.current,
                  rotate: 360,
                  duration: 400,
                })
                setTimeout(() => {
                  setVisible(false);
                }, 500)
              }}
            >
              <div className="opacity-100">
                <h1 className="text-white">hello</h1>

              </div>
            </div>
          </div>


          : null

      }
    </div>
  );
}
