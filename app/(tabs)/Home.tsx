import { View, FlatList } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React, { useState } from "react";
import HomeHeader from "@/components/home/header/HomeHeader";
import AlarmPage from "../Home/AlarmPage";
import SearchPage from "../Home/SearchPage";
import CategoryListPage from "../Category/CategoryListPage";
import Notice from "@/components/home/Notice";
import { TCategoryList } from "@/types/category";
import { Color } from "@/constants/Theme";
import Banner from "@/components/home/Banner";
import Calendars from "@/components/home/Calendar";
import ContactPage from "../Home/ContactPage";
import HomepagePage from "../Home/HomepagePage";
import SearchResultPage from "../Home/SearchResultPage";
import Department from "@/components/home/Department";
import Keyword from "../Setting/Keyword";
import RegisKeyword from "../Setting/RegisKeyword";
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";

type HomeStackParamList = {
  HomeMain: undefined;
  AlarmPage: undefined;
  SearchPage: undefined;
  CategoryList: undefined;
  ContactPage: undefined;
  HomePage: undefined;
  SearchResultPage: undefined;
  Keyword: undefined;
  RegisKeyword: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// navigation 및 route의 타입 지정
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "HomeMain"
>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, "HomeMain">;
export default function Home({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Keyword" || routeName === "RegisKeyword") {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      // 다른 페이지에서는 탭바 표시
      navigation.setOptions({
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Color.WHITE,
          height: "auto",
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          position: "absolute",
          shadowColor: "#bababa",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 2,
          display: "flex",
        },
      });
    }
  }, [navigation, route]);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AlarmPage"
        component={AlarmPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CategoryList"
        component={CategoryListPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ContactPage"
        component={ContactPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomePage"
        component={HomepagePage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SearchResultPage"
        component={SearchResultPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Keyword"
        component={Keyword}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RegisKeyword"
        component={RegisKeyword}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function HomeMain({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: Color.WHITE }}
      data={[
        {
          key: "header",
          component: (
            <HomeHeader
              navigation={navigation}
              setCategoryNotices={setCategoryNotices}
            />
          ),
        },
        { key: "notice", component: <Notice notices={categoryNotices} /> },
        { key: "banner", component: <Banner /> },
        { key: "calendar", component: <Calendars /> },
        {
          key: "contact",
          component: (
            <Department
              name="부서별 연락처"
              onPress={() => navigation.navigate("ContactPage")}
            />
          ),
        },
        {
          key: "homepage",
          component: (
            <Department
              name="부서별 홈페이지"
              onPress={() => navigation.navigate("HomePage")}
            />
          ),
        },
      ]}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>{item.component}</View>
      )}
      keyExtractor={(item) => item.key}
      ListFooterComponent={<View style={{ height: 80 }} />}
    />
  );
}
