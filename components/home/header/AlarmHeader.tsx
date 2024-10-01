import { View, Text, StatusBar, Image } from "react-native";
import React from "react";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AlarmHeader() {
  const { top } = useSafeAreaInsets();
  const categories = ["키워드", "입사신청", "장학금", "공모전"];

  return (
    <>
      <View
        style={{
          height: top,
          backgroundColor: Color.BLUE,
        }}
      ></View>
      {/* Status Bar */}
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          position: "relative",
          height: 185,
          width: "100%",
          backgroundColor: Color.BLUE,
        }}
      >
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{
            width: 28,
            height: 22,
            position: "absolute",
            alignSelf: "center", // 중앙 정렬
            top: 50, // top 위치 50px
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 58,
            height: 51,
            alignSelf: "center", // 중앙 정렬
            top: 75, // top 위치 75px
            justifyContent: "center", // 수직 중앙 정렬
            alignItems: "center", // 수평 중앙 정렬
            padding: 4,
          }}
        >
          <Text
            style={{
              ...Font.Label.XL,
              color: Color.WHITE,
              textAlign: "center",
            }}
          >
            알림
          </Text>
        </View>
      </View>
    </>
  );
}
