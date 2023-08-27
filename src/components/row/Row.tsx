import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../card/Card";
import anime from "animejs";

interface IRowProp {
  title: string;
}

export default function Row({ title }: IRowProp) {
  const [animes, setAnime] = useState([]);
  const [clicked, setClick] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [currentScroll, setCurrnetScroll] = useState(0);
  const elementsPerSet = 6;
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://kitsu.io/api/edge/trending/anime");
      const wi = Math.floor((window.innerWidth - 8.5 * 16) / 6.2);
      setWidth(wi);
      setAnime(res.data.data);
    };

    fetchData();
  }, []);

  const scrollToNextSet = () => {
    if (scrollContainerRef.current) {
      const newStartIndex = (elementsPerSet + 1) % animes.length;
      setClick(true);
      anime({
        targets: scrollContainerRef.current,
        scrollLeft: newStartIndex * width + 16,
        duration: 500,
        easing: "linear"
      })
    }
  };

  return (
    <div className="flex h-full flex-col">
      <h1
        className="ml-16 text-[28px] font-bold text-white"
        onClick={scrollToNextSet}
      >
        {title}
      </h1>
      <div
        className="mt-2 flex h-[90%] w-screen gap-3 overflow-scroll overflow-x-scroll relative"
        style={{ marginLeft: `${clicked ? "0px" : "4rem"}` }}
        ref={scrollContainerRef}
      >
        {animes.concat(animes).map((a, index) => {
          return (
            <div
              key={index}
              className="h-[160px] flex-shrink-0 rounded-[5px] bg-red-400 relative"
              data-key={index}
            >
              <Card
                name={a.attributes.titles.en_jp}
                url={
                  a.attributes.coverImage
                    ? a.attributes.coverImage.original
                    : a.attributes.posterImage.original
                }
                width={width}
              />
            </div>
          );
        })}

        {/* {clicked && <div className="w-16 h-[160px] bg-black opacity-80 absolute left-0 z-50 top-0" />} */}
      </div>

      <div className="w-14 h-[160px] bg-black opacity-80 absolute left-0 z-50 top-[17.3%]  cursor-pointer"
        onClick={() => {
          if (scrollContainerRef.current) {
            const newStartIndex = (elementsPerSet + 1) % animes.length;
            setClick(true);
            anime({
              targets: scrollContainerRef.current,
              scrollRight: newStartIndex * width + 16,
              duration: 500,
              easing: "linear"
            })
          }
        }}
      />

      <div className="w-16 h-[160px] bg-black opacity-80 absolute right-0 z-50 top-[17.3%] text-white"
        onClick={() => {
          if (scrollContainerRef.current) {
            const newStartIndex = (elementsPerSet + 1) % animes.length;
            setClick(true);
            anime({
              targets: scrollContainerRef.current,
              scrollLeft: newStartIndex * width + 16,
              duration: 500,
              easing: "linear"
            })
          }
        }}
      >
      </div>

    </div>
  );
}
