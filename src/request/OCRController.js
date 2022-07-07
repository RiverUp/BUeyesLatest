import axios from "axios";
import { BaseURL } from "./ServerAddress";

const ocr = axios.create({ baseURL: BaseURL + "ocr/ocr", timeout: 1000 });
const recognizeOcr = async function (imgBase64) {
  try {
    const res = await ocr.post("", { base64: imgBase64 });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export { recognizeOcr };
