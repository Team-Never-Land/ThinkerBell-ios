import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color, Font } from "@/constants/Theme";
import { useNavigation } from "expo-router";
import SearchIcon from "../../assets/images/icon/Topbar/Search_black.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecentSearch from "@/components/home/RecentSearch";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchPage() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState(""); // 입력된 값을 저장할 state
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // 최근 검색어 목록
  const { top } = useSafeAreaInsets();
  const SEARCH_HISTORY_KEY = "searchHistory";
  // 앱 시작 시 저장된 검색어 목록 불러오기
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedSearches = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (error) {
        console.error("Failed to load search history:", error);
      }
    };

    loadSearchHistory();
  }, []);

  // 검색어 목록 저장
  const saveSearchHistory = async (searches: string[]) => {
    try {
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  };

  const removeSearchItem = (item: string) => {
    const updatedSearches = recentSearches.filter((search) => search !== item);
    setRecentSearches(updatedSearches);
    saveSearchHistory(updatedSearches); // 업데이트된 목록 저장
  };

  const isValidSearch = (text: string) => {
    const validText = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/;
    return validText.test(text);
  };

  const handleSearch = (search: string) => {
    if (search.length < 1 || search.length > 12) {
      console.log("검색어는 1글자 이상, 12글자 이하여야 합니다.");
    } else if (!isValidSearch(search)) {
      console.log("키워드를 정확하게 입력해주세요.");
    } else {
      console.log("입력된 검색어:", search);
      setRecentSearches((prevSearches) => {
        const updatedSearches = [
          search,
          ...prevSearches.filter((s) => s !== search),
        ].slice(0, 9); // 최대 9개의 검색어만 유지
        saveSearchHistory(updatedSearches); // 검색어 목록 저장
        return updatedSearches;
      });
      setSearch(""); // 검색어 입력창 초기화
      Keyboard.dismiss(); // 키보드 닫기

      navigation.navigate("SearchResultPage", { query: search }); // 검색 결과 페이지로 이동
    }
  };
  return (
    <View style={styles.container}>
      {/* Safe Area Inset */}
      <View style={{ height: top, backgroundColor: Color.WHITE }}></View>
      <View
        style={{
          height: "100%",
        }}
      >
        <View
          style={{
            width: 307,
            marginTop: 66,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 251,
              height: 36,
              padding: 2,
              paddingHorizontal: 11,
              backgroundColor: "#FFFFFF",
              borderColor: "#898989",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                ...Font.Label.MediumInput,
                color: Color.BLACK,
                paddingLeft: 17,
                flex: 1,
              }}
              onChangeText={(text) => {
                setSearch(text); // 입력된 값을 저장
                setErrorMessage(""); // 오류 메시지 초기화
              }}
              value={search}
              placeholder="검색어"
              placeholderTextColor={Color.BLACK}
              maxLength={12}
              onSubmitEditing={() => handleSearch(search)}
            />
            <TouchableOpacity onPress={() => handleSearch(search)}>
              {/* 아이콘 눌렀을 때 검색 실행 */}
              <SearchIcon style={{ marginRight: 4 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("home");
              navigation.navigate("HomeMain"); // HomeMain 페이지로 이동
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard",
                fontWeight: 500,
                color: Color.contents.contentSecondary,
              }}
            >
              닫기
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 40,
          }}
        >
          <Text
            style={{
              ...Font.Label.Large,
              marginBottom: 24,
            }}
          >
            최근 검색어
          </Text>
          {/* 최근 검색어는 검색한 것이 있을 때만 표시 */}
          {recentSearches.length > 0 && (
            <View>
              <FlatList
                data={recentSearches}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSearch(item)}>
                    <RecentSearch
                      search={item}
                      onDelete={() => removeSearchItem(item)}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${item}-${index}`}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  searchIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 24,
    color: "#000",
  },
  recentSearchContainer: {
    marginTop: 49,
    width: 154,
  },
  recentSearchText: {
    fontSize: 21,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 24,
  },
  recentSearchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: "rgba(228, 233, 239, 0.77)",
    borderRadius: 100,
    marginBottom: 13,
  },
  recentSearchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  cancelIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  recentSearchWrapper: {
    marginTop: 20,
    width: 307,
    flex: 1,
    justifyContent: "flex-end", // 아래에서부터 검색어가 쌓이도록 설정
  },
});
