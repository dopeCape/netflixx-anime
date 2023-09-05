
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

  const scrollToSet = (newStartIndex) => {
    if (scrollContainerRef.current) {
      setClick(true);
      anime({
        targets: scrollContainerRef.current,
        scrollLeft: newStartIndex * width + 16,
        duration: 500,
        easing: "linear"
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <h1
        className="ml-16 text-[28px] font-bold text-white"
      >
        {title}
      </h1>
      <div
        className="mt-2 flex h-[90%] w-screen gap-3   relative"
        style={{ marginLeft: `${clicked ? "0px" : "4rem"}` }}
        ref={scrollContainerRef}
      >
        {animes.map((a, index) => {
          return (
            <div
              key={index}
              className=" flex-shrink-0 rounded-[5px] bg-transparent relative"
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
      </div>
      {clicked && (
        <div
          className="w-14 h-[160px] bg-black opacity-80 absolute left-0 z-50 top-[17.3%]  cursor-pointer"
          onClick={() => {
            const newStartIndex = (animes.length - elementsPerSet + 1) % animes.length;
            scrollToSet(newStartIndex);
          }}
        />
      )}
      <div
        className="w-16 h-[160px] bg-black opacity-80 fixed right-0 z-[60] top-[17.3%] text-white cursor-pointer"
        onClick={() => {
          setClick(true)
          const newStartIndex = (elementsPerSet + 1) % animes.length;
          scrollToSet(newStartIndex);
        }}
      />

    </div>
  );
}

