import { instance } from "./index";

// login
export const login = params => {
  return instance.post(`/login`, { username, password });
};
