import axios from "axios";
import { BaseURL } from "./ServerAddress";

const vi = axios.create({
  baseURL: BaseURL + "voiceInteraction/getKeywords",
  timeout: 1000,
});

const InteractWithVoice = async (vedioInfo) => {
  try {
    const res = vi.post("", {
      base64: vedioInfo,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { InteractWithVoice };
