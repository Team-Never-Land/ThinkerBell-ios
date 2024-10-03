import React from "react";
import { View, Text, StatusBar } from "react-native";
import LogoIcon from "../../../assets/images/icon/Logo.svg";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomePageHeader({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          backgroundColor: Color.BLUE,
          alignItems: "center",
          height: 174,
          justifyContent: "center",
        }}
      >
        <LogoIcon
          width={28}
          height={22}
          onPress={() => navigation.navigate("HomeMain")}
        />
        <Text
          style={{
            ...Font.Label.XL,
            color: Color.WHITE,
            marginTop: 13,
            marginBottom: 27,
          }}
        >
          부서별 홈페이지
        </Text>
      </View>
    </>
  );
}
