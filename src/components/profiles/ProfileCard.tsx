/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

interface ProfileCardProps {
  url: string;
  name: string;
  id: string;
}

export default function ProfileCard({ name, url, id }: ProfileCardProps) {
  const router = useRouter();

  const handleClick = () => {
    window.localStorage.setItem("profile", id)
    void router.push("/browse");
  };

  return (
    <div className="group h-full w-full cursor-pointer " onClick={handleClick}>
      <div className="object-fit relative h-[250px] w-[250px]  overflow-hidden rounded-[5px]    border-transparent">
        <img
          src={url}
          className="object-fit z-40 h-[250px] w-[250px]"
          alt="Profile"
        />
        <div className="absolute inset-0 z-50 h-[250px] w-[250px] rounded-[5px] border-[3px] border-transparent group-hover:border-[white]"></div>
      </div>
      <div className="mt-5 text-center text-[24px] text-gray-500 group-hover:text-white">
        {name}
      </div>
    </div>
  );
}

