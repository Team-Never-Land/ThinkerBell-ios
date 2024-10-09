// import { Redirect } from "expo-router";
// import PushAlarm from "./Setting/PushAlarm";
// import { View } from "react-native";

// export default function Index() {
//   return <Redirect href={"/Home"} />;
// }
// Index.tsx (메인 컴포넌트)
import React, { useState } from "react";
import { Redirect } from "expo-router";
import { View } from "react-native";
import PushAlarm from "./Setting/PushAlarm";

export default function Index() {
  const [isPushAlarmComplete, setIsPushAlarmComplete] = useState(false);

  // PushAlarm 완료 후 호출되는 콜백 함수
  const handlePushAlarmComplete = () => {
    setIsPushAlarmComplete(true); // 완료 후 상태 업데이트
  };

  if (isPushAlarmComplete) {
    // PushAlarm 완료 후 리다이렉트
    return <Redirect href={"/Home"} />;
  }

  return (
    <View>
      {/* PushAlarm 컴포넌트를 렌더링하고 완료 상태를 상위 컴포넌트로 전달 */}
      <PushAlarm onComplete={handlePushAlarmComplete} />
    </View>
  );
}
