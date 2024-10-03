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
export default function ResultSearchHeader({
  query,
  handleSearch,
  onFilter,
  navigation,
}: {
  query: string;
  handleSearch: (search: string) => void;
  onFilter: (filteredNotices: TCategoryList[]) => void; // 필터링된 공지를 전달하는 콜백 함수
  navigation: any;
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
  // 필터링 수행
  const filterNotices = (category: string, searchText: string) => {
    const categoryKey = keyMap[category];
    const categoryNotices = dummyCategorySearch[categoryKey] || [];
    const effectiveSearchText =
      searchText.trim() === "" ? "검색어" : searchText;

    // 검색어에 해당하는 공지 필터링
    const filtered = categoryNotices.filter((notice) =>
      notice.title.includes(effectiveSearchText)
    );
    setFilteredNotices(filtered);
    onFilter(filtered); // 필터링된 결과를 부모 컴포넌트로 전달
  };

  useEffect(() => {
    filterNotices(selectedCategory, search);
  }, [selectedCategory, search]); // 카테고리 또는 검색어가 변경될 때 필터링 실행

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category); // 카테고리 설정만 변경하고, 필터링은 useEffect에서 처리
  };

  const onSearchSubmit = () => {
    handleSearch(search); // 검색어 저장
    filterNotices(selectedCategory, search); // 검색어 제출 시 필터링
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
