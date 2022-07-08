import axios from "axios";
import { BaseURL } from "./ServerAddress";

const user = axios.create({ baseURL: BaseURL + "user/", timeout: 6000 });
const login = async (faceInfo) => {
  try {
    const res = await user.post("login", { base64: faceInfo });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const register = async (faceInfo) => {
  try {
    const res = await user.post("/register", {
      image: faceInfo,
      interestNews: [1, 4, 6],
      province: "湖北",
      username: "user",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { login, register };
// 还不知道返回值格式
