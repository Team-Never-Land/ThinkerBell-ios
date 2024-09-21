import { Color, Font } from "@/constants/Theme";
import React from "react";
import { Text, Pressable, View } from "react-native";

export default function CategoryBackButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 75,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          borderRadius: 3,
          borderWidth: 1,
          borderColor: Color.red.gray[500],
          width: 67,
          height: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...Font.Category[14],
            color: Color.red.gray[500],
          }}
        >
          뒤로가기
        </Text>
      </Pressable>
    </View>
  );
}
