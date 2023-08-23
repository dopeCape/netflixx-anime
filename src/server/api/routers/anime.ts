import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";
import { ANIME } from "@consumet/extensions";
const gogoanime = new ANIME.Gogoanime();
const bannerAnimes = [
  {
    name: "naruto",
    logo: "naruto_logo_nobg.png",
    url: "https://www005.vipanicdn.net/streamhls/027e9529af2b06fe7b4f47e507a787eb/ep.1.1677593055.720.m3u8",
    start: 87,
    dis: "Naruto is a ninja-in-training whose wild antics amuse his teammates. But he's completely serious about one thing: becoming the world's greatest ninja!",
    end: 120,
  },
];

export const animeRouter = createTRPCRouter({
  getAnime: publicProcedure.query(async () => {
    const res = await gogoanime.fetchEpisodeSources("naruto-episode-48");
    return { res };
  }),
  getBannerAnime: publicProcedure.query(() => {
    const anime = bannerAnimes[Math.floor(Math.random() * bannerAnimes.length)];
    return anime;
  }),
});
