import { instance } from "./index";

export const getCityWorkCount = params => {
  return instance.post(`/getCityData`, params);
};
