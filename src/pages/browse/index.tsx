/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import SearchArea from "@/components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/components/navbar/Narbar";
import { useState, useEffect, useRef } from "react";
import anime from "animejs";
import Hls from "hls.js";
import { api } from "@/utils/api";
export default function Browse() {
  const videoRef = useRef<HTMLVideoElement>();
  const [videoVisible, setVideoVisible] = useState(true);
  const bannerTxtRef = useRef();
  const bannerImageRef = useRef();
  const [init, setInit] = useState<boolean>(false);
  const [muted, setMuted] = useState(true);
  const bannerAnime = api.anime.getBannerAnime.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,

  });
  const imageRef = useRef();
  const hlsRef = useRef(null);
  useEffect(() => {
    const animationProps = {
      opacity: 1,
    };
    anime({
      targets: videoVisible ? videoRef.current : bannerImageRef.current,
      ...animationProps,
      duration: 500,
      easing: 'easeInOutQuad',
    });
  }, [videoVisible]);

  useEffect(() => {
    if (bannerAnime.data) {
      const {
        url: videoSource,
        end: endSeconds,
        start: startSeconds,
      } = bannerAnime.data;
      if (videoRef.current && videoSource) {
        hlsRef.current = new Hls();
        if (Hls.isSupported() && !init) {
          if (videoRef.current.paused) {
            hlsRef.current.loadSource(videoSource);
            hlsRef.current.attachMedia(videoRef.current);
            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
              if (videoRef.current?.paused) {
                videoRef.current.currentTime = startSeconds;
                void videoRef.current.play();
              }
            });


          }
          const timeUpdateHandler = () => {
            if (videoRef.current) {
              if (videoRef.current.currentTime >= endSeconds) {
                videoRef.current.pause();
                anime({
                  targets: imageRef.current,
                  width: "550px",
                  top: "25%",
                  duration: 800,
                  complete: () => {
                    setVideoVisible(false)
                  },
                  easing: "easeOutQuad",
                });
                anime({
                  targets: bannerTxtRef.current,
                  opacity: "1",
                  top: "55%",
                  duration: 800,
                  easing: "easeOutQuad",
                })
              }
              if (Math.floor(videoRef.current.currentTime) === startSeconds + 5) {
                anime({
                  targets: imageRef.current,
                  width: "300px",
                  top: "55%",
                  duration: 800,
                  easing: "easeOutQuad",
                  begin: (_a) => {
                    imageRef.current.style.width = "550px"; // Set initial opacity to hide the element
                  },
                });
                anime({
                  targets: bannerTxtRef.current,
                  opacity: "0",
                  top: "70%",
                  duration: 800,
                  easing: "easeOutQuad",
                })
              }
            }
          };
          videoRef.current.addEventListener("timeupdate", timeUpdateHandler);
        }
      }
    }
    return () => {
      if (hlsRef.current) {
      }
    };
  }, [bannerAnime, init]);

  return (
    <div className="flex h-screen w-screen flex-wrap content-center  justify-center bg-black">
      <div className="absolute top-0 z-50 h-[5%] w-full bg-transparent">
        <NavBar />
      </div>
      <div className="absolute top-0 z-40 h-[10%] w-full bg-gradient-to-b from-black"></div>
      <div className="absolute bottom-0 z-40 h-[20%] w-full bg-gradient-to-t from-black"></div>
      <div className="absolute top-0 z-10 h-screen w-screen overflow-hidden ">
        <img
          src={bannerAnime.data?.logo}
          className="absolute top-[25%] z-50 ml-10 w-[550px] "
          ref={imageRef}
        />
        <h1
          className="text-white absolute top-[55%] ml-10 z-50
        text-[26px] w-[700px]
        "
          ref={bannerTxtRef}
        >{bannerAnime.data?.dis}</h1>
        {
          videoVisible ? <div className="rounded-full p-3 border-white border-[2px] h-[60px] w-[60px] absolute z-50 top-[70%] right-[3%] cursor-pointer"
            onClick={() => {
              setMuted(!muted)
            }}
          > <FontAwesomeIcon className=" text-[35px] text-white " icon={muted ? faVolumeXmark : faVolumeOff} />
          </div>
            : null
        }
        {videoVisible ? (
          <video
            muted={muted}
            ref={videoRef}
            className="h-[100%] w-screen object-cover"
            id="video"
          ></video>
        ) : (
          <img
            ref={bannerImageRef}
            src={bannerAnime.data?.img}
            className="absolute top-0 w-full h-full object-cover opacity-0"
          />
        )}
      </div>
      <SearchArea />
    </div>
  );
}
