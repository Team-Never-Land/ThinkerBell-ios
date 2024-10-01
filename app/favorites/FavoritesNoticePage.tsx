import { Color } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { TCategoryKey, TCategorySearch } from "@/types/category";
import CategoryItem from "@/components/category/CategoryItem";
import { dummyFavoritesNotice } from "@/assets/data/dummyFavorites";
import FavoritesNoticeHeader from "@/components/header/FavoritesNoticeHeader";

const FavoritesNoticePage = () => {
  const [noticelist, setNoticeList] = useState<TCategorySearch>({}); //즐겨찾기한 공지사항 목록
  const [categoryKeyList, setCategoryKeyList] = useState<TCategoryKey[]>([]); //카테고리 목록
  const [selectedCategoryKey, setSelectedCategoryKey] =
    useState<TCategoryKey | null>(null); //선택한 카테고리
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNoticeList(dummyFavoritesNotice);
    const keys = Object.keys(dummyFavoritesNotice) as TCategoryKey[];
    setCategoryKeyList(keys);

    if (keys.length > 0) {
      setSelectedCategoryKey(keys[0]);
    }
    setIsLoading(false);
  }, []);

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
      {!isLoading && (
        <>
          <FavoritesNoticeHeader
            categoryKeyList={categoryKeyList}
            selectedCategoryKey={selectedCategoryKey}
            setSelectedCategoryKey={setSelectedCategoryKey}
          />
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
        </>
      )}
    </View>
  );
};

export default FavoritesNoticePage;
