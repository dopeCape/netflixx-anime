import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  const [anime, setAnime] = useState<string>("");

  useEffect(() => {
    const f = async () => {
      const res = await axios.get("https://api.jikan.moe/v4/anime/20/full");
      setAnime(res.data.data.images.jpg.large_image_url);
    };
    void f();
  }, []);
  return (
    <div className="m-auto mt-16 h-[200px] w-[400px] overflow-hidden ">
      <img
        src={anime}
        className="h-[200px] w-[400px] rounded-md object-cover "
      />
    </div>
  );
}
