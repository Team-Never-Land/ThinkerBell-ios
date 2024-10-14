import axios from "axios";
import { BASE_URL } from "../apiClient";
import * as dotenv from "dotenv";

dotenv.config(); // .env 파일 로드

// 최소 업데이트 버전 수정 함수
export const updateMinimumVersion = async (
  versionCode: string,
  versionName: string
) => {
  const adminSecret = process.env.ADMIN_SECRET; // .env에서 불러옴

  try {
    const response = await axios.post(`${BASE_URL}/api/version`, null, {
      headers: { "X-Admin-Secret": adminSecret },
      params: {
        versionCode, // 버전 코드
        versionName, // 버전 이름
      },
    });
    return response.data; // 응답 결과 반환
  } catch (error) {
    console.error("Error updating minimum version:", error);
    throw error;
  }
};
