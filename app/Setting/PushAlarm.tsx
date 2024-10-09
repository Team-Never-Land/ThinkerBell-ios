// PushAlarm.tsx (푸시 알림 컴포넌트)
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";

export default function PushAlarm({ onComplete }: { onComplete: () => void }) {
  // 푸시 알림 권한 요청 및 토큰 가져오기
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "ios") {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("푸시 알림 권한을 허용해 주세요.");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem("expoPushToken", token); // AsyncStorage에 토큰 저장
      console.log("Push token:", token);
    }

    // 푸시 알림 권한 설정 완료 콜백 호출
    onComplete();
  }

  // 컴포넌트가 마운트될 때 토큰 요청
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return null; // UI는 렌더링하지 않음
}
