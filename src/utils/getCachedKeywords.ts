import searchApi from "../api/search";

const getCachedKeywords = (keyword: string) => {
  const cachedKeywords = localStorage.getItem(keyword);
  const EXPIRE_TIME = 600000;

  const fetchRecommended = async () => {
    try {
      const res = await searchApi.getRecommended(keyword);
      const obj = {
        value: res.data,
        expiresAt: Date.now() + EXPIRE_TIME,
      };
      localStorage.setItem(keyword, JSON.stringify(obj));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  if (cachedKeywords) {
    const parsedKeywords = JSON.parse(cachedKeywords);
    if (Date.now() > parsedKeywords.expiresAt) {
      localStorage.removeItem(keyword);
      return fetchRecommended();
    } else {
      return parsedKeywords.value;
    }
  } else {
    return fetchRecommended();
  }
};

export default getCachedKeywords;
