import axios from "axios";
import { BASE_URL } from "../apiClient";

export const getMarkAlarmAsViewed = async (alarmId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}api/alarm/mark-viewed`, {
      params: { alarmId },
    });
    return response.data.message; // 읽음 처리 성공 메시지 반환
  } catch (error) {
    console.error("Error marking alarm as viewed:", error);
    throw error;
  }
};
