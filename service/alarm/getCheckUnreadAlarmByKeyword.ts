import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const getCheckUnreadAlarmByKeyword = async (keyword: string) => {
  try {
    const uuid: string = await getOrCreateUUID();
    const response = await axios.get(`${BASE_URL}api/alarm/check`, {
      params: { SSAID: uuid, keyword },
    });
    return response.data.data; // 미확인 알람 여부 반환
  } catch (error) {
    console.error("Error checking unread alarm by keyword:", error);
    throw error;
  }
};
