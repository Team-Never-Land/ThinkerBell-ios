import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const saveKeyword = async (keyword: string) => {
  try {
    const uuid: string = await getOrCreateUUID(); // UUID 생성 또는 불러오기
    const response = await axios.post(
      `${BASE_URL}api/keyword/save`, // POST 요청 URL
      null, // 본문 데이터가 없으므로 null 설정
      {
        params: {
          userSSAID: uuid, // 쿼리 파라미터로 UUID 전달
          keyword: keyword, // 쿼리 파라미터로 키워드 전달
        },
      }
    );
    return response.data.message; // 저장 성공 메시지 반환
  } catch (error) {
    console.error("Error saving keyword:", error);
    throw error;
  }
};
