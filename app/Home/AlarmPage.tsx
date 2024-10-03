import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import AlarmHeader from "@/components/home/header/AlarmHeader";
import { TCategoryList } from "@/types/category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlarmCategoryItem from "@/components/home/AlarmCategoryItem";
import { useNavigation } from "expo-router";

export default function AlarmPage() {
  const navigation = useNavigation();

  const [filteredNotices, setFilteredNotices] = useState<TCategoryList[]>([]); // 필터링된 공지사항
  const [hasUnreadNotices, setHasUnreadNotices] = useState<boolean>(false); // 읽지 않은 공지가 있는지
  const [unreadCount, setUnreadCount] = useState<number>(0); // 읽지 않은 공지 개수
  const [categoryName, setCategoryName] = useState<string>(""); // 카테고리 이름

  const getViewedNotices = async (category: string) => {
    const storageKey = `${category}_viewed`;
    const existingNotices = await AsyncStorage.getItem(storageKey);
    console.log(`불러온 읽음 상태: ${existingNotices}`); // 로그 추가

    return existingNotices ? JSON.parse(existingNotices) : [];
  };

  const checkUnreadNotices = (notices: TCategoryList[], category: string) => {
    const unreadNotices = notices.filter((notice) => !notice.read); // read: false인 공지 필터링
    setUnreadCount(unreadNotices.length); // 읽지 않은 공지 개수 설정
    setHasUnreadNotices(unreadNotices.length > 0); // 읽지 않은 공지가 하나라도 있으면 true, 없으면 false

    // 로그 출력
    console.log(
      `카테고리: ${category}, 총 공지 개수: ${notices.length}, 읽지 않은 공지 개수: ${unreadNotices.length}`
    );
  };

  const handleFilterNotices = async (
    notices: TCategoryList[],
    category: string
  ) => {
    setCategoryName(category); // 카테고리 이름 저장
    const viewedNotices = await getViewedNotices(category);
    // 각 공지의 읽음 상태 적용
    const updatedNotices = notices.map((notice) => ({
      ...notice,
      read: viewedNotices.includes(notice.id),
    }));

    setFilteredNotices(updatedNotices); // 필터링된 공지사항 업데이트
    checkUnreadNotices(updatedNotices, category); // 읽지 않은 공지 여부 체크
  };

  const handleUpdateList = (id: number) => {
    setFilteredNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, read: true } : notice
      )
    );

    const updateOriginalNotices = async () => {
      const key = `${categoryName}_viewed`; // 카테고리 이름 기반으로 읽음 상태 저장
      const existingNotices = await AsyncStorage.getItem(key);
      let parsedNotices = existingNotices ? JSON.parse(existingNotices) : [];

      if (!parsedNotices.includes(id)) {
        parsedNotices.push(id);
      }

      await AsyncStorage.setItem(key, JSON.stringify(parsedNotices));
      checkUnreadNotices(filteredNotices, categoryName);
    };

    updateOriginalNotices();
  };

  return (
    <View>
      <AlarmHeader
        onFilterNotices={handleFilterNotices} // 필터링된 공지사항을 헤더에서 전달
        navigation={navigation}
      />

      {filteredNotices.length > 0 ? (
        <FlatList
          data={filteredNotices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AlarmCategoryItem
              item={item}
              categoryKey={categoryName}
              updateList={handleUpdateList}
            />
          )}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          해당 카테고리에 공지사항이 없습니다.
        </Text>
      )}
    </View>
  );
}
