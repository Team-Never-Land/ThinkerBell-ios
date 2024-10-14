import axios from "axios";
import { BASE_URL } from "@/service/apiClient"; // BASE_URL은 적절한 API 서버 URL로 설정
import { getOrCreateUUID } from "@/utils/uuid-function";

// 학사 일정 조회 API 호출 함수
export const getMonthlyAcademicSchedule = async (
  year: number,
  month: number
) => {
  try {
    const uuid: string = await getOrCreateUUID(); // UUID 생성 또는 불러오기

    const response = await axios.get(
      `${BASE_URL}api/academic-schedule/monthly?ssaid=${uuid}&year=${year}&month=${month}`
    );

    return response.data.data; // 응답 데이터에서 학사 일정 리스트 반환
  } catch (error) {
    console.error("Error fetching academic schedule:", error);
    throw error;
  }
};
