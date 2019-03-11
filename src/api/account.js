import { instance } from "./index";

// 判断用户是否登录
export const isLogin = params => {
  return instance.get(`/isLogin`, { params });
};

// 登录
export const login = params => {
  return instance.post(`/login`, params);
};

// 注册
export const register = params => {
  return instance.post(`/user`, params);
};

// 登出
export const signOut = params => {
  return instance.post(`/logout`, params);
};

// 修改密码
export const retrieve = params => {
  return instance.post(`/retrieve`, params);
};

/**
 * 发送邮箱验证码
 * url: '/sendVerifyCode'
 * method: POST
 * body: {
 *  email: ''
 * }
 */
export const sendVerifyCode = params => {
  return instance.post(`/sendVerifyCode`, params);
};

export const checkCode = params => {
  return instance.post(`/checkCode`, params);
};
