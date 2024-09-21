import { Color, Font } from "@/constants/Theme";
import React from "react";
import { View, Text } from "react-native";

export default function CategoryEmpty({ searchText }: { searchText: string }) {
  return (
    <View
      style={{
        marginTop: 208,
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
    </View>
  );
}
