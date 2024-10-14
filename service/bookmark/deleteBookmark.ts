import axios from "axios";
import { getOrCreateUUID } from "../../utils/uuid-function";
import { BASE_URL } from "../apiClient";
import { TFavoritesResponse } from "@/types/favorites";

//즐겨찾기 취소
export async function deleteBookmark(
  category: string,
  noticeId: number
): Promise<TFavoritesResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.delete(
      `${BASE_URL}api/bookmark?ssaid=${uuid}&category=${category}&notice-id=${noticeId}`
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
