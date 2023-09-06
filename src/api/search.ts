import { axiosClient } from "./axiosClient";

const searchApi = {
  getRecommended: async (keyword: string) => {
    return await axiosClient.get(`/sick?q=${keyword}`);
  },
};
export default searchApi;
