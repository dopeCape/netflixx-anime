/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../card/Card";
import anime from "animejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
interface IRowProp {
  title: string;
}
export default function Row({ title }: IRowProp) {
  const [animes, setAnime] = useState([]);
  const [clicked, setClick] = useState<boolean>(false);
  const [currentElementsNumber, setCurretnElementsNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const elementsPerSet = 6;
  const scrollContainerRef = useRef(null);
  const firstScrollCont = useRef(null);
  const secondScrollCont = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://kitsu.io/api/edge/trending/anime");
      const wi = Math.floor((window.innerWidth - 8.5 * 16) / 6.2);
      setWidth(wi);
      setAnime(res.data.data);
    };
    void fetchData();
  }, []);
  const scrollToSet = (multiplyer: number, index: number) => {
    const pxToTranslate = index < 2 ? (width * elementsPerSet + 4) * index : (width * elementsPerSet) * index + (72 * (index - 1)) + 4;
    console.log(pxToTranslate);
    if (multiplyer == -1) {
      if (index == 0) {
        setClick(false);
      }
      anime({
        targets: firstScrollCont.current,
        right: (pxToTranslate) + "px",
        duration: 750,
        easing: "easeOutQuart",
        complete: () => {
          setCurretnElementsNumber((x) => {
            if (x != 0) {
              return x - 1
            }
            return x;
          })
        }
      })
    } else {
      anime({
        targets: firstScrollCont.current,
        right: (pxToTranslate) + "px",
        duration: 750,
        easing: "easeOutQuart",
        complete: () => {
          setCurretnElementsNumber((x) => {
            if (x < Math.ceil(animes.length / elementsPerSet) - 1) {
              return x + 1
            }
            return x;
          })
        }
      })
    }
  };
  const renderCards = () => {
    const toRender = animes.length % elementsPerSet != 0 ? animes.concat(animes.slice(0, elementsPerSet - (animes.length % elementsPerSet))) : animes;
    return (
      <div
        className="mt-2 flex h-[90%]  gap-3  flex-shrink-0 flex-grow-0   relative"
        style={{ marginLeft: `${clicked ? "0px" : "4rem"}` }}
        ref={firstScrollCont}
      >
        {toRender.map((a, index) => {
          return (<div key={index} id={index.toString()}
            className=" rounded-[5px] bg-transparent   "
          >
            <Card
              name={a.attributes.titles.en_jp}
              url={a.attributes.coverImage
                ? a.attributes.coverImage.original
                : a.attributes.posterImage.original}
              width={width} synopsis={""} rating={0}
              currentIndex={currentIndex} index={index + 1}
            />

          </div>)
        })}
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col  relative ">
      <h1
        className="ml-16 text-[28px] font-bold text-white"
      >
        {title}
      </h1>
      <div className="absolute right-16 top-9  z-50  flex gap-[1px] ">
        {
          Array.from({ length: Math.ceil(animes.length / elementsPerSet) }, (_, index) => index + 1).map(elm => {
            return <div className="h-[2px] w-3 bg-gray-600" key={elm} style={currentElementsNumber == elm - 1 ? { background: "#9CA3AF" } : {}}>
            </div>
          })
        }
      </div>
      <div className=" relative  w-screen h-full" >
        {renderCards()}
        {clicked && (
          <div
            className="w-14 h-[160px] bg-black opacity-80 absolute left-0 z-[60] top-2 rounded-r-[5px]   cursor-pointer before:rounded-l-[5px] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-80 flex flex-wrap content-center justify-center group"
            onClick={() => {
              setClick(true)
              scrollToSet(-1, currentIndex - 1);
              setCurrentIndex((x) => { return x - 1 });
            }}

          >
            <FontAwesomeIcon
              className="text-white text-2xl transition-all group-hover:scale-150 z-40"
              icon={faChevronLeft}

            />
          </div>


        )}
        {
          currentIndex < Math.ceil(animes.length / elementsPerSet) - 1 ? <div
            className="w-16 h-[160px]  absolute right-0 z-[60] top-2 text-white cursor-pointer before:rounded-l-[5px] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-80 flex flex-wrap content-center justify-center group"
            onClick={() => {
              setClick(true)
              scrollToSet(1, currentIndex + 1);
              setCurrentIndex((x) => { return x + 1 });
            }}
          >
            <FontAwesomeIcon
              className="text-white text-3xl transition-all group-hover:scale-150 z-40 "
              icon={faChevronRight}
            />

          </div>
            : null}
      </div>
    </div>
  );
}
