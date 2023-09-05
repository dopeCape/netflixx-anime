/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeHigh, faRotateRight, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/components/navbar/Narbar";
import { useState, useEffect, useRef } from "react";
import anime from "animejs";
import Hls from "hls.js";
import { api } from "@/utils/api";
import Row from "@/components/row/Row";
export default function Browse() {
  const videoRef = useRef<HTMLVideoElement>();
  const [videoVisible, setVideoVisible] = useState(true);
  const bannerTxtRef = useRef();
  const bannerImageRef = useRef();
  const [init, setInit] = useState<boolean>(false);
  const leftOpacDev = useRef(); const [muted, setMuted] = useState(true);
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
    anime(
      {
        targets: leftOpacDev.current,
        opacity: videoVisible ? [1, 0] : [0, 1],
        duration: 500,
      }
    )
    anime({
      targets: videoVisible ? videoRef.current : bannerImageRef.current,
      ...animationProps,
      opacity: 1,
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
                void videoRef.current.play()
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
                  translateY: -20,
                  duration: 800,
                  complete: () => {
                    setVideoVisible(false)
                  },
                  easing: "easeOutQuad",
                });
                anime({
                  targets: bannerTxtRef.current,
                  opacity: "1",
                  translateY: -10,
                  duration: 800,
                  easing: "easeOutQuad",
                })
              }
              if (Math.floor(videoRef.current.currentTime) === startSeconds + 5) {
                anime({
                  targets: imageRef.current,
                  width: "300px",
                  translateY: 280,
                  duration: 800,
                  easing: "easeOutQuad",
                  begin: (_a) => {
                    imageRef.current.style.width = "550px"; // Set initial opacity to hide the element
                  },
                });
                anime({
                  targets: bannerTxtRef.current,
                  opacity: "0",
                  translateY: 30,
                  duration: 400,
                  easing: "easeOutQuad",
                })
              }
            }
          };
          videoRef.current.addEventListener("timeupdate", timeUpdateHandler);
        }
      }
    }

  }, [bannerAnime, init]);

  return (
    <div className="flex flex-col max-w-screen overflow-hidden">
      <div className="flex  flex-col    relative  bg-black h-screen">
        <div className=" fixed z-[60] h-[7%] w-full  bg-transparent">
          <NavBar />
        </div>
        <div className="absolute top-0 z-40 h-[7%] w-full   bg-gradient-to-b from-black via-black-opacity-70 to-transparent"></div>
        <div className="left_opac left-0 absolute top-0 z-40 h-screen w-[60%] opacity-0  " ref={leftOpacDev}></div>
        <div className="absolute top-0  h-screen w-screen overflow-hidden ">
          <img
            src={bannerAnime.data?.logo}
            className="absolute top-[25%] z-50 ml-16 w-[550px] "
            ref={imageRef}
          />
          <h1
            className="text-white absolute top-[55%] ml-16 z-50
        text-[26px] w-[700px]
        "
            ref={bannerTxtRef}
          >{bannerAnime.data?.dis}</h1>
          {
            videoVisible ? <div className="rounded-full  border-white border-[2px] h-[60px] w-[60px] absolute z-50 top-[70%] right-[3%] cursor-pointer flex flex-wrap justify-center content-center"
              onClick={() => {
                setMuted(!muted)
              }}
            > <FontAwesomeIcon className=" text-[25px] text-white " icon={muted ? faVolumeXmark : faVolumeHigh} />
            </div>
              : <div
                className="rounded-full  border-white border-[2px] h-[60px] w-[60px] absolute z-50 top-[70%] right-[3%] cursor-pointer flex flex-wrap justify-center content-center"
                onClick={() => {
                  setVideoVisible(true)

                }}
              ><FontAwesomeIcon icon={faRotateRight} className="text-[25px] text-white" /></div>
          }
          {videoVisible ? (
            <video
              muted={muted}
              ref={videoRef}
              className="h-screen w-screen object-cover z-10"
              id="video"
            ></video>
          ) : (
            <img
              ref={bannerImageRef}
              src={bannerAnime.data?.img}
              className="absolute top-0 w-full h-full object-cover opacity-0 z-10"
            />
          )}
          <div className="w-[500px] h-[60px] absolute z-50 top-[70%] ml-16 flex  ">
            <button className="flex flex-wrap justify-center content-around w-[160px] bg-white hover:opacity-90 py-4 rounded-[5px]  border-none outline-none">
              <FontAwesomeIcon icon={faPlay}
                className="text-[35px] mr-3"
              ></FontAwesomeIcon>
              <span className="text-[25px]">Play</span>
            </button>
            <button className="flex flex-wrap justify-center content-around w-[250px] bg-[#6d6d6e] opacity-70 hover:opacity-30 py-4 rounded-[5px] ml-5 border-none outline-none ">
              <FontAwesomeIcon icon={faCircleInfo}
                className="text-[35px] mr-3 text-white  "
              ></FontAwesomeIcon>
              <span className="text-[25px] text-white">More Info</span>

            </button>
          </div>
        </div>
        <div className="absolute top-[90%] first_div w-screen h-[15%] ">
          <div className="absolute h-[290px] z-[70] top-[-30%] "
          >
            <Row title="Popular on Netflixx" />
          </div>
        </div>
      </div>
      <div className="bg-netflix_black h-screen w-screen">
      </div>
    </div>
  );
}
