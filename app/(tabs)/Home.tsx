import { View, FlatList } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const HomeStack = createNativeStackNavigator();

export default function Home() {
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
    </HomeStack.Navigator>
  );
}

function HomeMain({ navigation }: { navigation: any }) {
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
