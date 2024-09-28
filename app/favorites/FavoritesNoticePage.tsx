import { Color } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { TCategoryKey, TCategorySearch } from "@/types/category";
import CategoryButton from "@/components/category/CategoryButton";
import { dummyFavoritesNotice } from "@/assets/data/dummyFavorites";
import Toast from "react-native-toast-message";
import FavoritesNoticeHeader from "@/components/header/FavoritesNoticeHeader";

const FavoritesNoticePage = () => {
  const [noticelist, setNoticeList] = useState<TCategorySearch>({});
  const [categoryKeyList, setCategoryKeyList] = useState<TCategoryKey[]>([]);
  const [selectedCategoryKey, setSelectedCategoryKey] =
    useState<TCategoryKey | null>(null);
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

  //즐겨찾기
  const onMarkedPress = (id: number, marked: boolean) => {
    if (marked) {
      // 이미 즐겨찾기된 경우 삭제
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

    updateList(id);
  };

  //즐겨찾기 삭제
  const removeFromFavorites = (id: number) => {
    Toast.show({
      type: "success",
      text1: "삭제 되었습니다.",
      position: "bottom",
      visibilityTime: 1500,
      autoHide: true,
    });

    updateList(id);
  };

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
                  <CategoryButton
                    key={index}
                    item={item}
                    categoryKey={selectedCategoryKey}
                    onMarkedPress={onMarkedPress}
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
