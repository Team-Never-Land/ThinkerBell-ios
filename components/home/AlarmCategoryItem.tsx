import React, { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import ClippingOnIcon from "../../assets/images/icon/Clipping/Clipping-On.svg";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { Color, Font } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TCategoryList } from "@/types/category";
import { onMarkedPress } from "@/utils/favorites";

export default function AlarmCategoryItem({
  item,
  categoryKey,
  updateList,
}: {
  item: TCategoryList;
  categoryKey: string;
  updateList: (id: number) => void;
}) {
  const [isViewed, setIsViewed] = useState(item.read);
  const [isMarked, setIsMarked] = useState(item.marked); // 즐겨찾기 상태

  const saveViewedNotice = async (category: string, noticeId: number) => {
    const storageKey = `${category}_viewed`;
    let viewedNotices = await getNoticesArray(storageKey);

    if (!viewedNotices.includes(noticeId)) {
      viewedNotices.push(noticeId);
      await AsyncStorage.setItem(storageKey, JSON.stringify(viewedNotices));
    }

    console.log(
      `공지 ${noticeId} 읽음 상태 저장됨, categoryKey: ${storageKey}, 저장된 공지들: ${viewedNotices.join(
        ","
      )}`
    );
  };
  const getNoticesArray = async (key: string) => {
    try {
      const existingNotices = await AsyncStorage.getItem(key);
      return existingNotices ? JSON.parse(existingNotices) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleMarkedPress = async (event: any) => {
    event.preventDefault();
    const currentMarkedStatus = isMarked;
    setIsMarked(!currentMarkedStatus);
    await onMarkedPress(item.id, categoryKey, currentMarkedStatus, updateList);
  };

  useEffect(() => {
    const checkIfViewed = async () => {
      const storageKey = `${categoryKey}_viewed`; // 고유 키로 읽음 상태를 불러옴

      const noticesArray = await getNoticesArray(storageKey);
      if (Array.isArray(noticesArray)) {
        setIsViewed(noticesArray.includes(item.id));
      }
    };
    checkIfViewed();
  }, [categoryKey, item.id]);
  const handlePress = async () => {
    await saveViewedNotice(categoryKey, item.id); // 공지를 읽음으로 처리
    updateList(item.id); // 리스트 업데이트
    setIsViewed(true);
    Linking.openURL(item.url);
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
        backgroundColor: item.important ? Color.category : Color.WHITE,
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
        {item.important && "[중요]  "}
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
