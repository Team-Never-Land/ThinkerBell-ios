import axios from "axios";
import { getOrCreateUUID } from "../../utils/uuid-function";
import { BASE_URL } from "../apiClient";
import { TFavoritesRecentNoticeListResponse } from "@/types/favorites";

//공지사항 최근 즐겨찾기 3개 내역 조회
export async function getBookmarkRecentNotice(): Promise<TFavoritesRecentNoticeListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/bookmark/recent-notice?ssaid=${uuid}`
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
