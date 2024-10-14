import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import SettingHeader from "@/components/header/SettingHeader";
import { Color, Font } from "@/constants/Theme";
import NextIcon from "@/assets/images/icon/Arrow/Next.svg";
import SwitchOnIcon from "@/assets/images/icon/Switch/Switch-On.svg";
import SwitchOffIcon from "@/assets/images/icon/Switch/Switch-Off.svg";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Keyword from "../../app/Setting/Keyword";
import RegisKeyword from "../../app/Setting/RegisKeyword";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import KeywordBox from "@/components/setting/KeywordBox";
import Error from "../Setting/Error";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { getKeywords } from "@/service/keyword/getKeywords";
import { toggleAlarmStatus } from "@/service/alarm/toggleAlarmStatus";
import { getAlarmStatus } from "@/service/alarm/getAlarmStatus";
import { getMinimumVersion } from "@/service/update/getMinimumVersion";

export function Settings({ navigation }: { navigation: any }) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isNotificationEnabled, setIsNotificationEnabled] =
    useState<boolean>(false);
  const [isLatestVersion, setIsLatestVersion] = useState<boolean>(true); // 최신 버전 여부 상태
  const [latestVersion, setLatestVersion] = useState<string>("1.1.0"); // 최신 버전 상태

  const currentVersion = "1.0.0"; // 현재 앱 버전

  const loadKeywords = async () => {
    try {
      const keywordList = await getKeywords(); // API 호출
      const extractedKeywords = keywordList.map(
        (item: { keyword: string }) => item.keyword
      );
      setKeywords(extractedKeywords); // 키워드 상태 업데이트
    } catch (error) {
      console.error("키워드 불러오기 오류:", error);
    }
  };

  const loadNotificationStatus = async () => {
    try {
      const alarmStatus = await getAlarmStatus(); // 작성한 getAlarmStatus 함수 호출
      setIsNotificationEnabled(alarmStatus); // 알림 상태 업데이트
      console.log("Current Notification Status:", alarmStatus); // 알림 상태 로그 출력
    } catch (error) {
      console.error("알림 상태 불러오기 오류:", error);
    }
  };
  const toggleNotification = async () => {
    const newValue = !isNotificationEnabled; // 상태 반전
    setIsNotificationEnabled(newValue);

    try {
      // 서버로 상태 변경 요청
      await toggleAlarmStatus(); // 알림 상태 토글
      console.log("Notification status:", newValue);
    } catch (error) {
      console.error("알림 상태 변경 오류:", error);
      setIsNotificationEnabled(!newValue); // 실패 시 상태 롤백
    }
  };

  const handleUpdatePress = () => {
    Linking.openURL("https://apps.apple.com/app/id123456789"); // 스토어 URL로 이동
  };
  const checkVersionUpdate = async () => {
    try {
      const minimumVersion = await getMinimumVersion();
      setLatestVersion(minimumVersion.versionName); // 서버에서 받아온 최신 버전 설정
      setIsLatestVersion(currentVersion >= minimumVersion.versionName); // 버전 비교
    } catch (error) {
      console.error("최소 업데이트 필요 버전 조회 오류:", error);
    }
  };
  const handleTermsOfServicePress = () => {
    Linking.openURL(
      "https://petite-pest-f69.notion.site/56313d788d914d6e8e996e099694272e"
    ); // 이용약관 링크로 이동
  };
  const handlePrivatePolicyPress = () => {
    Linking.openURL(
      "https://petite-pest-f69.notion.site/022b7a19351a418da5cf22304c7c3137"
    ); // 이용약관 링크로 이동
  };
  useEffect(() => {
    loadNotificationStatus(); // 알림 상태 불러오기
    loadKeywords(); // 키워드 목록 불러오기
    checkVersionUpdate();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <SettingHeader navigation={navigation} />
      <Pressable
        style={{
          width: 311,
          height: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 32,
        }}
        onPress={() => navigation.navigate("Keyword")}
      >
        <Text
          style={{
            ...Font.Label.Medium,
          }}
        >
          키워드 관리
        </Text>
        <NextIcon color={Color.red.gray[700]} />
      </Pressable>

      <View
        style={{
          height: 70,
          marginTop: 20,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          {keywords.map((keyword, index) => (
            <KeywordBox key={index} keyword={keyword} />
          ))}
        </ScrollView>
      </View>

      {/* 알림 */}
      <View
        style={{
          width: 311,
          height: 32,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          top: 334,
          position: "absolute",
        }}
      >
        <Text
          style={{
            ...Font.Label.Medium,
          }}
        >
          알림
        </Text>

        <Pressable onPress={toggleNotification}>
          {isNotificationEnabled ? (
            <SwitchOnIcon /> // 알림이 켜져 있을 때 스위치 ON 아이콘 표시
          ) : (
            <SwitchOffIcon /> // 알림이 꺼져 있을 때 스위치 OFF 아이콘 표시
          )}
        </Pressable>
      </View>

      {/* 버전 */}
      <View
        style={{
          width: 311,
          height: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          top: 413,
          position: "absolute",
        }}
      >
        <Text
          style={{
            ...Font.Label.Medium,
          }}
        >
          버전
        </Text>

        {isLatestVersion ? (
          <Text
            style={{
              ...Font.Paragraph.Medium,
              color: Color.contents.contentSecondary,
            }}
          >
            {currentVersion} (최신 버전)
          </Text>
        ) : (
          <Pressable onPress={handleUpdatePress}>
            <Text
              style={{
                ...Font.Paragraph.Medium,
                color: Color.contents.contentSecondary,
              }}
            >
              업데이트
            </Text>
          </Pressable>
        )}
      </View>

      {/* 오류신고 */}
      <Pressable
        style={{
          width: 311,
          height: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          top: 463,
          position: "absolute",
        }}
        onPress={() => navigation.navigate("Error")}
      >
        <Text
          style={{
            ...Font.Label.Medium,
          }}
        >
          오류신고
        </Text>
        <NextIcon color={Color.red.gray[700]} />
      </Pressable>
      {/* 이용약관 */}
      <Pressable
        style={{
          width: 311,
          height: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          top: 512,
          position: "absolute",
        }}
        onPress={handleTermsOfServicePress}
      >
        <Text
          style={{
            ...Font.Label.Medium,
          }}
        >
          이용약관
        </Text>
        <NextIcon color={Color.red.gray[700]} />
      </Pressable>
      {/* 개인정보정책 */}
      <Pressable
        style={{
          width: 311,
          height: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          top: 561,
          position: "absolute",
        }}
        onPress={handlePrivatePolicyPress}
      >
        <Text
          style={{
            ...Font.Label.Medium,
          }}
        >
          개인정보정책
        </Text>
        <NextIcon color={Color.red.gray[700]} />
      </Pressable>
    </View>
  );
}

// SettingStackNavigator 컴포넌트
const SettingStack = createNativeStackNavigator();

export default function SettingStackNavigator({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === "Error" ||
      routeName === "Keyword" ||
      routeName === "RegisKeyword"
    ) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      // 다른 페이지에서는 탭바 표시
      navigation.setOptions({
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Color.WHITE,
          height: "auto",
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          position: "absolute",
          shadowColor: "#bababa",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 2,
          display: "flex",
        },
      });
    }
  }, [navigation, route]);

  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="Keyword"
        component={Keyword}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="RegisKeyword"
        component={RegisKeyword}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="Error"
        component={Error}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}
