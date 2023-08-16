/* eslint-disable @typescript-eslint/no-unsafe-call */
import instance from "@/utils/axios";
import { useEffect, useState } from "react";
import { IAnime } from "@/types/animeTypes";
import AnimeCard from "./AnimeCard";


export default function SearchArea() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [animes, setAnimes] = useState<IAnime[]>([]);
  useEffect(() => {
    const fetchAnimeFromQuery = async () => {
      try {
        const res = await instance.get(`/${searchQuery}?page=1`);
        const tempAnimes: IAnime[] = [];
        res?.data.results.forEach((anime) => {
          tempAnimes.push({ name: anime.title, coverUrl: anime.image, id: anime.id });
        });


        setAnimes(tempAnimes);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchQuery != "") {
      void fetchAnimeFromQuery()
    }
  }, [searchQuery]);
  return (
    <div className="h-full w-full flex flex-col flex-wrap  content-center justify-center">
      <input
        className="border-none bg-gray-400 outline-none "
        placeholder="search for a anime"
        value={searchQuery}
        onChange={
          (e) => {
            setSearchQuery(e.target?.value)
          }
        }
      />
      <div className="grid  grid-cols-3  max-h-[500px] max-w-[900px] overflow-scroll">
        {animes.map((anime, index) => {
          return <div key={index} className="w-[250px] h-[200px]">
            <AnimeCard anime={anime} />
          </div>
        })}

      </div>
    </div>
  );
}


