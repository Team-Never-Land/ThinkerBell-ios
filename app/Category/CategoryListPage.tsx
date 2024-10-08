import CategoryBox from "@/components/category/CategoryBox";
import { Color, Font } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialCategory } from "@/assets/data/initialCategory";
import { useFocusEffect } from "expo-router";

const CategoryListPage = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<{ key: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const storageKey = "@category_order";

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");

      return () => {};
    }, [])
  );

  useEffect(() => {
    const loadCategoryOrder = async () => {
      try {
        const savedData = await AsyncStorage.getItem(storageKey);
        if (savedData) {
          setData(JSON.parse(savedData));
        } else {
          setData(initialCategory);
        }
      } catch (error) {
        console.error(error);
        setData(initialCategory);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryOrder();
  }, []);

  const saveCategoryOrder = async (newData: typeof initialCategory) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({
    item,
    drag,
  }: RenderItemParams<{ key: string; text: string }>) => {
    return (
      <CategoryBox
        navigation={navigation}
        textKey={item.key}
        text={item.text}
        onLongPress={drag}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <StatusBar backgroundColor={Color.WHITE} />
      <View
        style={{
          paddingLeft: 22,
          paddingVertical: 12.5,
          backgroundColor: Color.category,
        }}
      >
        <Text
          style={{
            ...Font.Label.Medium,
            color: Color.BLACK,
          }}
        >
          카테고리
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Color.BLACK}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => {
            setData(data);
            saveCategoryOrder(data);
          }}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryListPage;
