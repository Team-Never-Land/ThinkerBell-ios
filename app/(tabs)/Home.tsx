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
import Department from "@/components/home/Department";
const HomeStack = createNativeStackNavigator();

export default function Home() {
  return (
    <HomeStack.Navigator>
      {/* HomeHeader가 있는 홈 화면 */}
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ headerShown: false }}
      />
      {/* AlarmPage와 SearchPage는 새로운 페이지로 전체 화면에 뜸 */}
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
    </HomeStack.Navigator>
  );
}

// 메인 홈 화면 컴포넌트
// function HomeMain({ navigation }: { navigation: any }) {
//   const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]); // 공지사항 상태

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: Color.WHITE }}
//       contentContainerStyle={{ paddingBottom: 80 }} // 탭바 영역 고려
//     >
//       <HomeHeader
//         navigation={navigation}
//         setCategoryNotices={setCategoryNotices}
//       />
//       {/* 홈 화면의 다른 컴포넌트 */}
//       <Notice notices={categoryNotices} />
//       <Banner />
//       <Calendars />
//     </ScrollView>
//   );
// }
function HomeMain({ navigation }: { navigation: any }) {
  const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]);
  const navigateToContactPage = () => {
    navigation.navigate("ContactPage");
  };

  const navigateToHomepagePage = () => {
    navigation.navigate("HomePage");
  };

  const componentsData = [
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
        <Department name="부서별 연락처" onPress={navigateToContactPage} />
      ),
    },
    {
      key: "homepage",
      component: (
        <Department name="부서별 홈페이지" onPress={navigateToHomepagePage} />
      ),
    },
  ];

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: Color.WHITE }}
      data={componentsData}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>{item.component}</View>
      )}
      keyExtractor={(item) => item.key}
      ListFooterComponent={<View style={{ height: 80 }} />} // 탭바를 위한 공간
    />
  );
}
