import axios from "axios";
import { BASE_URL } from "./apiClient";

// 부서 연락처 조회 함수
export async function getDepartmentContacts() {
  try {
    const response = await axios.get(`${BASE_URL}api/dept-contact`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch department contacts: ${response.status}`
      );
    }
  } catch (error: any) {
    console.error("Error fetching department contacts:", error);
    throw error;
  }
}
