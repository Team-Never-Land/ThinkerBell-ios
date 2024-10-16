import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import ResultSearchHeader from "@/components/home/header/ResultSearchHeader";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TCategoryList } from "@/types/category";
import CategoryItem from "@/components/category/CategoryItem";
import { Color, Font } from "@/constants/Theme";
import { getSearchNotices } from "@/service/getSearchNotices";

type SearchResultRouteParams = {
  query: string;
};
export default function SearchResultPage() {
  const route =
    useRoute<RouteProp<{ params: SearchResultRouteParams }, "params">>();
  const [query, setQuery] = useState(route.params?.query || ""); // 검색어를 상태로 관리
  const navigation = useNavigation();
  const SEARCH_HISTORY_KEY = "searchHistory";
  const [filteredNotices, setFilteredNotices] = useState<TCategoryList[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리

  const updateList = (id: number) => {
    setFilteredNotices((prevNotices) =>
      prevNotices.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  const handleSearch = (newSearch: string) => {
    setQuery(newSearch); // 검색어 업데이트
    saveSearchHistory(newSearch); // 검색어를 저장
  };

  // 새로운 검색어를 저장하는 함수
  const saveSearchHistory = async (newSearch: string) => {
    try {
      const storedSearches = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      let searches = storedSearches ? JSON.parse(storedSearches) : [];

      // 중복 검색어 제거 후 새로운 검색어 추가 (최대 9개 유지)
      searches = [
        newSearch,
        ...searches.filter((s: string) => s !== newSearch),
      ].slice(0, 9);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searches));
      console.log("새로운 검색어 저장:", newSearch);
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  };

  const handleSearchComplete = (searchResults: TCategoryList[]) => {
    setFilteredNotices(searchResults); // 검색 완료 후 결과 업데이트
  };

  return (
    <View style={styles.container}>
      <ResultSearchHeader
        query={query}
        handleSearch={handleSearch}
        //onFilter={handleFilterNotices}
        navigation={navigation}
        onSearchComplete={handleSearchComplete}
      />
      {filteredNotices.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center", // 좌우 중앙 정렬
            marginTop: 156,
          }}
        >
          <Text
            style={{
              width: 206,
              height: 52,
              ...Font.Paragraph.Medium,
              textAlign: "center",
              color: Color.contents.contentSecondary,
            }}
          >
            '{query}'이(가) 포함된 공지사항을 찾을 수 없습니다.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotices}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              categoryKey="AcademicNotice"
              updateList={updateList}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
