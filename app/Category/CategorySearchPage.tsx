import CategoryHeader from "@/components/header/CategoryHeader";
import { Color, Font } from "@/constants/Theme";
import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";

const CategorySearchPage = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <CategoryHeader navigation={navigation} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: 100,
          }}
        >
          <Pressable onPress={() => navigation.navigate("CategoryList")}>
            <Text
              style={{
                ...Font.Heading.Large,
              }}
            >
              카테고리 리스트 페이지
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategorySearchPage;
