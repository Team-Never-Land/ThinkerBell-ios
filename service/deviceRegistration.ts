import axios from "axios";
import { getOrCreateUUID } from "../utils/uuid-function";
import * as Notifications from "expo-notifications"; // Expo 푸시 알림
import { BASE_URL } from "./apiClient";

// Define types for push token and response
interface PushTokenData {
  data: string;
}

export async function registerDeviceInfo(): Promise<void> {
  try {
    //console.log("Starting device registration process...");
    // 1. UUID 가져오기
    const uuid: string = await getOrCreateUUID();
    //console.log(`UUID retrieved: ${uuid}`);

    // 2. 푸시 알림 권한 요청 및 token 가져오기
    const { status } = await Notifications.requestPermissionsAsync();
    // console.log(`Push notification permission status: ${status}`);

    if (status !== "granted") {
      //console.log("Permission for push notifications not granted");
      return;
    }

    const tokenData: PushTokenData =
      await Notifications.getExpoPushTokenAsync();
    const deviceToken: string = tokenData.data;
    //console.log(`Push notification token retrieved: ${deviceToken}`);

    // 3. 서버에 UUID와 Device Token 전송
    const response = await axios.post(`${BASE_URL}api/user-info/save`, {
      ssaid: uuid,
      deviceToken: deviceToken,
      alarmEnabled: status === "granted",
    });

    //console.log(`Response status: ${response.status}`);
    if (response.status === 200) {
      //  console.log("Device info saved successfully");
    } else {
      console.error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      // 서버가 응답한 경우 (4xx, 5xx 상태 코드)
      //console.error(`Failed to save device info: ${error.response.status}`);
      //console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // 요청이 서버에 도달했으나 응답이 없을 때
      console.error("No response from server.");
    } else {
      // 그 외 다른 에러
      console.error("Error:", error.message);
    }
  }
}
