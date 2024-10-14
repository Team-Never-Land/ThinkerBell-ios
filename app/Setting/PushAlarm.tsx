// PushAlarm.tsx (푸시 알림 컴포넌트)
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { toggleAlarmStatus } from "@/service/alarm/toggleAlarmStatus";

export default function PushAlarm({ onComplete }: { onComplete: () => void }) {
  // 푸시 알림 권한 요청 및 토큰 가져오기
  async function registerForPushNotificationsAsync() {
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
        return; // 권한이 없으면 서버 상태를 변경하지 않음
      } else {
        // 권한이 있는 경우에만 서버에 알림 상태를 업데이트
        await toggleAlarmStatus();
        // 푸시 알림 권한 설정 완료 콜백 호출
        onComplete();
      }
    }
  }

  // 컴포넌트가 마운트될 때 토큰 요청
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return null; // UI는 렌더링하지 않음
}
