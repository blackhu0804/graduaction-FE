import { instance } from "./index";

export const getCityList = params => {
  return instance.get(`/getCity`, { params });
};

export const getWorkList = params => {
  return instance.post("/getWorkList", params);
};
