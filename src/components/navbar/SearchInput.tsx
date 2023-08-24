import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react"

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import anime from "animejs";

export default function SearchInput() {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef(null);
  const contRef = useRef(null);
  useEffect(() => {
    anime({
      targets: [inputRef.current],
      width: `${inputRef.current.clientWidth == 0 && clicked ? "210px" : "0px"}`,
      duration: 300,
      easing: "linear"
    })
  }, [clicked])
  return <div className="w-full h-full flex flex-wrap justify-end  bg-transparent  "
    ref={contRef}
  >
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      className="text-white text-[24px] relative top-[20%] cursor-pointer outline-none border-none"
      onClick={() => {
        setClicked(true)
        inputRef.current.focus();
      }}
    />
    <input
      ref={inputRef}
      className="w-[0px] outline-none border-none bg-transparent text-white ml-2"
      placeholder="Titles,genres"
      onBlur={() => setClicked(false)}
    />

  </div>

}
