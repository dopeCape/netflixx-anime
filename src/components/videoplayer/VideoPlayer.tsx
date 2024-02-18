/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useEffect, useRef, useState } from 'react';
import Loader from "../../../public/Eclipse-1s-200px.svg"
import { api } from '@/utils/api';
import Hls from 'hls.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import VolumeNob from './VolumeNob';
import PlaybackSpeed from "./PlaybackSpeed";
import PlayBackSpeedCont from './PlayBackSpeedCont';
import AudioAndSubs from './AudioAndSub';
import AudioAndSubsCont from './AudioAndSubsCont';
import Qulity from './Qulity';
import { EpisodesCon } from './EpisodeCon';
import { Episodes } from './Episodes';
import anime from 'animejs'; import Image from 'next/image';
import { useRouter } from 'next/router';
enum Visble {
  Timeline,
  Speed,
  AudioSubs,
  Qulity,
  Episode,
  Next
}
export default function VideoPlayer() {
  const videoRef = useRef(null);
  const timeoutRef = useRef<string>();
  const mouseMoveRef = useRef<string>();
  const [visible, setVisible] = useState<Visble>(Visble.Timeline);
  const leftBackWardRef = useRef(null);
  const rightForwardRef = useRef(null);
  const parentRef = useRef(null);
  const q = api.anime.getAnimeSource.useMutation();
  const contorlsRef = useRef(null);
  const hlsRef = useRef(null);
  const [qulity, setQUlity] = useState("");
  const [isDub, setIsDub] = useState(false);
  const centerPauseRef = useRef(null);
  const [speed, setSpeed] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [volume, setvVolume] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState("0px");
  const [remainingTime, setRemainingTime] = useState("");
  const [controlsVisible, setControlsVisibel] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [loader, setLoaderVible] = useState(false);
  const changeSpeed = (speed: number) => {
    setSpeed(speed);
  }
  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  useEffect(() => {
    anime(
      {
        targets: centerPauseRef.current,
        keyframes: [{ opacity: 1, duration: 200 }, { opacity: 0, duration: 200 }],
        easing: "linear"
      }
    )
  }, [videoRef.current?.paused])
  useEffect(() => {
    videoRef.current.playbackRate = speed;
  }, [speed])

  useEffect(() => {
    if (isBuffering) {
      timeoutRef.current = setTimeout(() => {
        setLoaderVible(true);
      }, 1000);
    } else {
      setLoaderVible(false);
      clearTimeout(timeoutRef.current);
    }
  }, [isBuffering])
  const handleMouseMoveForHidingTheContols = (e) => {
    clearTimeout(mouseMoveRef.current)
    console.log(visible, "visible")
    setControlsVisibel(true);
    mouseMoveRef.current = setTimeout(
      () => {
        setVisible(x => {
          if (x == Visble.Timeline) {
            setControlsVisibel(false);
            return x;
          }
          return x;
        })
      }
      , 1000)
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveForHidingTheContols)
    return (() => {
      window.removeEventListener("mousemove", handleMouseMoveForHidingTheContols)
    })
  }, [])

  const toggleFullscreen = () => {
    if (parentRef.current) {
      if (!isFullScreen) {
        if (parentRef.current.requestFullscreen) {
          parentRef.current.requestFullscreen();
        } else if (parentRef.current.mozRequestFullScreen) {
          parentRef.current.mozRequestFullScreen(); // Firefox
        } else if (parentRef.current.webkitRequestFullscreen) {
          parentRef.current.webkitRequestFullscreen(); // Chrome, Safari, and Opera
        } else if (parentRef.current.msRequestFullscreen) {
          parentRef.current.msRequestFullscreen(); // IE/Edge
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Chrome, Safari, and Opera
        } else if (document.msExitFullscreen) {
        }
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.key == "ArrowRight") {
      videoRef.current.currentTime += 10
      animateRight()
      handleMouseMoveForHidingTheContols()
    }
    if (event.key == "ArrowLeft") {
      videoRef.current.currentTime -= 10
      animateLeft()

      handleMouseMoveForHidingTheContols()
    }
    if (event.key == "ArrowUp") {
      if (videoRef.current.volume < 1) {
        setvVolume(videoRef.current.volume + 0.1)
        videoRef.current.volume += 0.1

        handleMouseMoveForHidingTheContols()
      }
    }
    if (event.key == "ArrowDown") {
      console.log(videoRef.current.volume)
      if (videoRef.current.volume > 0.01) {
        setvVolume(videoRef.current.volume - 0.1)
        videoRef.current.volume -= 0.1
        handleMouseMoveForHidingTheContols()
      }
    }
    if (event.key == " ") {
      if (videoRef.current.paused) {
        videoRef.current.play();
        handleMouseMoveForHidingTheContols()
      } else {
        videoRef.current.pause();
        handleMouseMoveForHidingTheContols()
      }
    }
  };

  const handleClick = (event) => {
    if (videoRef.current.pause) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    };
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  useEffect(() => {
    q.mutate(id);
  }, [id]);
  const changeLang = (isDub: boolean) => {
    const url = isDub ? q.data?.res.dubUrls?.sources.filter((x) => x.quality == qulity)[0] : q.data?.res.source?.sources.filter((x) => x.quality == qulity)[0]
    const currentTime = videoRef.current?.currentTime;
    hlsRef.current.loadSource(url?.url);
    seek(currentTime);
    videoRef.current.play();
  }

  const changeQulity = (url, qulity) => {
    const currentTime = videoRef.current.currentTime;
    setQUlity(qulity);
    hlsRef.current.loadSource(url);
    seek(currentTime);
    videoRef.current.play();
  }
  const seek = (time: number) => {
    videoRef.current.currentTime = time
  }
  useEffect(() => {
    if (q.data) {
      hlsRef.current = new Hls();
      const qulity = q.data.res.source.sources.filter(x => x.quality != "backup" && x.quality != "default").at(-1)
      setQUlity(qulity?.quality);
      hlsRef.current.loadSource(qulity?.url);
      hlsRef.current.attachMedia(videoRef.current);
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
      });
      hlsRef.current.on(Hls.Events.FRAG_LOADED, (event, data) => {
        if (hlsRef.current && hlsRef.current.buffered) {
          const videoBuffered = hlsRef.current.buffered.end(0); // Get the buffered end time
          const videoDuration = videoRef.current.duration;
          const percentage = (videoBuffered / videoDuration) * 100;
          setLoadedPercentage(percentage);
        }
      });
      if (q.error) {
      }
    }
  }, [q.data]);

  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        if (!isDragging) {
          const videoDuration = videoRef.current ? videoRef.current.duration : 0;
          setDraggingPosition((videoRef.current.currentTime / videoDuration) * 100 + '%')
          setCurrentTime(videoRef.current.currentTime);
        };
      }
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (Math.ceil(currentTime) == Math.ceil(duration)) {
        if (parseInt(id?.toString().split("-").at(-1)) < q?.data?.res.animeInfo?.episodes?.length) {
          void router.push(`/watch/v2/${id?.toString().split("-").slice(0, id?.toString().split("-").length - 1).join("-").toString() + "-" + (parseInt(id?.toString().split("-").at(-1)) + 1).toString()}`)
          setTimeout(() => {
            location.reload();
          }, 0)
        }

      }
      const remaining = duration - currentTime;
      setRemainingTime(formatTime(remaining));
    };
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', updateTime);
      videoRef.current.addEventListener('seeking', () => {
        setIsBuffering(true); // Set loading state when seeking
      });
      videoRef.current.addEventListener('seeked', () => {
        setIsBuffering(false); // Clear loading state when seeking is done
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', updateTime);
        // Remove event listeners for seeking events here
      }
    };
  }, []);

  const videoDuration = videoRef.current ? videoRef.current.duration : 0;
  const timelineWidth = currentTime == 0 ? "0%" : (currentTime / videoDuration) * 100 + '%';
  const loadedWidth = loadedPercentage + '%';
  const ballPosition = isDragging ? draggingPosition : (currentTime / videoDuration) * 100 + "%";

  const animateRight = () => {
    anime({
      targets: rightForwardRef.current,
      keyframes: [{ opacity: 1, duration: 200 }, { opacity: 0, duration: 200 }],
      easing: "linear"
    })

  }
  const animateLeft = () => {
    anime({
      targets: leftBackWardRef.current,
      keyframes: [{ opacity: 1, duration: 200 }, { opacity: 0, duration: 200 }],
      easing: "linear"
    })

  }
  const handleTimelineClick = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const newTime = (clickX / boundingRect.width) * videoDuration;
    if (!isNaN(newTime)) {
      videoRef.current.currentTime = newTime;
    }
  };
  const handleBallMouseDown = (event) => {
    setIsDragging(true);
    handleMouseMove(event);
  };
  const handleBallMouseUp = () => {
    setIsDragging(false);
  };
  const setVolume = (vol: number) => {
    setvVolume(vol);
    videoRef.current.volume = vol;
  }
  const handleMouseMove = (event) => {
    if (isDragging) {
      const boundingRect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - boundingRect.left;
      const newTime = (mouseX / boundingRect.width) * videoDuration;
      setCurrentTime(newTime)
      setDraggingPosition(mouseX);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === null) {
        setIsFullScreen(false);
      } else {

        setIsFullScreen(true);


      }
    };

    // Add a fullscreen change event listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      className="h-screen w-screen relative flex flex-wrap content-center justify-center bg-black"
      ref={parentRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleBallMouseUp}
    >
      {
        q.isLoading || loading ? <div
          className='w-screen h-screen bg-black opacity-40 flex flex-warp justify-center content-center absolute top-0 left-0'
        >
          <Image
            alt='Loading'
            src={Loader}
          />
        </div> : null

      }
      <div
        className='w-screen h-screen z-[20]'
      >
        <video ref={videoRef} className={`object z-10 w-screen h-screen`} controls={false} />
      </div>
      {isBuffering && (
        <div className='before:bg-black before:opacity-40 before:w-full before:absolute before:h-full h-screen w-screen z-50 absolute flex flex-warp content-center justify-center '>
          <Image
            src={Loader}
            alt='Loading'
          />
        </div>
      )}

      {controlsVisible &&
        <div
          className='w-screen h-screen absolute '
          style={{ zIndex: visible == Visble.Timeline ? 50 : 60 }}
          ref={contorlsRef}
        >
          <div className='absolute top-8 left-8 text-white text-[2.5rem]'>
            <FontAwesomeIcon
              icon={faArrowLeft}
            />
          </div>
          {visible == Visble.Timeline &&
            <div className="absolute bottom-[10%] flex w-screen ">
              <div className="relative w-[93%] ml-8 h-[5px] bg-gray-500 z-50 group  hover:h-[8px] transition-height duration-300 ease-in-out  cursor-pointer" onClick={handleTimelineClick}>
                <div style={{ width: timelineWidth }} className="h-full bg-netflix_red"></div>
                <div
                  style={{ width: loadedWidth }}
                  className="h-full bg-green-500"
                ></div>{' '}
                {/* Loaded portion indicator */}
                <div
                  className={`h-4 w-4 bg-netflix_red rounded-full absolute top-[-100%] left-0 cursor-pointer group-hover:h-5 group-hover:w-5  group-hover:top-[-80%]  no_transtion `}
                  style={{ left: draggingPosition }}
                  onMouseDown={handleBallMouseDown}
                  onMouseUp={(e) => {
                    const boundingRect = e.currentTarget.getBoundingClientRect();
                    const mouseX = e.clientX - boundingRect.left;
                    const newTime = (mouseX / boundingRect.width) * videoDuration;
                    if (!isNaN(newTime)) {
                      videoRef.current.currentTime = newTime;
                    }
                  }}
                ></div>
              </div>
              <div className='text-white  absolute bottom-2 ml-5 z-40  before:absolute before:h-full before:w-full before:bg-gradient-to-t before:bottom-0 before:from-black before:z-30 right-5 top-[-200%]  '>
                {remainingTime}
              </div>
            </div>
          }
          <div className='absolute bottom-0 bg-gradient-to-t from-black z-30 w-screen h-[100px]'>
          </div>

          <div className="absolute flex bottom-[4%] gap-10 content-center   flex-wrap ml-8 ">
            <div
              className="z-50 text-white text-[2.5rem] hover:scale-125 transition-all cursor-pointer  top-3 relative "
              onClick={() => (videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause())}
            >
              {
                videoRef.current?.paused ?
                  (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" data-name="Play" aria-hidden="true"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path></svg>
                  )
                  :
                  (

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10  " data-name="Pause" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="currentColor"></path></svg>

                  )

              }
            </div>
            <div className="z-50 text-white top-3 relative" onClick={() => {
              videoRef.current.currentTime -= 10
              animateLeft()
            }
            }>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-10 h-10 hover:scale-125 transition-all  " data-name="Back10" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97066 20.8978 6.88324 21.5694 9.09717C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479973 13.5867 -0.214321 10.8238 0.0578004C8.71195 0.265799 6.70517 1.02858 5 2.2532V1H3V5C3 5.55228 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55228 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1758 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43388C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43388C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1758 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01928V15.8554H8.60395Z" fill="currentColor"></path></svg>
            </div>
            <div className="z-50 text-white top-3 relative" onClick={() => {
              videoRef.current.currentTime += 10
              animateRight();
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-10 h-10 hover:scale-125 transition-all  " data-name="Forward10" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.4443 3.68532C8.36795 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55229 21 5V1H19V2.2532C17.2948 1.02859 15.2881 0.2658 13.1762 0.057802C10.4133 -0.214319 7.64154 0.479975 5.33316 2.02238C3.02478 3.56479 1.32262 5.85989 0.516718 8.51661C-0.289188 11.1733 -0.148981 14.0273 0.913451 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09718C3.10219 6.88324 4.52065 4.97067 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55229 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2078 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1759 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43389C15.2078 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43389C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1759 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.429 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.429 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01929L7 9.81956V11.1405L8.60395 10.7163Z" fill="currentColor"></path></svg>
            </div>
            <div className='w-10 h-10 top-3 relative z-40'>
              <VolumeNob volume={volume} volumeChanger={setVolume} />
            </div>
          </div>
          <div className='text-white text-[2rem] z-40  absolute left-[50%] translate-x-[-50%] translate-y-[10%]    bottom-[3%] text-bold'>
            {id?.toString().split("episode")[0]?.split("-")[0][0]?.toUpperCase() + id?.toString().split("episode")[0]?.replaceAll("-", " ")?.slice(1) + "Episode " + id?.toString().split("-").at(-1)}
          </div>

          <div className='absolute flex bottom-[4%] gap-10 content-center   flex-wrap right-5 group'>
            {
              parseInt(id?.toString().split("-").at(-1)) < q?.data?.res.animeInfo?.episodes?.length ?
                <div className='cursor-pointer '
                  onClick={() => {
                    void router.push(`/watch/v2/${id?.toString().split("-").slice(0, id?.toString().split("-").length - 1).join("-").toString() + "-" + (parseInt(id?.toString().split("-").at(-1)) + 1).toString()}`)
                    setTimeout(() => {
                      location.reload();
                    }, 0)
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer z-50 text-white relative top-3 w-10 h-10 hover:scale-125 transition-all" data-name="NextEpisode" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 3H20V21H22V3ZM4.28615 3.61729C3.28674 3.00228 2 3.7213 2 4.89478V19.1052C2 20.2787 3.28674 20.9977 4.28615 20.3827L15.8321 13.2775C16.7839 12.6918 16.7839 11.3082 15.8321 10.7225L4.28615 3.61729ZM4 18.2104V5.78956L14.092 12L4 18.2104Z" fill="currentColor"></path></svg>
                </div>
                : null
            }
            <div className='cursor-pointer '
              onClick={() => {
                if (visible != Visble.Episode) {
                  setVisible(Visble.Episode)
                } else {
                  setVisible(Visble.Timeline)
                }
              }}
            >
              <Episodes />
            </div>
            <div className='cursor-pointer text-white  z-50   relative'
              onClick={() => {
                if (visible != Visble.Qulity) {
                  setVisible(Visble.Qulity)
                } else {
                  setVisible(Visble.Timeline)
                }
              }}
            >
              <FontAwesomeIcon icon={faGear} className='top-4 relative text-[2rem] hover:scale-125 transition-all' />
            </div>
            <div className='cursor-pointer '
              onClick={() => {
                if (visible != Visble.AudioSubs) {
                  setVisible(Visble.AudioSubs)
                } else {
                  setVisible(Visble.Timeline)
                }
              }}
            >
              <AudioAndSubs />
            </div>
            <div className=' cursor-pointer '
              onClick={() => {
                if (visible != Visble.Speed) {
                  setVisible(Visble.Speed)
                } else {
                  setVisible(Visble.Timeline)
                }
              }}
            >
              <PlaybackSpeed />
            </div>
            <div className="" onClick={toggleFullscreen}>
              {isFullScreen ?
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-125 transition-all text-white h-10 w-10 top-3 relative z-40 cursor-pointer" data-name="FullscreenExit" aria-hidden="true" data-uia="control-fullscreen-exit"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 8H19V3H17V9V10H18H24V8ZM0 16H5V21H7V15V14H6H0V16ZM7 10H6H0V8H5V3H7V9V10ZM19 21V16H24V14H18H17V15V21H19Z" fill="currentColor"></path></svg>
                :
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-125 transition-all text-white h-10 w-10 top-3 relative z-40 cursor-pointer" data-name="FullscreenEnter" aria-hidden="true" data-uia="control-fullscreen-enter"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" fill="currentColor"></path></svg>
              }
            </div>
          </div>
          {visible == Visble.Speed ?
            <div
              className='w-[700px] h-[200px]  bottom-[10%] fixed z-[60] right-3 rouned-[5px] rouned-[5px]'
            >
              <PlayBackSpeedCont speed={speed} setSpeed={changeSpeed} />
            </div>
            : visible == Visble.AudioSubs ?
              <div
                className='w-[600px] h-[700px]  bottom-[10%] fixed z-[60] right-3 rouned-[5px] rouned-[5px]'
              >
                <AudioAndSubsCont isDubAvaliable={q.data?.res.dubUrls ? true : false} isDubSetter={setIsDub} isDub={isDub} changeSouce={changeLang} />
              </div>
              : visible == Visble.Qulity ?
                <div
                  className='w-[300px] h-[280px]  bottom-[10%] fixed z-[60] right-3  rounded-[5px]'
                >
                  <Qulity qulityes={!isDub ? q.data?.res.source.sources.filter(x => x.quality != "backup" && x.quality != "default") : q.data?.res.dubUrls?.sources.filter(x => x.quality != "backup" && x.quality != "default")} currentQulity={qulity} changeQulityes={changeQulity} />
                </div>
                : visible == Visble.Episode ?
                  <div
                    className='w-[800px] h-[700px]  bottom-[10%] fixed z-[60] right-3  rounded-[5px]'
                  >
                    <EpisodesCon epis={q.data?.res.animeInfo} currentEp={id?.toString().split("-").at(-1)} visibleSetter={setVisible} loadingVisible={setLoading} />
                  </div>
                  : null}
        </div>
      }
      <div>
      </div>
      <div
        className=' w-28 h-28 rounded-full flex flex-wrap content-center justify-center absolute z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white opacity-0'
        ref={centerPauseRef}
      >
        <div className='w-full h-full rounded-full bg-black opacity-40 absolute '>

        </div>
        <div className='z-50'

        >        {
            !videoRef.current?.paused ?
              (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" data-name="Play" aria-hidden="true"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path></svg>
              )
              :
              (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10  " data-name="Pause" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="currentColor"></path></svg>
              )

          }
        </div>
      </div>
      <div
        className=' w-28 h-28 rounded-full flex flex-wrap content-center justify-center absolute z-50 top-[50%] left-[25%] translate-x-[-50%] translate-y-[-50%] text-white opacity-0'
        ref={leftBackWardRef}
      >
        <div className='w-full h-full rounded-full bg-black opacity-40 absolute '>

        </div>
        <div className='z-50'
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-10 h-10 hover:scale-125 transition-all  " data-name="Back10" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97066 20.8978 6.88324 21.5694 9.09717C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479973 13.5867 -0.214321 10.8238 0.0578004C8.71195 0.265799 6.70517 1.02858 5 2.2532V1H3V5C3 5.55228 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55228 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1758 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43388C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43388C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1758 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01928V15.8554H8.60395Z" fill="currentColor"></path></svg>
        </div>
      </div>


      <div
        className=' w-28 h-28 rounded-full flex flex-wrap content-center justify-center absolute z-50 top-[50%] right-[25%] translate-x-[-50%] translate-y-[-50%] text-white opacity-0'
        ref={rightForwardRef}
      >
        <div className='w-full h-full rounded-full bg-black opacity-40 absolute '>

        </div>
        <div className='z-50'
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-10 h-10 hover:scale-125 transition-all  " data-name="Forward10" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.4443 3.68532C8.36795 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55229 21 5V1H19V2.2532C17.2948 1.02859 15.2881 0.2658 13.1762 0.057802C10.4133 -0.214319 7.64154 0.479975 5.33316 2.02238C3.02478 3.56479 1.32262 5.85989 0.516718 8.51661C-0.289188 11.1733 -0.148981 14.0273 0.913451 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09718C3.10219 6.88324 4.52065 4.97067 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55229 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2078 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1759 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43389C15.2078 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43389C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1759 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.429 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.429 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01929L7 9.81956V11.1405L8.60395 10.7163Z" fill="currentColor"></path></svg>
        </div>
      </div>
      <div className='absolute w-full h-[80%]  z-[55] top-[8%] left-0'
        onClick={() => {
          videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
        }}
      ></div>

    </div>
  );
}

