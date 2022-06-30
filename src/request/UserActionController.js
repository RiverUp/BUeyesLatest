import axios from "axios";
import { BaseURL } from "./ServerAddress";
import { getTime } from "./GetTime";
const userAction = axios.create({
  baseURL: BaseURL + "userAction/",
  timeout: 1000,
});
const like = async (userId, newsId) => {
  try {
    const res = userAction.post("/like", {
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
const collect = async (userId, newsId) => {
  try {
    const res = userAction.post("/collect", {
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
const cancelLike = async (userId, newsId) => {
  try {
    const res = userAction.post(
      `/cancelLike?newsId=${newsId}&userId=${userId}`,
      {}
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
const cancelCollection = async (userId, newsId) => {
  try {
    const res = userAction.post(
      `/cancelLike?newsId=${newsId}&userId=${userId}`,
      {}
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
const click = async (clickTime, newsId, timeOnPage, userId) => {
  try {
    const res = userAction.post("", {
      clickTime: clickTime,
      newsId: newsId,
      timeOnPage: timeOnPage,
      userId: userId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { like, collect, cancelLike, cancelCollection, click };
