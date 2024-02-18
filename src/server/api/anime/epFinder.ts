import { ANIME } from "@consumet/extensions";
const gogoanime = new ANIME.Gogoanime();

const getDub = async (id: string) => {
  try {
    const res = await gogoanime.fetchEpisodeSources(id);
    return res;
  } catch (error) {
    return null;
  }
};

const getAnimeInfo = async (id: string) => {
  try {
    const res = await gogoanime.fetchAnimeInfo(id);
    return res;
  } catch (error) {
    return null;
  }
};
export { getDub, getAnimeInfo };
