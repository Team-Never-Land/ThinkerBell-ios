import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 각 화면 가져오기
import Category from "./Category";
import HomeScreen from "./Home";
import FavoritesScreen from "./Favorites";
import SettingsScreen from "./Settings"; //

// Tab Navigator 생성
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // 상단 헤더 숨기기
        tabBarShowLabel: false, // 탭바 라벨 숨기기
        tabBarStyle: {
          height: 60, // 탭바의 높이를 60으로 고정
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;

          // route.name에 맞는 아이콘 설정
          if (route.name === "home") {
            iconSource = focused
              ? require("../../assets/images/tab/home-active.png")
              : require("../../assets/images/tab/home-inactive.png");
          } else if (route.name === "category") {
            iconSource = focused
              ? require("../../assets/images/tab/category-active.png")
              : require("../../assets/images/tab/category-inactive.png");
          } else if (route.name === "favorites") {
            iconSource = focused
              ? require("../../assets/images/tab/favorites-active.png")
              : require("../../assets/images/tab/favorites-inactive.png");
          } else if (route.name === "settings") {
            iconSource = focused
              ? require("../../assets/images/tab/settings-active.png")
              : require("../../assets/images/tab/settings-inactive.png");
          }

          // 아이콘 크기 고정
          return (
            <Image source={iconSource} style={{ width: 24, height: 24 }} />
          );
        },
      })}
    >
      {/* 각각의 화면을 Tab.Screen으로 정의 */}
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="category" component={Category} />
      <Tab.Screen name="favorites" component={FavoritesScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
