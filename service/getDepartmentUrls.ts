import axios from "axios";
import { BASE_URL } from "./apiClient";

// 단과 대학 및 본부 기관 사이트 url 조회 API 호출
export async function getDepartmentUrls() {
  try {
    const response = await axios.get(`${BASE_URL}api/dept-url`);
    if (response.status === 200) {
      return response.data.data; // API에서 데이터를 추출
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching department URLs:", error);
    throw error;
  }
}
