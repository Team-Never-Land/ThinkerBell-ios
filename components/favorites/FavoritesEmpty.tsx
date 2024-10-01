import { Color, Font } from "@/constants/Theme";
import React from "react";
import { View, Text } from "react-native";

export default function FavoritesEmpty({ text }: { text: string }) {
  return (
    <View style={{ marginTop: 46, marginBottom: 38 }}>
      <Text
        style={{
          ...Font.Paragraph.Medium,
          color: Color.contents.contentSecondary,
          textAlign: "center",
        }}
      >
        즐겨찾기한 {text}이 없습니다.
      </Text>
    </View>
  );
}
