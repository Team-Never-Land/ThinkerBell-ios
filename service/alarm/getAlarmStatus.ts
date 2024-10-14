import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const getAlarmStatus = async () => {
  try {
    const uuid: string = await getOrCreateUUID();
    const response = await axios.get(`${BASE_URL}api/alarm/alarm-status`, {
      params: { SSAID: uuid },
    });
    return response.data.data; // 알람 상태 반환
  } catch (error) {
    console.error("Error fetching alarm status:", error);
    throw error;
  }
};
