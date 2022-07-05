import axios from "axios";
import { BaseURL } from "./ServerAddress";

const ocr = axios.create({ baseURL: BaseURL + "ocr/ocr/", timeout: 1000 });
const recognizeOcr = async function (imageInfo) {
  try {
    const res = await ocr.get("", {
      params: { imageInfo },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { recognizeOcr };
