import axios from "axios";
import { BaseURL } from "./ServerAddress";
import { getTime } from "./GetTime";
const userAction = axios.create({ baseURL: BaseURL + "news/", timeout: 1000 });
const like = async (userId, newsId) => {
  try {
    const res = userAction.post("", {
      newsId: newsId,
      operateTime: getTime(),
      type: 0,
      userId: userId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
