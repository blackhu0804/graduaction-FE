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

export const addProxy = params => {
  return instance.post("/addProxy", params);
};

export const deleteProxy = params => {
  return instance.post("/deleteProxy", params);
};

export const updateProxy = params => {
  return instance.post("/updateProxy", params);
};

export const getWorkDetail = params => {
  return instance.post('/getWorkInfo', params)
}
