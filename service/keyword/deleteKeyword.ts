import { getOrCreateUUID } from "@/utils/uuid-function";
import axios from "axios";
import { BASE_URL } from "../apiClient";

export const deleteKeyword = async (keyword: string) => {
  try {
    const uuid = await getOrCreateUUID();
    const response = await axios.post(
      `${BASE_URL}api/keyword/delete`, // URL에서 쿼리 파라미터 대신 params 사용
      null,
      {
        params: { keyword, userSSAID: uuid }, // 쿼리 파라미터로 keyword와 userSSAID 전달
      }
    );
    return response.data.message; // 삭제 성공 메시지 반환
  } catch (error) {
    console.error("Error deleting keyword:", error);
    throw error;
  }
};
