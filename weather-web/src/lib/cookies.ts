import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const TOKEN_EXPIRY_TIME = 9999 * 60 * 60 * 24;

export const cookieManager = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY,token, {
      expires: TOKEN_EXPIRY_TIME,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  },

  getToken: ():string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  hasToken: (): boolean => {
    return !!Cookies.get(TOKEN_KEY);
  }
};