import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TCategoryKey, TCategoryList } from "@/types/category";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Font } from "@/constants/Theme";
import LogoIcon from "../../../assets/images/icon/Logo.svg";
import { dummyCategorySearch } from "@/assets/data/dummyCategory";
import SearchBar from "@/components/header/SearchBar";
import { getSearchNotices } from "@/service/getSearchNotices";
import { useFocusEffect } from "expo-router";
export default function ResultSearchHeader({
  query,
  handleSearch,
  //onFilter,
  navigation,
  onSearchComplete,
}: {
  query: string;
  handleSearch: (search: string) => void;
  //onFilter: (filteredNotices: TCategoryList[]) => void; // 필터링된 공지를 전달하는 콜백 함수
  navigation: any;
  onSearchComplete: (data: any) => void;
}) {
  const { top } = useSafeAreaInsets();

  const categories = ["학사", "생활관", "장학/장학금", "학생활동"];
  const [selectedCategory, setSelectedCategory] = useState<string>("학사"); // 선택된 카테고리 상태
  const [search, setSearch] = useState<string>(query); // query 값을 search 상태로 관리
  const [filteredNotices, setFilteredNotices] = useState<TCategoryList[]>([]);

  const keyMap: { [key: string]: TCategoryKey } = {
    학사: "AcademicNotice",
    생활관: "DormitoryNotice",
    "장학/장학금": "ScholarshipNotice",
    학생활동: "StudentActsNotice",
  };
  const noticeTypeMap: { [key: string]: TCategoryKey } = {
    학사: "AcademicNotice",
    생활관: "DormitoryNotice",
    "장학/장학금": "ScholarshipNotice",
    학생활동: "StudentActsNotice",
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);

    try {
      // 선택된 카테고리의 noticeType을 가져옴
      const noticeType = noticeTypeMap[category];
      console.log(`Searching with keyword: ${search}, category: ${noticeType}`);

      const response = await getSearchNotices(search, noticeType); // API 호출 시 noticeType 전달

      const categoryKey = keyMap[category]; // 선택된 카테고리의 키 가져오기

      // 서버 응답에 해당 카테고리 데이터가 있으면 상태 업데이트
      if (response.data[categoryKey]) {
        setFilteredNotices(response.data[categoryKey]); // 필터링된 공지 상태 업데이트
        onSearchComplete(response.data[categoryKey]);
      } else {
        setFilteredNotices([]); // 데이터가 없으면 빈 배열로 설정
        onSearchComplete([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearchComplete([]); // 오류 발생 시 빈 배열 설정
    }
  };
  const onSearchSubmit = () => {
    handleCategorySelect(selectedCategory); // 검색어와 선택된 카테고리에 따른 필터링 실행
  };

  return (
    <>
      {/* Safe Area Inset */}
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>

      {/* Status Bar */}
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />

      {/* Header Content */}
      <View
        style={{
          position: "relative",
          height: 276,
          width: "100%",
          backgroundColor: Color.BLUE,
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: "7.22%",
            right: "7.22%",
            marginTop: 45,
            alignItems: "center", // 수평 중앙 정렬
          }}
        >
          <LogoIcon
            width={28}
            height={22}
            onPress={() => navigation.navigate("HomeMain")}
          />
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: 75,
          }}
        >
          <Text
            style={{
              ...Font.Label.XL,
              color: Color.WHITE,
            }}
          >
            검색 결과
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: 147,
          }}
        >
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={onSearchSubmit}
          />
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: 193,
          }}
        >
          <Text
            style={{
              color: Color.WHITE,
              ...Font.Label.Small,
            }}
          >
            검색결과 : 총 {filteredNotices.length}개
          </Text>
        </View>

        <View
          style={{
            height: 34,
            left: 20,
            marginTop: 229,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 40,
              alignItems: "center",
            }}
          >
            {categories.map((category, index) => (
              <Pressable
                key={index}
                onPress={() => handleCategorySelect(category)}
                style={{
                  marginRight: 38, // 카테고리 간 간격 설정
                }}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === category
                        ? Color.WHITE
                        : Color.Grey[1],
                    ...Font.Label.Medium,
                  }}
                >
                  {category}
                </Text>
                {/* 하단 강조선 - 수정 필요 */}
                {selectedCategory === category && (
                  <View
                    style={{
                      width:
                        category === "학사"
                          ? 27
                          : category === "생활관"
                          ? 42
                          : category === "장학/장학금"
                          ? 75
                          : category === "학생활동"
                          ? 55
                          : 42, // 기본값 설정
                      borderRadius: 1, // 모서리 반경 설정
                      borderWidth: 1,
                      borderColor: Color.WHITE, // 테두리 색상
                      opacity: 1, // 강조선의 투명도 설정
                      marginTop: -2,
                    }}
                  />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
