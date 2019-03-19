import { instance } from "./index";

export const getCityWorkCount = params => {
  return instance.post(`/getCityData`, params);
};

export const getMapWorkCount = params => {
  return instance.post("/mapData", params);
};

export const getCompanyCount = params => {
  return instance.post("/conpanyData", params);
};

export const getEduData = params => {
  return instance.post("/eduData", params);
};

export const getExpData = params => {
  return instance.post("/experienceData", params);
};
