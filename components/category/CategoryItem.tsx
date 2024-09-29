import React, { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import ClippingOnIcon from "../../assets/images/icon/Clipping/Clipping-On.svg";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { Color, Font } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TCategoryList } from "@/types/category";
import { onMarkedPress } from "@/utils/favorites";

export default function CategoryItem({
  item,
  categoryKey,
  updateList,
}: {
  item: TCategoryList;
  categoryKey: string;
  updateList: (id: number) => void;
}) {
  const [isViewed, setIsViewed] = useState(false);

  const getNoticesArray = async (key: string) => {
    try {
      const existingNotices = await AsyncStorage.getItem(key);
      return existingNotices ? JSON.parse(existingNotices) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const checkIfViewed = async () => {
    const noticesArray = await getNoticesArray(categoryKey);
    setIsViewed(noticesArray.includes(item.id));
  };

  const saveViewedNotice = async () => {
    const noticesArray = await getNoticesArray(categoryKey);
    if (!noticesArray.includes(item.id)) {
      noticesArray.push(item.id);
      await AsyncStorage.setItem(categoryKey, JSON.stringify(noticesArray));
      setIsViewed(true);
    }
  };

  useEffect(() => {
    checkIfViewed();
  }, [categoryKey, item.id]);

  return (
    <Pressable
      onPress={async () => {
        await saveViewedNotice();
        Linking.openURL(item.url);
      }}
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
          onPress={(event) => {
            event.preventDefault();
            onMarkedPress(item.id, categoryKey, item.marked, updateList);
          }}
        >
          {item.marked ? <ClippingOnIcon /> : <ClippingOffIcon />}
        </Pressable>
      </View>
    </Pressable>
  );
}
