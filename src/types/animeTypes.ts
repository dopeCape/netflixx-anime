interface IAnime {
  name: string;
  coverUrl: string;
  id: string;
}
interface IEpisode {
  no: number;
  id: string;
  url: string;
}

export type { IAnime, IEpisode };
