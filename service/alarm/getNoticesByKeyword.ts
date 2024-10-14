import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const getNoticesByKeyword = async (keyword: string) => {
  try {
    const uuid: string = await getOrCreateUUID();
    const response = await axios.get(`${BASE_URL}api/alarm`, {
      params: { SSAID: uuid, keyword },
    });
    return response.data.data; // 알람 리스트 반환
  } catch (error) {
    console.error("Error fetching alarm by keyword:", error);
    throw error;
  }
};
