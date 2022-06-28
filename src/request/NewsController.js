import axios from "axios";
import { BaseURL } from "./ServerAddress";
const news = axios.create({ baseURL: BaseURL + "news/", timeout: 1000 });
const getTitlesByCgId = async (categoryId, date) => {
  try {
    const res = news.post(
      `getByCategoryId?categoryId=${categoryId}&date=${date}`,
      {
        key: "time",
        order: 0,
        pageNum: 1,
        pageSize: 10,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
/**
 *const getTitlesByKd = async ()=>{
    try{
        const res =news.post()
    }
 *
 */
export { getTitlesByCgId };
