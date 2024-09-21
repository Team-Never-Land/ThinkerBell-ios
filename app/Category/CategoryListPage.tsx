import CategoryHeader from "@/components/header/CategoryHeader";
import { Color, Font } from "@/constants/Theme";
import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";

const CategoryListPage = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <CategoryHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingBottom: 100,
          }}
        >
          <Pressable onPress={() => navigation.navigate("CategorySearch")}>
            <Text
              style={{
                ...Font.Heading.Large,
              }}
            >
              카테고리 페이지
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryListPage;
