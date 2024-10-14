import axios from "axios";
import { getOrCreateUUID } from "../../utils/uuid-function";
import { BASE_URL } from "../apiClient";
import { TFavoritesScheduleListResponse } from "@/types/favorites";

//학사일정 최근 즐겨찾기 3개 내역 조회
export async function getBookmarkRecentSchedule(): Promise<TFavoritesScheduleListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}api/bookmark/recent-schedule?ssaid=${uuid}`
    );

    if (response.status === 200) {
      console.log("Device info saved successfully");
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to save device info:", error);
    throw error;
  }
}
