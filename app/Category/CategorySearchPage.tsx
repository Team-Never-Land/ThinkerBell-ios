import {
  dummyCategory,
  dummyCategorySearch,
} from "@/assets/data/dummyCategory";
import CategoryButton from "@/components/category/CategoryButton";
import DropdownMenu from "@/components/category/DropdownMenu";
import Pagination from "@/components/category/Pagination";
import CategoryHeader from "@/components/header/CategoryHeader";
import { Color, Font } from "@/constants/Theme";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import Toast from "react-native-toast-message";

type CategorySearchRouteProp = RouteProp<
  { CategorySearch: { categoryText: string; categoryKey: TCategoryKey } },
  "CategorySearch"
>;

export type TCategoryKey =
  | "NormalNotice"
  | "AcademicNotice"
  | "EventNotice"
  | "ScholarshipNotice"
  | "CareerNotice"
  | "StudentActsNotice"
  | "BiddingNotice"
  | "SafetyNotice"
  | "RevisionNotice"
  | "DormitoryNotice"
  | "DormitoryEntryNotice"
  | "LibraryNotice"
  | "TeachingNotice";

export type TCategoryList = {
  id: number;
  pubDate: string;
  title: string;
  url: string;
  marked: boolean;
  important?: boolean;
  campus?: string;
};

const CategorySearchPage = ({ navigation }: { navigation: any }) => {
  const route = useRoute<CategorySearchRouteProp>();
  const { categoryText, categoryKey } = route.params;
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [list, setList] = useState<TCategoryList[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 0,
    totalItems: 0,
  });
  const [selectedCampus, setSelectedCampus] = useState("전체");
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setList(dummyCategory.items);
    setPageInfo({
      page: dummyCategory.page,
      size: dummyCategory.size,
      totalItems: dummyCategory.totalItems,
    });
    setIsLoading(true);
  }, [page]);

  useEffect(() => {
    if (isLoading) {
      setTotalSize(Math.ceil((pageInfo.totalItems - pageInfo.size) / 10));
    }
  }, [isLoading]);

  //검색
  const onSearch = () => {
    setSearchText(search);
    setIsSearch(true);

    if (dummyCategorySearch[categoryKey]) {
      setList(dummyCategorySearch[categoryKey]);
    } else {
      setList([]);
    }
  };

  //즐겨찾기
  const onMarkedPress = (id: number, marked: boolean) => {
    if (marked) {
      // 이미 즐겨찾기인 경우 삭제
      removeFromFavorites(id);
    } else {
      // 즐겨찾기가 아닌 경우 추가
      addToFavorites(id);
    }
  };

  //즐겨찾기 추가
  const addToFavorites = (id: number) => {
    Toast.show({
      type: "success",
      text1: "즐겨찾기 되었습니다!",
      position: "bottom",
      visibilityTime: 1500,
      autoHide: true,
    });

    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  //즐겨찾기 삭제
  const removeFromFavorites = (id: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <CategoryHeader
        navigation={navigation}
        title={categoryText}
        search={search}
        setSearch={setSearch}
        onSearch={onSearch}
      />
      {list.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {isSearch ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: Color.red.gray[700],
                borderBottomWidth: 1,
                height: 58,
                zIndex: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexShrink: 1,
                  paddingLeft: 22,
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    ...Font.Category[14],
                    color: Color.contents.contentSecondary,
                  }}
                >
                  ‘{searchText}’이(가) 포함된 공지사항 ({list.length}개)
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 13,
                  paddingRight: 19,
                }}
              >
                <DropdownMenu
                  selectedCampus={selectedCampus}
                  setSelectedCampus={setSelectedCampus}
                />
              </View>
            </View>
          ) : (
            (categoryKey === "DormitoryNotice" ||
              categoryKey === "DormitoryEntryNotice") && (
              <View
                style={{
                  borderColor: Color.red.gray[700],
                  borderBottomWidth: 1,
                  alignItems: "flex-end",
                  paddingTop: 13,
                  paddingRight: 19,
                  height: 58,
                  zIndex: 10,
                }}
              >
                <DropdownMenu
                  selectedCampus={selectedCampus}
                  setSelectedCampus={setSelectedCampus}
                />
              </View>
            )
          )}
          {list.map((item, index) => {
            return (
              <CategoryButton
                key={index}
                item={item}
                categoryKey={categoryKey}
                onMarkedPress={onMarkedPress}
              />
            );
          })}
          {isSearch ? (
            <View
              style={{
                alignItems: "center",
                marginTop: 75,
              }}
            >
              <Pressable
                onPress={() => {
                  setIsSearch(false);
                  setSearch("");
                  setList(dummyCategory.items);
                  setPage(0);
                }}
                style={{
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: Color.red.gray[500],
                  width: 67,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Font.Category[14],
                    color: Color.red.gray[500],
                  }}
                >
                  뒤로가기
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pagination page={page} setPage={setPage} totalSize={totalSize} />
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            marginTop: 208,
          }}
        >
          <Text
            style={{
              ...Font.Paragraph.Medium,
              color: Color.contents.contentSecondary,
              textAlign: "center",
            }}
          >
            ‘{searchText}’이(가) 포함된 공지사항을{"\n"}찾을 수 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
};

export default CategorySearchPage;
