import GenricReaButton from "./GenricButtonRed";

export default function HomeScreenMidSection() {
  return (
    <div className="relative flex h-full w-full flex-col flex-wrap content-center justify-center text-center  ">
      <h1 className=" text-[2rem] font-bold 2xl:text-[3rem]">
        Unlimited anime, Manga and more
      </h1>
      <p className="mt-3 text-[1rem]">Watch anywhere and anytime</p>
      <h3 className="mt-5 text-[1rem]">
        Read to watch? Create a free account to enjoy full experience
      </h3>
      <div className=" mt-5  flex w-full flex-wrap justify-center">
        <div className="mt-5 h-[50px] w-[140px] 2xl:w-[170px]">
          <GenricReaButton text={"Start Watching"} func={() => ""} />
        </div>
      </div>
    </div>
  );
}
