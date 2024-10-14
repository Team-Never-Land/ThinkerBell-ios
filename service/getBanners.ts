import axios from "axios";
import { BASE_URL } from "./apiClient";

export async function getBanners() {
  try {
    const response = await axios.get(`${BASE_URL}api/banners`);
    if (response.status === 200) {
      return response.data.data; // API 응답에서 배너 데이터를 반환
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("배너 데이터를 가져오는 도중 오류 발생:", error);
    throw error;
  }
}
