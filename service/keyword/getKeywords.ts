import axios from "axios";
import { BASE_URL } from "@/service/apiClient"; // API 서버 URL
import { getOrCreateUUID } from "@/utils/uuid-function"; // SSAID를 불러오거나 생성하는 함수

export const getKeywords = async () => {
  try {
    const uuid: string = await getOrCreateUUID(); // UUID 생성 또는 불러오기
    const response = await axios.get(
      `${BASE_URL}api/keyword?userSSAID=${uuid}`
    );
    return response.data.data; // 키워드 데이터 반환
  } catch (error) {
    console.error("Error fetching keywords:", error);
    throw error;
  }
};
