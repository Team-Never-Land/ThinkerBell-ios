import { Color } from "@/constants/Theme";
import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { TCategoryKey, TCategorySearch } from "@/types/category";
import CategoryItem from "@/components/category/CategoryItem";
import FavoritesNoticeHeader from "@/components/header/FavoritesNoticeHeader";
import { getBookmarkNotice } from "@/service/bookmark/getBookmarkNotice";
import { useFocusEffect } from "expo-router";

const FavoritesNoticePage = () => {
  const [noticelist, setNoticeList] = useState<TCategorySearch>({}); //즐겨찾기한 공지사항 목록
  const [categoryKeyList, setCategoryKeyList] = useState<TCategoryKey[]>([]); //카테고리 목록
  const [selectedCategoryKey, setSelectedCategoryKey] =
    useState<TCategoryKey | null>(null); //선택한 카테고리
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await getBookmarkNotice();
          if (response.code === 200) {
            setNoticeList(response.data);

            const keys = Object.keys(response.data) as TCategoryKey[];
            setCategoryKeyList(keys);

            if (keys.length > 0) {
              setSelectedCategoryKey(keys[0]);
            }
          }
        } catch (error) {
          console.error(error);
          setNoticeList({});
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const updateList = (id: number) => {
    setNoticeList((prevList) => {
      if (!prevList || !selectedCategoryKey || !prevList[selectedCategoryKey])
        return prevList;

      const updatedCategoryItems = prevList[selectedCategoryKey].map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      );

      return {
        ...prevList,
        [selectedCategoryKey]: updatedCategoryItems,
      };
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <FavoritesNoticeHeader
        categoryKeyList={categoryKeyList}
        selectedCategoryKey={selectedCategoryKey}
        setSelectedCategoryKey={setSelectedCategoryKey}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Color.BLACK}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 100 }}>
            {selectedCategoryKey &&
              noticelist[selectedCategoryKey] &&
              noticelist[selectedCategoryKey].map((item, index) => (
                <CategoryItem
                  key={index}
                  item={item}
                  categoryKey={selectedCategoryKey}
                  updateList={updateList}
                />
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default FavoritesNoticePage;
