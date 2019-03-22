import { instance } from "./index";

export const getCityList = params => {
  return instance.get(`/getCity`, { params });
};

export const getWorkList = params => {
  return instance.post("/getWorkList", params);
};

export const getUserList = params => {
  return instance.post("/getUserList", params);
};

export const getProxyList = params => {
  return instance.post("/getProxyList", params);
};
