import { dummyCategory } from "@/assets/data/dummyCategory";
import CategoryButton from "@/components/category/CategoryButton";
import DropdownMenu from "@/components/category/DropdownMenu";
import Pagination from "@/components/category/Pagination";
import CategoryHeader from "@/components/header/CategoryHeader";
import { Color } from "@/constants/Theme";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

type CategorySearchRouteProp = RouteProp<
  { CategorySearch: { categoryText: string; categoryKey: string } },
  "CategorySearch"
>;

const CategorySearchPage = ({ navigation }: { navigation: any }) => {
  const route = useRoute<CategorySearchRouteProp>();
  const { categoryText, categoryKey } = route.params;
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [list, setList] = useState(dummyCategory);
  const [selectedCampus, setSelectedCampus] = useState("전체");

  useEffect(() => {
    setTotalSize(Math.ceil((list.totalItems - list.size) / 10));
  }, []);

  useEffect(() => {
    //페이지에 맞는 리스트 불러오기
    console.log(page);
  }, [page]);

  //검색
  const onSearch = (search: string) => {
    console.log(search);
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

    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      ),
    }));
  };

  //즐겨찾기 삭제
  const removeFromFavorites = (id: number) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      ),
    }));
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
        onSearch={onSearch}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {(categoryKey === "DormitoryNotice" ||
          categoryKey === "DormitoryEntryNotice") && (
          <View
            style={{
              borderColor: Color.red.gray[700],
              borderBottomWidth: 1,
              alignItems: "flex-end",
              paddingTop: 11,
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
        )}
        {list.items.map((item, index) => {
          return (
            <CategoryButton
              key={index}
              item={item}
              categoryKey={categoryKey}
              onMarkedPress={onMarkedPress}
            />
          );
        })}
        <Pagination page={page} setPage={setPage} totalSize={totalSize} />
      </ScrollView>
    </View>
  );
};

export default CategorySearchPage;
