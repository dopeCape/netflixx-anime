import { z } from "zod";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";
import { ANIME } from "@consumet/extensions";
import { getAnimeInfo, getDub } from "../anime/epFinder";
const gogoanime = new ANIME.Gogoanime();
const bannerAnimes = [
  {
    name: "naruto",
    logo: "naruto_logo_nobg.png",
    url: "https://www005.vipanicdn.net/streamhls/012ef98641ababee475564c70e8ebc93/ep.1.1677592916.720.m3u8",
    img: "naruto_banner.jpg",
    start: 862,
    dis: "Naruto is a ninja-in-training whose wild antics amuse his teammates. But he's completely serious about one thing: becoming the world's greatest ninja!",
    end: 922,
  },
  {
    name: "naruto-shippuden",
    logo: "shippuden_logo.png",
    url: "https://www014.vipanicdn.net/streamhls/f23efce39606d64216a0023544f49bb4/ep.476.1677612506.720.m3u8",
    img: "naruto_shippuden_banner.webp",
    start: 660,
    dis: "a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
    end: 720,
  },
  {
    name: "your-lie-in-april",
    logo: "your_lie_logo.png",
    url: "https://www007.vipanicdn.net/streamhls/bc171728a120706ea805ea135d897a79/ep.21.1677608850.720.m3u8",
    img: "your_lie_banner.jpg",
    start: 620,
    dis: "an anime about a pianist overcoming his past trauma and finding inspiration through a violinist, intertwining music, love, and personal growth.",
    end: 680,
  },
  {
    name: "death-note",
    logo: "death_note_logo.png",
    url: "https://www021.vipanicdn.net/streamhls/6ac23c879654a36d4b6b1fc71c18cc30/ep.2.1677674416.1080.m3u8",
    img: "death_note_banner.jpeg",
    start: 920,
    dis: "A student who discovers a supernatural notebook that allows him to kill anyone begins a crusade against evil in order to rule the world.",
    end: 970,
  },
  {
    name: "demon-slayer",
    logo: "demon_slayer.png",
    url: "https://www007.vipanicdn.net/streamhls/5389aac31c41f666f74840b623eb7741/ep.1.1677592659.1080.m3u8",
    img: "demon_slayer_banner.jpg",
    start: 715,
    dis: "Tanjiro Kamado, who strives to become a Demon Slayer after his family was slaughtered and his younger sister, Nezuko, turned into a demon.",
    end: 768,
  },
];

export const animeRouter = createTRPCRouter({
  getAnime: publicProcedure.query(async () => {
    const res = await gogoanime.fetchGenreInfo("drama");
    return { res };
  }),
  getBannerAnime: publicProcedure.query(() => {
    const anime = bannerAnimes[Math.floor(Math.random() * bannerAnimes.length)];
    return anime;
  }),
  getAnimeSource: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const source = await gogoanime.fetchEpisodeSources(input);
      const animeName = input.split("episode")[0]?.slice(0, input.split("episode")[0]?.length - 1)
      const subURL = input.replace("episode", "dub-episode");
      const animeInfo = await getAnimeInfo(animeName);
      const dubUrls = await getDub(subURL);
      const res = {
        source,
        animeInfo,
        dubUrls,
      }


      return { res };
    }),
});
