import { IAnimeInfo } from "@consumet/extensions";
import anime from "animejs";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

enum Visble {
  Timeline,
  Speed,
  AudioSubs,
  Qulity,
  Episode,
  Next
}
interface Iprop {
  epis: IAnimeInfo | null | undefined;
  currentEp: string;
  visibleSetter: (v: Visble) => void;
  loadingVisible: (v: boolean) => void;
}
enum Screen {
  Eplist,
  Season,
}
export function EpisodesCon({ epis, currentEp, visibleSetter, loadingVisible }: Iprop) {
  const router = useRouter();
  const r = useRef(null);
  useEffect(() => {
    console.log(epis);

  }, [])
  const r2 = useRef(null);
  const animateTransition = (entering: boolean) => {
    if (entering) {
      anime({
        targets: r2.current,
        translateX: ["0%", "-100%"],
        easing: "easeInOutSine",
        duration: 400,
      });
      anime({
        targets: r.current,
        keyframes: [{
          translateY: "-100%",
          duration: 1,
        }, {
          translateX: ["100%", "0%"],
          duration: 400,
        }],
        easing: "easeInOutSine",
        duration: 400,
      });
    } else {
      anime({
        targets: r2.current,
        keyframes: [{
          translateX: ["-100%", "0%"],
          duration: 400,
        }],
        easing: "easeInOutSine",
        complete: () => {
          // Additional logic after the animation completes
        },
      });
      anime({
        targets: r.current,
        translateX: ["0%", "100%",],
        easing: "easeInOutSine",
        duration: 400,
        complete: () => {
          // Additional logic after the animation completes
        },
      });
    }
  };

  const [screen, setScreen] = useState<Screen>(Screen.Season);
  useEffect(() => {
    if (epis?.episodes?.length > 50) {
      const seasons = Math.ceil(epis?.episodes?.length / 50);
      setSeasonList(seasons);
    } else {
      setSeasonList(1);

    }
  }, []);
  const [selectedSeason, setSeletedSeason] = useState(0);
  const [selectedEp, setSelectedEp] = useState(currentEp);
  const [seasonList, setSeasonList] = useState(0);
  return <div className="h-full w-full overflow-hidden">
    <div className="flex h-full w-full flex-col rounded-[5px] bg-[#262626] pt-5 text-white "
      ref={r2}
    >
      <div className="  text-[1.5rem] text-white  ml-8 text-bold">
        {epis?.title.replaceAll("-", " ").toString()}
      </div>
      <div className="flex w-full flex-col   overflow-y-scroll text-white mt-3 ">
        {Array.from({ length: seasonList }, (_, index) => index + 1).map(
          (x) => {
            return (
              <div key={x} className="w-full px-4 py-4 hover:bg-netflix_gray flex group relative  cursor-pointer border-white border-[0px]"
                style={{ borderWidth: `${parseInt(currentEp) <= x * 50 && parseInt(currentEp) >= (x - 1) * 50 + 1 ? 3 : 0}px` }}
                onClick={() => {
                  setSeletedSeason(x);
                  setScreen(Screen.Eplist)
                  setTimeout(() => {
                    animateTransition(true); // Entering the Eplist screen
                  }, 0)
                }}
              >
                <div className="opacity-0 "
                  style={{ opacity: `${parseInt(currentEp) <= x * 50 && parseInt(currentEp) >= (x - 1) * 50 + 1 && 1}` }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white" data-name="Checkmark" aria-hidden="true" data-uia="audio-selected"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                </div>
                <div className="ml-3 text-bold">
                  {x == seasonList
                    ? `${(x - 1) * 50 + 1}-${((x - 1) * 50) + epis?.episodes?.length % 50}`
                    : `${(x - 1) * 50 + 1}-${x * 50}`}
                </div>
                <div className="group-hover:opacity-100 opacity-0 text-2xl absolute right-4 translate-y-[-5px] " >
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
    <div className="flex h-full w-full flex-col rounded-[5px] bg-[#262626]  text-white  translate-x-[100%] "
      ref={r}
    >
      <div className="  text-[1.5rem] text-white py-4 border-[3px] hover:bg-[#3c3c3c] border-white  text-bold flex rounded-t-[5px] cursor-pointer"
        onClick={() => {
          animateTransition(false);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="translate-y-[5px] ml-3 mr-3 " />
        {selectedSeason == seasonList
          ? `${(selectedSeason - 1) * 50 + 1}-${((selectedSeason - 1) * 50) + epis?.episodes?.length % 50}`
          : `${(selectedSeason - 1) * 50 + 1}-${selectedSeason * 50}`}
      </div>
      <div className="flex w-full flex-col   overflow-y-scroll relative"
      >
        {epis?.episodes?.slice((selectedSeason - 1) * 50, selectedSeason * 50).map((ep, index) => {
          return <div key={index} className={`p-4 hover:bg-[#3c3c3c] cursor-pointer flex`}
            style={{ backgroundColor: selectedEp == ep.id.split("-").at(-1) ? "#131313" : null }}
            data-value={ep.number}
            onClick={() => {
              // setSelectedEp(ep.id.split("-").at(-1));
              visibleSetter(Visble.Timeline);
              void router.push("/watch/v2/" + ep.id);
              setTimeout(() => {
                location.reload();
              }, 0)
            }}
          >
            <div className=" translate-y-[5px]"
              style={{ opacity: selectedEp == ep.id.split("-").at(-1) ? 1 : 0 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white" data-name="Checkmark" aria-hidden="true" data-uia="audio-selected"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
            </div>

            <div className="text-bold text-xl ml-3 ">{ep.title ? ep.title : ep.id.split("-").slice(ep.id.split("-").length - 2).join(" ")}</div>
          </div>
        })}
      </div>
      <div className="absolute bottom-0 w-full h-[5%] bg-gradient-to-t from-[#262626] z-10 left-0"></div>
    </div>


  </div>
}
