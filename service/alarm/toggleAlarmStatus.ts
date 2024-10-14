import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const toggleAlarmStatus = async () => {
  try {
    const uuid: string = await getOrCreateUUID(); // UUID 불러오기
    const response = await axios.patch(
      `${BASE_URL}api/alarm/alarm-toggle`,
      null,
      {
        params: { SSAID: uuid },
      }
    );
    return response.data.message; // 상태 변경 성공 메시지 반환
  } catch (error) {
    console.error("Error toggling alarm status:", error);
    throw error;
  }
};
