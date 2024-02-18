import {
  faPlay,
  faPlus,
  faThumbsUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CardDeatails() {
  return (
    <div className="absolute flex h-full w-full flex-col bg-netflix_black px-5  pt-5 rounded-b-[5px] " >
      <div className="flex  w-full flex-wrap content-center justify-start">
        <div className="flex h-8 w-8 cursor-pointer flex-wrap content-center justify-center rounded-full bg-white  text-xl">
          <FontAwesomeIcon icon={faPlay} />
        </div>

        <div className="ml-2 flex h-8 w-8 cursor-pointer flex-wrap content-center  justify-center rounded-full border-[2px] border-gray-400 bg-[#484848]  text-xl text-white hover:border-white">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="ml-2 flex h-8 w-8 cursor-pointer flex-wrap content-center  justify-center rounded-full border-[2px] border-gray-400 bg-[#484848]  text-xl text-white hover:border-white">
          <FontAwesomeIcon icon={faThumbsUp} />
        </div>

        <div className="ml-auto flex h-8 w-8 cursor-pointer flex-wrap content-center  justify-center rounded-full border-[2px] border-gray-400 bg-[#484848]  text-xl text-white hover:border-white">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
}
