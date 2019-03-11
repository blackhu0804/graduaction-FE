import axios from "axios";
import * as util from "../assets/utils";

const URLHASH = {
  mock: "",
  dev: "http://127.0.0.1:7001",
  test: ""
};
axios.defaults.withCredentials = true;
export const baseURL = URLHASH.dev;

export const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// 请求处理
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//错误处理
instance.interceptors.response.use(function(response) {
  if (response.data.code != 0) {
    return util.catchError(response);
  }
  return response;
}, util.catchError);
