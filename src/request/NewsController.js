import axios from "axios";
import { BaseURL } from "./ServerAddress";
const news = axios.create({ baseURL: BaseURL + "news/", timeout: 1000 });
const getTitlesByCgId = async (pageNo, categoryId, date) => {
  try {
    const res = await news.post(
      `getByCategoryId?categoryId=${categoryId}&date=${date}`,
      {
        key: "time",
        order: 0,
        pageNum: pageNo,
        pageSize: 10,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
const getTitlesByKd = async (date, keyword) => {
  try {
    const res = await news.post(
      `getByKeyWord?date=${date}&keyWord=${keyword}`,
      {
        key: "time",
        order: 0,
        pageNum: 0,
        pageSize: 40,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { getTitlesByCgId, getTitlesByKd };
