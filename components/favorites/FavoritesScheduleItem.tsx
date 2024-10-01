import React from "react";
import { View, Text, Pressable } from "react-native";
import { Color, Font } from "@/constants/Theme";
import { TFavoritesList } from "@/types/favorites";
import ClippingOnIcon from "../../assets/images/icon/Clipping/Clipping-On.svg";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { onMarkedPress } from "@/utils/favorites";

export default function FavoritesScheduleItem({
  item,
  updateList,
}: {
  item: TFavoritesList;
  updateList: (id: number) => void;
}) {
  //날짜 포맷 MM.DD 형식으로 변환
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}.${day}`;
  };

  return (
    <View
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 13,
          flexShrink: 1,
          paddingVertical: 8,
        }}
      >
        <Text
          style={{
            ...Font.Paragraph.Small,
            color: Color.BLACK,
          }}
        >
          {formatDate(item.startDate)}
          {item.startDate !== item.endDate && " ~ " + formatDate(item.endDate)}
        </Text>
        <Text
          style={{
            ...Font.Paragraph.Small,
            color: Color.red.gray[700],
            paddingRight: 7,
            flexShrink: 1,
          }}
        >
          {item.title}
        </Text>
      </View>
      <Pressable
        style={{
          paddingLeft: 13,
          paddingRight: 20,
          height: "100%",
          justifyContent: "center",
        }}
        onPress={(event) => {
          event.preventDefault();
          onMarkedPress(item.id, "AcademicSchedule", item.marked, updateList);
        }}
      >
        {item.marked ? <ClippingOnIcon /> : <ClippingOffIcon />}
      </Pressable>
    </View>
  );
}
