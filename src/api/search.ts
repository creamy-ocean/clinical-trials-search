import { axiosClient } from "./axiosClient";

const searchApi = {
  getRecommended: async (keyword: string) => {
    console.info("calling api");
    return await axiosClient.get(`/sick?q=${keyword}`);
  },
};
export default searchApi;
