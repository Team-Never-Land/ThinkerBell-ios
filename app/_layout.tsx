import { Color } from "@/constants/Theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast } from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: Color.BLUE,
        height: 40,
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: "Pretendard600",
        fontSize: 14,
        color: Color.WHITE,
        textAlign: "center",
      }}
    />
  ),
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Pretendard700: require("../assets/fonts/Pretendard-Bold.otf"),
    Pretendard600: require("../assets/fonts/Pretendard-SemiBold.otf"),
    Pretendard500: require("../assets/fonts/Pretendard-Medium.otf"),
    Pretendard400: require("../assets/fonts/Pretendard-Regular.otf"),
    Pretendard300: require("../assets/fonts/Pretendard-Light.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
