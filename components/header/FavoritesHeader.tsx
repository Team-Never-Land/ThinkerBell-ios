import React from "react";
import { View, Text, StatusBar } from "react-native";
import LogoIcon from "../../assets/images/icon/Logo.svg";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

export default function FavoritesHeader({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );

  return (
    <>
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          paddingTop: 24,
          backgroundColor: Color.BLUE,
          alignItems: "center",
        }}
      >
        <LogoIcon
          width={28}
          height={22}
          onPress={() => navigation.navigate("home")}
        />
        <Text
          style={{
            ...Font.Label.XL,
            color: Color.WHITE,
            marginTop: 13,
            marginBottom: 27,
          }}
        >
          즐겨찾기
        </Text>
      </View>
    </>
  );
}
