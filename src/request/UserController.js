import axios from "axios";
import { BaseURL } from "./ServerAddress";

const user = axios.create({ baseURL: BaseURL + "user/", timeout: 1000 });
const login = async (faceInfo) => {
  try {
    const res = await user.put(`login/?imageBase64=${faceInfo}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//const register=async()  //注册请求体不清晰

export { login };
