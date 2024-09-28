import { Color, Font } from "@/constants/Theme";
import React from "react";
import { View, Text, Pressable } from "react-native";
import NextIcon from "../../assets/images/icon/Arrow/Next.svg";

export default function FavoritesHead({
  text,
  isDisabled,
  onPress,
}: {
  text: string;
  isDisabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 22,
        paddingVertical: 20,
        marginTop: text === "학사일정" ? 11 : 40,
        borderColor: Color.red.gray[700],
        borderBottomWidth: isDisabled ? 0 : 1,
      }}
      disabled={isDisabled}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text style={{ ...Font.Label.Medium, color: Color.BLACK }}>
          즐겨찾기한 {text}
        </Text>
        {text === "학사일정" && (
          <Text
            style={{
              ...Font.Pretendard300[11],
              color: Color.contents.contentSecondary,
            }}
          >
            일정 당일에 알림을 보내드려요!
          </Text>
        )}
      </View>
      <NextIcon
        color={isDisabled ? Color.red.gray[200] : Color.red.gray[700]}
      />
    </Pressable>
  );
}
