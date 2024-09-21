import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgProps } from "react-native-svg";
import HomeIcon from "../../assets/images/tab/Home.svg";
import HomeFocusedIcon from "../../assets/images/tab/Home-Focused.svg";
import CategoryIcon from "../../assets/images/tab/Category.svg";
import CategoryFocusedIcon from "../../assets/images/tab/Category-Focused.svg";
import FavoriteIcon from "../../assets/images/tab/Favorite.svg";
import FavoriteFocusedIcon from "../../assets/images/tab/Favorite-Focused.svg";
import SettingIcon from "../../assets/images/tab/Setting.svg";
import SettingFocusedIcon from "../../assets/images/tab/Setting-Focused.svg";
import { Color } from "@/constants/Theme";

// 각 화면 가져오기
import CategoryScreen from "./Category";
import HomeScreen from "./Home";
import FavoritesScreen from "./Favorites";
import SettingsScreen from "./Settings";

// Tab Navigator 생성
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // 상단 헤더 숨기기
        tabBarShowLabel: false, // 탭바 라벨 숨기기
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Color.WHITE,
          height: "auto",
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          position: "absolute",
          shadowColor: "rgba(186, 186, 186, 0.10)",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 2,
          display: "flex",
        },
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          let IconComponent: React.FC<SvgProps>;

          switch (route.name) {
            case "home":
              focused
                ? (IconComponent = HomeFocusedIcon)
                : (IconComponent = HomeIcon);
              break;
            case "category":
              focused
                ? (IconComponent = CategoryFocusedIcon)
                : (IconComponent = CategoryIcon);
              break;
            case "favorites":
              focused
                ? (IconComponent = FavoriteFocusedIcon)
                : (IconComponent = FavoriteIcon);
              break;
            case "settings":
              focused
                ? (IconComponent = SettingFocusedIcon)
                : (IconComponent = SettingIcon);
              break;
            default:
              return null;
          }

          return <IconComponent />;
        },
        tabBarIconStyle: {
          marginTop: 30,
          marginBottom: 17,
        },
      })}
    >
      {/* 각각의 화면을 Tab.Screen으로 정의 */}
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="category" component={CategoryScreen} />
      <Tab.Screen name="favorites" component={FavoritesScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
