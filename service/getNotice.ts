import axios from "axios";
import { getOrCreateUUID } from "../utils/uuid-function";
import { BASE_URL } from "./apiClient";
import { TCategoryListResponse } from "@/types/category";

//명지대 일반 공지사항 조회 (일반공지)
export async function getNormalNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/normal?ssaid=${uuid}&page=${page}`
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

//명지대 학사 공지사항 조회 (학사공지)
export async function getAcademicNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/academic?ssaid=${uuid}&page=${page}`
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

//명지대 행사 공지사항 조회 (행사공지)
export async function getEventNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/event?ssaid=${uuid}&page=${page}`
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

//명지대 장학/학자금 공지사항 조회 (장학/학자금공지)
export async function getScholarshipNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/scholarship?ssaid=${uuid}&page=${page}`
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

//명지대 진로/취업/창업 공지사항 조회 (진로/취업/창업공지)
export async function getCareerNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/career?ssaid=${uuid}&page=${page}`
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

//명지대 학생활동 공지사항 조회 (학생활동공지)
export async function getStudentActsNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/student-acts?ssaid=${uuid}&page=${page}`
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

//명지대 입찰 공지사항 조회 (입찰공지)
export async function getBiddingNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/bidding?ssaid=${uuid}&page=${page}`
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

//명지대 대학안전 공지사항 조회 (대학안전공지)
export async function getSafetyNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/safety?ssaid=${uuid}&page=${page}`
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

//명지대 학칙개정 사전공고 조회 (학칙개정 사전공고)
export async function getRevisionNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/revision?ssaid=${uuid}&page=${page}`
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

//생활관 일반 공지사항 조회 ([생활관] 공지사항)
export async function getDormitoryNotice(
  page: number,
  campus: string
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/dormitory/notices?ssaid=${uuid}&page=${page}&campus=${campus}`
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

//생활관 입퇴사 공지사항 조회 ([생활관] 입퇴사 공지사항)
export async function getDormitoryEntryNotice(
  page: number,
  campus: string
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/dormitory/entry-notices?ssaid=${uuid}&page=${page}&campus=${campus}`
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

//일반 공지사항 조회 ([도서관] 공지사항)
export async function getLibraryNotice(
  page: number,
  campus: string
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/library?ssaid=${uuid}&page=${page}&campus=${campus}`
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

//교직 공지사항 조회 ([교직] 공지사항)
export async function getTeachingNotice(
  page: number
): Promise<TCategoryListResponse> {
  try {
    const uuid: string = await getOrCreateUUID();

    const response = await axios.get(
      `${BASE_URL}/api/teaching?ssaid=${uuid}&page=${page}`
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
