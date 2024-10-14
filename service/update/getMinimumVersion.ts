import axios from "axios";
import { BASE_URL } from "../apiClient"; // API 서버 URL 경로

// 최소 업데이트 버전 조회 함수
export const getMinimumVersion = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/version`);
    return response.data.data; // 서버에서 받은 최소 업데이트 버전 정보 반환
  } catch (error) {
    console.error("Error fetching minimum version:", error);
    throw error;
  }
};
