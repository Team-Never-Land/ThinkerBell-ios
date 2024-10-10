import { Color, Font } from "@/constants/Theme";
import React from "react";
import { View, Text } from "react-native";
import CategoryBackButton from "./CategoryBackButton";

export default function CategoryEmpty({
  searchText,
  onPress,
}: {
  searchText: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginBottom: 50,
        gap: 20,
      }}
    >
      <Text
        style={{
          ...Font.Paragraph.Medium,
          color: Color.contents.contentSecondary,
          textAlign: "center",
        }}
      >
        ‘{searchText}’이(가) 포함된 공지사항을{"\n"}찾을 수 없습니다.
      </Text>
      <CategoryBackButton onPress={onPress} />
    </View>
  );
}
