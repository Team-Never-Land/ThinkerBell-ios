import axios from "axios";
import { BASE_URL } from "./apiClient"; // API 서버 URL

export const saveErrorMessage = async (errorMessage: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/error-report`, // 실제 오류 신고 API 경로로 수정
      { errorMessage } // 요청 본문에 errorMessage 전달
    );
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("Error saving error message:", error);
    throw error; // 오류 발생 시 처리
  }
};
