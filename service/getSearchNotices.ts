import axios from "axios";
import { getOrCreateUUID } from "../utils/uuid-function";
import { BASE_URL } from "./apiClient";
import { TCategorySearchResponse } from "@/types/category";

//공지 카테고리 별 검색 및 반환
export async function getSearchNotices(
  keyword: string,
  noticeType: string
): Promise<TCategorySearchResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/notices/search?ssaid=${uuid}&keyword=${keyword}&noticeType=${noticeType}`
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
