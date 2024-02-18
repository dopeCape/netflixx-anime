interface Iprop {
  speed: number;
  setSpeed: (speed: number) => void;
}
export default function PlayBackSpeedCont({ speed, setSpeed }: Iprop) {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5];

  return (
    <div className="flex h-full w-full flex-col bg-netflix_black p-8">
      <div className="text-[2rem] text-white">Playback Speed</div>
      <div className=" flex-warp relative  mt-10 flex h-[1px] w-full justify-between bg-white">
        {speeds.map((index) => {
          return index == speed ? (
            <div className="flex h-12 w-12 translate-y-[-50%]  flex-wrap content-center justify-center rounded-full border-[4px] border-gray-500 bg-netflix_black">
              <div className=" h-5 w-5  rounded-full bg-white"></div>
            </div>
          ) : (
            <div
              key={index}
              className="flex h-12 w-12 translate-y-[-50%]  flex-wrap content-center justify-center rounded-full border-[4px] border-transparent bg-netflix_black cursor-pointer"
              onClick={() => {
                setSpeed(index);
              }}
            >
              <div className=" h-5 w-5  rounded-full bg-white"
                onClick={() => {
                  setSpeed(index);
                }}
              ></div>
            </div>
          );
        })}
      </div>

      <div className=" flex-warp relative  mt-10 flex  w-full  justify-between">
        {speeds.map((index) => {
          return (
            <div
              key={index}
              className="text-white"
              style={{ fontWeight: index == speed ? "bold" : "normal" }}
            >
              {index + "X"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
