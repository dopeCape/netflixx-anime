/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IEpisode } from "@/types/animeTypes";
import Spinner from "@/Triangles-1s-200px.svg"
import instance from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
export default function WactchAnime() {
  const router = useRouter();

  const iframeRef = useRef()
  const [episoed, setEpiosed] = useState<IEpisode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEpiose, setSelectedEpisode] = useState<string>("");
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await instance.get(`info/${router.query.anime}`);
        const tempEps: IEpisode[] = [];
        res.data.episodes.forEach((ep) => {
          tempEps.push({ no: ep.number, id: ep.id, url: ep.url });
        });
        setEpiosed(tempEps);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchEpisodes();
  }, []);
  const fetechEpioseDetail = async (id: string) => {
    try {
      const res = await instance.get(`/watch/${id}`);
      setSelectedEpisode(res.data.headers.Referer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col flex-wrap  content-center justify-center bg-black ">
      {episoed.length > 0 ? (
        <>
          <iframe src={selectedEpiose} className="h-[600px] w-[800px]" loading="eager" onLoad={() => { setLoading(false) }}
            onLoadStart={() => { setLoading(true) }}
            allowFullScreen
          ></iframe>
          {loading ?
            <div className="text-white">Loading</div>
            : null}
        </>
      ) : null}

      <div className="mt-5 grid max-h-[200px] max-w-[800px] grid-cols-12 gap-2 overflow-scroll bg-black">
        {episoed.map((ep, index) => {
          return (
            <button
              key={index}
              className="text-blue w-[30px] bg-white"
              onClick={() => {
                if (selectedEpiose != ep.id) {
                  void fetechEpioseDetail(ep.id);
                }
              }}
            >
              {ep.no}
            </button>
          );
        })}
      </div>
    </div>
  );
}
