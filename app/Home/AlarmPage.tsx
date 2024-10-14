import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AlarmHeader from "@/components/home/header/AlarmHeader";
import { TCategoryList } from "@/types/category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlarmCategoryItem from "@/components/home/AlarmCategoryItem";
import { useNavigation } from "expo-router";
import { Color, Font } from "@/constants/Theme";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { getKeywords } from "@/service/keyword/getKeywords";
export type NoticeItem = {
  id: number;
  title: string;
  noticeTypeKorean: string;
  noticeTypeEnglish: string;
  pubDate: string;
  viewed: boolean;
  url: string;
  marked: boolean;
};
export default function AlarmPage() {
  const navigation = useNavigation();

  const [filteredNotices, setFilteredNotices] = useState<NoticeItem[]>([]); // 필터링된 공지사항
  const [categoryName, setCategoryName] = useState<string>(""); // 카테고리 이름
  const [unreadKeywords, setUnreadKeywords] = useState<{
    [key: string]: boolean;
  }>({});
  const [keywords, setKeywords] = useState<string[]>([]); // 키워드 상태 관리

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const keywordList = await getKeywords(); // API로부터 키워드 목록 불러오기
      setKeywords(keywordList); // 키워드 상태에 저장
    } catch (error) {
      console.error("키워드 불러오기 오류:", error);
    }
  };

  const updateUnreadStatus = (newUnreadStatus: { [key: string]: boolean }) => {
    setUnreadKeywords(newUnreadStatus); // 키워드별로 읽지 않은 상태 업데이트
  };
  const handleFilterNotices = (notices: NoticeItem[]) => {
    setFilteredNotices(notices);
  };

  const handleUpdateList = (id: number) => {
    const updatedNotices = filteredNotices.map((notice) =>
      notice.id === id ? { ...notice, viewed: true } : notice
    );
    setFilteredNotices(updatedNotices);

    // 모든 공지가 읽혔는지 확인
    const allRead = updatedNotices.every((notice) => notice.viewed);
    if (allRead) {
      // 읽지 않은 공지가 없으면 해당 키워드의 빨간 점 제거
      const updatedUnreadStatus = { ...unreadKeywords };
      updatedUnreadStatus["keyword"] = false; // 현재 카테고리 키워드에 대해 빨간 점 제거
      setUnreadKeywords(updatedUnreadStatus);
    }
  };

  // 모든 카테고리에서 읽지 않은 공지를 확인하는 함수

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <AlarmHeader
        onFilterNotices={handleFilterNotices} // 필터링된 공지사항을 헤더에서 전달
        navigation={navigation}
        updateUnreadStatus={updateUnreadStatus}
      />
      {keywords.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 196,
              height: 170,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Font.Paragraph.Medium,
                color: Color.contents.contentSecondary,
                textAlign: "center",
                marginBottom: 20,
                width: 196,
                height: 52,
              }}
            >
              알림을 받고 싶은 공지가 있다면 키워드를 등록해 놓으세요!
            </Text>

            <Pressable
              style={{
                width: 178,
                height: 56,
                borderWidth: 2,
                borderColor: "#E4E9EF",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: Color.BLUE,
              }}
              onPress={() => navigation.navigate("RegisKeyword")}
            >
              <Text
                style={{
                  color: Color.WHITE,
                  fontWeight: "700",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                키워드 등록하기
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <FlatList
          style={{ marginBottom: 65 }}
          data={filteredNotices} // 필터링된 공지사항 데이터
          keyExtractor={(item) => item.id.toString()} // 각 항목의 고유 키 설정
          renderItem={({ item }) => (
            <AlarmCategoryItem
              item={item} // 각각의 공지사항 항목 전달
              categoryKey="keyword"
              updateList={handleUpdateList} // 업데이트 함수 전달
            />
          )}
          showsVerticalScrollIndicator={false} // 스크롤바 숨김 (선택사항)
          contentContainerStyle={{ paddingBottom: 20 }} // 추가 패딩으로 마지막 항목 간격 유지
        />
      )}
    </View>
  );
}
