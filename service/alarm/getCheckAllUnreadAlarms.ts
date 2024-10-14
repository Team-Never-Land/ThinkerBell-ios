import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const getCheckAllUnreadAlarms = async () => {
  try {
    const uuid: string = await getOrCreateUUID();
    const response = await axios.get(`${BASE_URL}api/alarm/check-all`, {
      params: { SSAID: uuid },
    });
    return response.data.data; // 미확인 알람 여부 반환
  } catch (error) {
    console.error("Error checking all unread alarms:", error);
    throw error;
  }
};
