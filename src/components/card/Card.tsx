/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import anime from "animejs";
import { useRef, useState } from "react";
import CardDeatails from "./CardDetails";

interface ICardProp {
  url: string;
  name: string;
  synopsis: string;
  rating: number;
  width: number;
  currentIndex: number;
  index: number;
}
export default function Card({
  url,
  name,
  width,
  currentIndex,
  index
}: ICardProp) {
  const hoverRef = useRef(null);
  const [hovered, setHoverd] = useState<boolean>(false);
  const contentRef = useRef(null);
  const parentRef = useRef(null)
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const opacRef = useRef(null);
  const imageRef = useRef(null);
  const handleOnMouseUp = () => {
    hoverRef.current = setTimeout(() => {
      setHoverd(true);
      setTimeout(() => {

        contentRef.current.style.Zindex = 100;
        imageRef.current.style.borderBottomLeftRadius = "0px"
        imageRef.current.style.borderBottomRightRadius = "0px"
        anime({
          targets: cardRef.current,
          scale: 1.5,
          translateX: index % 6 == 1 ? 45 : index % 6 == 0 ? -50 : 0,
          duration: 400,
          translateY: -50,
          easing: "easeOutExpo",
        });
        anime({
          targets: titleRef.current,
          opacity: 0,
          duration: 400,
          easing: "easeOutExpo",
        })
        anime({
          targets: contentRef.current,
          translateY: -20,
          translateX: index % 6 == 1 ? 68 : index % 6 == 0 ? -76 : 0,
          scaleY: 1.2,
          scaleX: 1.5,
          opacity: 1,
          duration: 400,
          easing: "easeOutExpo",
        })

        anime({
          targets: opacRef.current,
          opacity: 0,
          duration: 400,
          easing: "easeOutExpo",
        })

      }, 0)
    }, 500);
  };
  const handleOnMouseDown = () => {
    if (hovered) {
      setTimeout(() => {
        imageRef.current.style.borderRadius = "5px"
        anime({
          targets: titleRef.current,
          opacity: 1,
          duration: 400,
          easing: "easeOutExpo",
        })
        anime({
          targets: opacRef.current,
          opacity: 1,
          duration: 400,
          easing: "easeOutExpo",
        })
        anime({
          targets: contentRef.current,
          scaleY: 1,
          translateX: 0,
          translateY: 1,
          scaleX: 1,
          opacity: 0,
          duration: 400,
          easing: "easeOutExpo",
        })

        anime({
          targets: cardRef.current,
          translateX: 0,
          scale: 1,
          duration: 400,
          translateY: 1,
          easing: "easeOutExpo",
          complete: () => {
            parentRef.current.style.zIndex = 0;
            setHoverd(false);
          },
        });
      }, 0);
    }
    clearTimeout(hoverRef.current);
  };
  return (
    <div
      className="relative flex h-[160px]  justify-end rounded-[5px]  shadow-3xl  "
      style={{ width: `${width == 0 ? "100%" : width + "px"}`, zIndex: hovered ? 90 : 20 }}
      ref={parentRef}
      onMouseEnter={handleOnMouseUp}
      onMouseLeave={handleOnMouseDown}
    >
      <div className="h-160px w-full"
        ref={cardRef}
      >
        <img
          className="ml-auto  h-full  w-full  object-cover rounded-[5px] cursor-pointer"
          ref={imageRef}
          src={url}
        />
        <div className="text-bold  z-20 mb-5 ml-5 text-[20px] text-white absolute bottom-0 left-0"
          ref={titleRef}
        >
          {name}
        </div>
        <div className="left_opac absolute bottom-0 left-0  w-full h-[40%] z-10 "
          ref={opacRef}
        ></div>
      </div>
      {hovered &&
        <div className="top-[100%] left-0 absolute bg-netflix_black h-[160px]   rounded-b-[5px] shadow-3xl   "
          ref={contentRef}
          style={{ width: `${width == 0 ? "100%" : width + "px"}`, }}
        >
          <CardDeatails />
        </div>
      }

    </div>
  );
}
