import React from "react";
import { View, Text, StatusBar, Pressable, FlatList } from "react-native";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TCategoryKey } from "@/types/category";
import { initialCategory } from "@/assets/data/initialCategory";
import { useFocusEffect } from "expo-router";

export default function FavoritesNoticeHeader({
  categoryKeyList,
  selectedCategoryKey,
  setSelectedCategoryKey,
}: {
  categoryKeyList: TCategoryKey[];
  selectedCategoryKey: TCategoryKey | null;
  setSelectedCategoryKey: React.Dispatch<
    React.SetStateAction<TCategoryKey | null>
  >;
}) {
  const { top } = useSafeAreaInsets();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );

  return (
    <>
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          paddingTop: 55,
          paddingBottom: 15,
          backgroundColor: Color.BLUE,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...Font.Label.XL,
            color: Color.WHITE,
            marginBottom: 16,
          }}
        >
          즐겨찾기한 공지사항
        </Text>
        <FlatList
          data={categoryKeyList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 40,
            paddingHorizontal: 16,
          }}
          renderItem={({ item }) => {
            const categoryText =
              initialCategory.find((category) => category.key === item)?.text ||
              item;

            // 마지막 글자에 "공지"가 있는 경우 제거
            const cleanedText = categoryText.endsWith("공지")
              ? categoryText.slice(0, -2)
              : categoryText;

            return (
              <Pressable
                onPress={() => setSelectedCategoryKey(item)}
                style={{
                  borderBottomColor: Color.WHITE,
                  borderBottomWidth: selectedCategoryKey === item ? 2 : 0,
                  paddingTop: 4,
                  paddingBottom: 2,
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    ...Font.Label.Medium,
                    color:
                      selectedCategoryKey === item
                        ? Color.WHITE
                        : Color.red.gray[200],
                    textAlign: "center",
                  }}
                >
                  {cleanedText.trim()}
                </Text>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </>
  );
}
