/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import anime from "animejs";
import { useRef, useState } from "react";

interface ICardProp {
  url: string;
  name: string;
  synopsis: string;
  rating: number;
  width: number;
}
export default function Card({
  url,
  name,
  synopsis,
  rating,
  width,
}: ICardProp) {
  const hoverRef = useRef(null);
  const [hovered, setHoverd] = useState<boolean>(false);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const opacRef = useRef(null);
  const imageRef = useRef(null);
  const handleOnMouseUp = () => {
    hoverRef.current = setTimeout(() => {
      setHoverd(true);
      setTimeout(() => {
        anime({
          targets: cardRef.current,
          scale: 1.5,
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
          scale: 1.5,
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
          scale: 1,
          opacity: 0,
          duration: 400,
          easing: "easeOutExpo",
        })

        anime({
          targets: cardRef.current,
          scale: 1,
          duration: 400,
          translateY: 1,
          easing: "easeOutExpo",
          complete: () => {
            cardRef.current.style.zIndex = 0;
            setHoverd(false);
          },
        });
      }, 0);
    }
    clearTimeout(hoverRef.current);
  };
  return (
    <div
      className="relative flex h-[160px]  justify-end rounded-[5px] "
      style={{ width: `${width == 0 ? "100%" : width + "px"}`, zIndex: hovered ? 90 : 20 }}
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
        <div className="top-[100%] left-0 absolute bg-red-400 h-[160px] z-50  opacity-0 rounded-b-[5px]"
          ref={contentRef}
          style={{ width: `${width == 0 ? "100%" : width + "px"}`, }}
        ></div>

      }

    </div>
  );
}
