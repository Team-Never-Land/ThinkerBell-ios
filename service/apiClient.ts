import axios from "axios";
import { getOrCreateUUID } from "../utils/uuid-function"; // UUID 생성 및 저장 함수 가져오기

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "https://thinkerbell.shop/api", // API 기본 URL 설정
});

// Axios 인터셉터 설정: 모든 요청에 UUID 포함
apiClient.interceptors.request.use(
  async (config) => {
    // UUID 가져오기
    const uuid = await getOrCreateUUID();

    // 헤더에 UUID 추가
    if (uuid && config.headers) {
      config.headers["X-UUID"] = uuid; // 헤더에 'X-UUID'라는 커스텀 헤더로 전송
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
