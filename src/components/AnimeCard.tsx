import { IAnime } from "@/types/animeTypes";
import { useRouter } from "next/router";

export default function AnimeCard({ anime }: { anime: IAnime }) {
  const router = useRouter();

  return (
    <div
      className="h-full w-full text-white"
      onClick={() => {
        router.push(`/watch/${anime.id}`);
      }}
    >
      <img
        className="h-[150px] w-[200px] object-contain"
        alt={anime.name}
        src={anime.coverUrl}
      />
      <div className="text-white">{anime.name}</div>
    </div>
  );
}
