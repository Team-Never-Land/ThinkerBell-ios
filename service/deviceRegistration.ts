import axios from "axios";
import { getOrCreateUUID } from "../utils/uuid-function";
import * as Notifications from "expo-notifications"; // Expo 푸시 알림

// Define types for push token and response
interface PushTokenData {
  data: string;
}

export async function registerDeviceInfo(): Promise<void> {
  try {
    console.log("Starting device registration process...");
    // 1. UUID 가져오기
    const uuid: string = await getOrCreateUUID();
    console.log(`UUID retrieved: ${uuid}`);

    // 2. 푸시 알림 권한 요청 및 token 가져오기
    const { status } = await Notifications.requestPermissionsAsync();
    console.log(`Push notification permission status: ${status}`);

    if (status !== "granted") {
      console.log("Permission for push notifications not granted");
      return;
    }

    const tokenData: PushTokenData =
      await Notifications.getExpoPushTokenAsync();
    const deviceToken: string = tokenData.data;
    console.log(`Push notification token retrieved: ${deviceToken}`);

    // 3. 서버에 UUID와 Device Token 전송
    const response = await axios.post(
      "https://thinkerbell.shop/api/user-info/save",
      {
        uuid: uuid,
        deviceToken: deviceToken,
      }
    );

    if (response.status === 200) {
      console.log("Device info saved successfully");
    }
  } catch (error) {
    console.error("Failed to save device info:", error);
  }
}
