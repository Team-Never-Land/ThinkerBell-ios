import React from "react";
import { Linking, Pressable, Text } from "react-native";
import { Color, Font } from "@/constants/Theme";
import { TFavoritesRecentNoticeList } from "@/types/favorites";
import { initialCategory } from "@/assets/data/initialCategory";

export default function FavoritesNoticeItem({
  item,
}: {
  item: TFavoritesRecentNoticeList;
}) {
  const categoryText =
    initialCategory.find((category) => category.key === item.category)?.text ||
    item.category;

  return (
    <Pressable
      onPress={() => Linking.openURL(item.url)}
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 22,
        backgroundColor: Color.WHITE,
        borderColor: Color.red.gray[700],
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          ...Font.Pretendard500[14],
          color: Color.BLACK,
          flexShrink: 1,
          paddingRight: 20,
          paddingVertical: 12,
        }}
      >
        [{categoryText}]{"  "}
        {item.title}
      </Text>
      <Text
        style={{
          ...Font.Paragraph.Small,
          color: Color.contents.contentSecondary,
          paddingRight: 20,
        }}
        numberOfLines={1}
      >
        {item.pubDate}
      </Text>
    </Pressable>
  );
}
