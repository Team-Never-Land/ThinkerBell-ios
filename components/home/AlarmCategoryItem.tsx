import React, { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import ClippingOnIcon from "../../assets/images/icon/Clipping/Clipping-On.svg";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { Color, Font } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TCategoryList } from "@/types/category";
import { onMarkedPress } from "@/utils/favorites";
import { NoticeItem } from "@/app/Home/AlarmPage";
import { getMarkAlarmAsViewed } from "@/service/alarm/getMarkAlarmAsViewed";

export default function AlarmCategoryItem({
  item,
  categoryKey,
  updateList,
}: {
  item: NoticeItem;
  categoryKey: string;
  updateList: (id: number) => void;
}) {
  const [isViewed, setIsViewed] = useState(item.viewed);
  const [isMarked, setIsMarked] = useState(item.marked); // 즐겨찾기 상태

  const handleMarkedPress = async (event: any) => {
    event.preventDefault();
    const currentMarkedStatus = isMarked;
    setIsMarked(!currentMarkedStatus);
    await onMarkedPress(item.id, categoryKey, currentMarkedStatus, updateList);
  };

  //
  const handlePress = async () => {
    try {
      // 서버에 알림을 읽음 처리 요청
      const message = await getMarkAlarmAsViewed(item.id);
      console.log(`알람 ${item.id} 읽음 처리: ${message}`);

      // 읽음 처리 후 상태 업데이트
      setIsViewed(true);
      updateList(item.id); // 리스트 업데이트

      // 알림의 URL을 열기
      Linking.openURL(item.url);
    } catch (error) {
      console.error(`알림 ${item.id} 읽음 처리 중 오류 발생:`, error);
    }
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 22,
        borderColor: Color.red.gray[700],
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          ...Font.Pretendard500[14],
          color: isViewed ? Color.contents.contentSecondary : Color.BLACK,
          flexShrink: 1,
          paddingRight: 20,
          paddingVertical: 12,
        }}
      >
        {item.title}
      </Text>
      <View
        style={{
          height: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...Font.Paragraph.Small,
            color: Color.contents.contentSecondary,
          }}
          numberOfLines={1}
        >
          {item.pubDate}
        </Text>
        <Pressable
          style={{
            paddingLeft: 13,
            paddingRight: 20,
            height: "100%",
            justifyContent: "center",
          }}
          onPress={handleMarkedPress}
        >
          {isMarked ? <ClippingOnIcon /> : <ClippingOffIcon />}
        </Pressable>
      </View>
    </Pressable>
  );
}
