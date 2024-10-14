import React from "react";
import { View, Text, StatusBar } from "react-native";
import LogoIcon from "@/assets/images/icon/Logo.svg";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

export default function SettingUsableHeader({
  navigation,
  name,
  disablePress,
}: {
  navigation: any;
  name: string;
  disablePress: boolean;
}) {
  const { top } = useSafeAreaInsets();
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );
  const handleLogoPress = () => {
    navigation.goBack(); // 한 단계 뒤로 이동
    setTimeout(() => {
      navigation.navigate("HomeMain"); // 그 다음 HomeMain으로 이동
    }, 0); // goBack 호출 후 navigate를 호출
  };

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
        <View style={{ height: 22 }}>
          {!disablePress && (
            <LogoIcon
              width={28}
              height={22}
              onPress={handleLogoPress} // goBack 호출 후 navigate를 호출}
            />
          )}
        </View>
        <Text
          style={{
            ...Font.Label.XL,
            color: Color.WHITE,
            marginTop: 13,
            marginBottom: 27,
          }}
        >
          {name}
        </Text>
      </View>
    </>
  );
}
