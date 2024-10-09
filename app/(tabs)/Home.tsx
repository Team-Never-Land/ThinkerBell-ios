// // // import { View, FlatList } from "react-native";
// // // import {
// // //   createNativeStackNavigator,
// // //   NativeStackNavigationProp,
// // // } from "@react-navigation/native-stack";
// // // import React, { useState } from "react";
// // // import HomeHeader from "@/components/home/header/HomeHeader";
// // // import AlarmPage from "../Home/AlarmPage";
// // // import SearchPage from "../Home/SearchPage";
// // // import CategoryListPage from "../Category/CategoryListPage";
// // // import Notice from "@/components/home/Notice";
// // // import { TCategoryList } from "@/types/category";
// // // import { Color } from "@/constants/Theme";
// // // import Banner from "@/components/home/Banner";
// // // import Calendars from "@/components/home/Calendar";
// // // import ContactPage from "../Home/ContactPage";
// // // import HomepagePage from "../Home/HomepagePage";
// // // import SearchResultPage from "../Home/SearchResultPage";
// // // import Department from "@/components/home/Department";
// // // import Keyword from "../Setting/Keyword";
// // // import RegisKeyword from "../Setting/RegisKeyword";
// // // import {
// // //   getFocusedRouteNameFromRoute,
// // //   RouteProp,
// // // } from "@react-navigation/native";

// // // type HomeStackParamList = {
// // //   HomeMain: undefined;
// // //   AlarmPage: undefined;
// // //   SearchPage: undefined;
// // //   CategoryList: undefined;
// // //   ContactPage: undefined;
// // //   HomePage: undefined;
// // //   SearchResultPage: undefined;
// // //   Keyword: undefined;
// // //   RegisKeyword: undefined;
// // // };

// // // const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// // // // navigation 및 route의 타입 지정
// // // type HomeScreenNavigationProp = NativeStackNavigationProp<
// // //   HomeStackParamList,
// // //   "HomeMain"
// // // >;
// // // type HomeScreenRouteProp = RouteProp<HomeStackParamList, "HomeMain">;
// // // export default function Home({
// // //   navigation,
// // //   route,
// // // }: {
// // //   navigation: any;
// // //   route: any;
// // // }) {
// // //   React.useLayoutEffect(() => {
// // //     const routeName = getFocusedRouteNameFromRoute(route);
// // //     if (routeName === "Keyword" || routeName === "RegisKeyword") {
// // //       navigation.setOptions({
// // //         tabBarStyle: { display: "none" },
// // //       });
// // //     } else {
// // //       // 다른 페이지에서는 탭바 표시
// // //       navigation.setOptions({
// // //         tabBarStyle: {
// // //           borderTopWidth: 0,
// // //           backgroundColor: Color.WHITE,
// // //           height: "auto",
// // //           borderTopLeftRadius: 27,
// // //           borderTopRightRadius: 27,
// // //           position: "absolute",
// // //           shadowColor: "#bababa",
// // //           shadowOffset: { width: 0, height: -2 },
// // //           shadowOpacity: 0.15,
// // //           shadowRadius: 5,
// // //           elevation: 2,
// // //           display: "flex",
// // //         },
// // //       });
// // //     }
// // //   }, [navigation, route]);

// // //   return (
// // //     <HomeStack.Navigator>
// // //       <HomeStack.Screen
// // //         name="HomeMain"
// // //         component={HomeMain}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="AlarmPage"
// // //         component={(props: any) => (
// // //           <AlarmPage {...props} onUnreadStatusChange={handleUnreadStatus} />
// // //         )}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="SearchPage"
// // //         component={SearchPage}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="CategoryList"
// // //         component={CategoryListPage}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="ContactPage"
// // //         component={ContactPage}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="HomePage"
// // //         component={HomepagePage}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="SearchResultPage"
// // //         component={SearchResultPage}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="Keyword"
// // //         component={Keyword}
// // //         options={{ headerShown: false }}
// // //       />
// // //       <HomeStack.Screen
// // //         name="RegisKeyword"
// // //         component={RegisKeyword}
// // //         options={{ headerShown: false }}
// // //       />
// // //     </HomeStack.Navigator>
// // //   );
// // // }

// // // function HomeMain({ navigation }: { navigation: HomeScreenNavigationProp }) {
// // //   const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]);

// // //   const [hasUnreadNotices, setHasUnreadNotices] = useState<boolean>(false); // 읽지 않은 알림 여부 상태

// // //   // 읽지 않은 알림 상태를 업데이트하는 함수
// // //   const handleUnreadStatus = (status: boolean) => {
// // //     setHasUnreadNotices(status);
// // //   };
// // //   return (
// // //     <FlatList
// // //       style={{ flex: 1, backgroundColor: Color.WHITE }}
// // //       data={[
// // //         {
// // //           key: "header",
// // //           component: (
// // //             <HomeHeader
// // //               navigation={navigation}
// // //               setCategoryNotices={setCategoryNotices}
// // //               hasUnreadNotices={hasUnreadNotices} // 읽지 않은 알림 여부 전달
// // //             />
// // //           ),
// // //         },
// // //         { key: "notice", component: <Notice notices={categoryNotices} /> },
// // //         { key: "banner", component: <Banner /> },
// // //         { key: "calendar", component: <Calendars /> },
// // //         {
// // //           key: "contact",
// // //           component: (
// // //             <Department
// // //               name="부서별 연락처"
// // //               onPress={() => navigation.navigate("ContactPage")}
// // //             />
// // //           ),
// // //         },
// // //         {
// // //           key: "homepage",
// // //           component: (
// // //             <Department
// // //               name="부서별 홈페이지"
// // //               onPress={() => navigation.navigate("HomePage")}
// // //             />
// // //           ),
// // //         },
// // //       ]}
// // //       renderItem={({ item }) => (
// // //         <View style={{ marginBottom: 20 }}>{item.component}</View>
// // //       )}
// // //       keyExtractor={(item) => item.key}
// // //       ListFooterComponent={<View style={{ height: 80 }} />}
// // //     />
// // //   );
// // // }
// // import { View, FlatList } from "react-native";
// // import {
// //   createNativeStackNavigator,
// //   NativeStackNavigationProp,
// // } from "@react-navigation/native-stack";
// // import React, { useState } from "react";
// // import HomeHeader from "@/components/home/header/HomeHeader";
// // import AlarmPage from "../Home/AlarmPage";
// // import SearchPage from "../Home/SearchPage";
// // import CategoryListPage from "../Category/CategoryListPage";
// // import Notice from "@/components/home/Notice";
// // import { TCategoryList } from "@/types/category";
// // import { Color } from "@/constants/Theme";
// // import Banner from "@/components/home/Banner";
// // import Calendars from "@/components/home/Calendar";
// // import ContactPage from "../Home/ContactPage";
// // import HomepagePage from "../Home/HomepagePage";
// // import SearchResultPage from "../Home/SearchResultPage";
// // import Department from "@/components/home/Department";
// // import Keyword from "../Setting/Keyword";
// // import RegisKeyword from "../Setting/RegisKeyword";
// // import {
// //   getFocusedRouteNameFromRoute,
// //   RouteProp,
// // } from "@react-navigation/native";

// // type HomeStackParamList = {
// //   HomeMain: undefined;
// //   AlarmPage: undefined;
// //   SearchPage: undefined;
// //   CategoryList: undefined;
// //   ContactPage: undefined;
// //   HomePage: undefined;
// //   SearchResultPage: undefined;
// //   Keyword: undefined;
// //   RegisKeyword: undefined;
// // };

// // const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// // // navigation 및 route의 타입 지정
// // type HomeScreenNavigationProp = NativeStackNavigationProp<
// //   HomeStackParamList,
// //   "HomeMain"
// // >;
// // type HomeScreenRouteProp = RouteProp<HomeStackParamList, "HomeMain">;

// // export default function Home({
// //   navigation,
// //   route,
// // }: {
// //   navigation: any;
// //   route: any;
// // }) {
// //   // 읽지 않은 알림 여부 상태를 관리하는 상태와 함수
// //   const [hasUnreadNotices, setHasUnreadNotices] = useState<boolean>(false);

// //   // 읽지 않은 알림 상태를 업데이트하는 함수
// //   const handleUnreadStatus = (status: boolean) => {
// //     setHasUnreadNotices(status);
// //   };

// //   // HomeMain 컴포넌트 정의
// //   function HomeMain({ navigation }: { navigation: HomeScreenNavigationProp }) {
// //     const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]);

// //     return (
// //       <FlatList
// //         style={{ flex: 1, backgroundColor: Color.WHITE }}
// //         data={[
// //           {
// //             key: "header",
// //             component: (
// //               <HomeHeader
// //                 navigation={navigation}
// //                 setCategoryNotices={setCategoryNotices}
// //                 hasUnreadNotices={hasUnreadNotices} // 읽지 않은 알림 여부 전달
// //               />
// //             ),
// //           },
// //           { key: "notice", component: <Notice notices={categoryNotices} /> },
// //           { key: "banner", component: <Banner /> },
// //           { key: "calendar", component: <Calendars /> },
// //           {
// //             key: "contact",
// //             component: (
// //               <Department
// //                 name="부서별 연락처"
// //                 onPress={() => navigation.navigate("ContactPage")}
// //               />
// //             ),
// //           },
// //           {
// //             key: "homepage",
// //             component: (
// //               <Department
// //                 name="부서별 홈페이지"
// //                 onPress={() => navigation.navigate("HomePage")}
// //               />
// //             ),
// //           },
// //         ]}
// //         renderItem={({ item }) => (
// //           <View style={{ marginBottom: 20 }}>{item.component}</View>
// //         )}
// //         keyExtractor={(item) => item.key}
// //         ListFooterComponent={<View style={{ height: 80 }} />}
// //       />
// //     );
// //   }

// //   // useLayoutEffect를 사용해 탭바 스타일 설정
// //   React.useLayoutEffect(() => {
// //     const routeName = getFocusedRouteNameFromRoute(route);
// //     if (routeName === "Keyword" || routeName === "RegisKeyword") {
// //       navigation.setOptions({
// //         tabBarStyle: { display: "none" },
// //       });
// //     } else {
// //       // 다른 페이지에서는 탭바 표시
// //       navigation.setOptions({
// //         tabBarStyle: {
// //           borderTopWidth: 0,
// //           backgroundColor: Color.WHITE,
// //           height: "auto",
// //           borderTopLeftRadius: 27,
// //           borderTopRightRadius: 27,
// //           position: "absolute",
// //           shadowColor: "#bababa",
// //           shadowOffset: { width: 0, height: -2 },
// //           shadowOpacity: 0.15,
// //           shadowRadius: 5,
// //           elevation: 2,
// //           display: "flex",
// //         },
// //       });
// //     }
// //   }, [navigation, route]);

// //   return (
// //     <HomeStack.Navigator>
// //       <HomeStack.Screen
// //         name="HomeMain"
// //         component={HomeMain} // HomeMain에서 handleUnreadStatus 사용
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen name="AlarmPage" options={{ headerShown: false }}>
// //         {(props: any) => (
// //           <AlarmPage
// //             {...props}
// //             onUnreadStatusChange={handleUnreadStatus} // 읽지 않은 상태 전달
// //           />
// //         )}
// //       </HomeStack.Screen>

// //       {/* 나머지 스크린들 */}
// //       <HomeStack.Screen
// //         name="SearchPage"
// //         component={SearchPage}
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen
// //         name="CategoryList"
// //         component={CategoryListPage}
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen
// //         name="ContactPage"
// //         component={ContactPage}
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen
// //         name="HomePage"
// //         component={HomepagePage}
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen
// //         name="SearchResultPage"
// //         component={SearchResultPage}
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen
// //         name="Keyword"
// //         component={Keyword}
// //         options={{ headerShown: false }}
// //       />
// //       <HomeStack.Screen
// //         name="RegisKeyword"
// //         component={RegisKeyword}
// //         options={{ headerShown: false }}
// //       />
// //     </HomeStack.Navigator>
// //   );
// // }

// import { View, FlatList } from "react-native";
// import {
//   createNativeStackNavigator,
//   NativeStackNavigationProp,
// } from "@react-navigation/native-stack";
// import React, { useState, useEffect } from "react";
// import HomeHeader from "@/components/home/header/HomeHeader";
// import AlarmPage from "../Home/AlarmPage";
// import SearchPage from "../Home/SearchPage";
// import CategoryListPage from "../Category/CategoryListPage";
// import Notice from "@/components/home/Notice";
// import { TCategoryList } from "@/types/category";
// import { Color } from "@/constants/Theme";
// import Banner from "@/components/home/Banner";
// import Calendars from "@/components/home/Calendar";
// import ContactPage from "../Home/ContactPage";
// import HomepagePage from "../Home/HomepagePage";
// import SearchResultPage from "../Home/SearchResultPage";
// import Department from "@/components/home/Department";
// import Keyword from "../Setting/Keyword";
// import RegisKeyword from "../Setting/RegisKeyword";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   getFocusedRouteNameFromRoute,
//   RouteProp,
// } from "@react-navigation/native";

// type HomeStackParamList = {
//   HomeMain: undefined;
//   AlarmPage: undefined;
//   SearchPage: undefined;
//   CategoryList: undefined;
//   ContactPage: undefined;
//   HomePage: undefined;
//   SearchResultPage: undefined;
//   Keyword: undefined;
//   RegisKeyword: undefined;
// };

// const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// // navigation 및 route의 타입 지정
// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   HomeStackParamList,
//   "HomeMain"
// >;
// type HomeScreenRouteProp = RouteProp<HomeStackParamList, "HomeMain">;

// export default function Home({
//   navigation,
//   route,
// }: {
//   navigation: any;
//   route: any;
// }) {
//   const [hasUnreadNotices, setHasUnreadNotices] = useState<boolean>(false); // 읽지 않은 알림 여부 상태

//   // // 모든 카테고리에서 읽지 않은 공지를 확인하는 함수
//   // const checkAllUnreadNotices = async () => {
//   //   const categories = ["키워드", "입사신청", "장학금", "공모전"]; // 확인할 카테고리
//   //   let hasUnread = false;

//   //   for (const category of categories) {
//   //     const viewedNotices = await getViewedNotices(category); // 해당 카테고리의 읽음 상태 확인
//   //     const unreadNotices = viewedNotices.filter((notice: any) => !notice.read);

//   //     if (unreadNotices.length > 0) {
//   //       hasUnread = true; // 하나라도 읽지 않은 공지가 있으면 상태를 true로 설정
//   //       break; // 하나라도 있으면 더 이상 확인하지 않고 중단
//   //     }
//   //   }

//   //   setHasUnreadNotices(hasUnread); // 읽지 않은 공지 상태 업데이트
//   // };

//   // // 앱이 처음 로드될 때 읽지 않은 공지를 확인
//   // useEffect(() => {
//   //   checkAllUnreadNotices(); // 앱 로드 시 모든 카테고리의 알림을 확인
//   // }, []);

//   function HomeMain({ navigation }: { navigation: HomeScreenNavigationProp }) {
//     const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]);

//     return (
//       <FlatList
//         style={{ flex: 1, backgroundColor: Color.WHITE }}
//         data={[
//           {
//             key: "header",
//             component: (
//               <HomeHeader
//                 navigation={navigation}
//                 setCategoryNotices={setCategoryNotices}
//                 hasUnreadNotices={hasUnreadNotices} // 읽지 않은 알림 여부 전달
//               />
//             ),
//           },
//           { key: "notice", component: <Notice notices={categoryNotices} /> },
//           { key: "banner", component: <Banner /> },
//           { key: "calendar", component: <Calendars /> },
//           {
//             key: "contact",
//             component: (
//               <Department
//                 name="부서별 연락처"
//                 onPress={() => navigation.navigate("ContactPage")}
//               />
//             ),
//           },
//           {
//             key: "homepage",
//             component: (
//               <Department
//                 name="부서별 홈페이지"
//                 onPress={() => navigation.navigate("HomePage")}
//               />
//             ),
//           },
//         ]}
//         renderItem={({ item }) => (
//           <View style={{ marginBottom: 20 }}>{item.component}</View>
//         )}
//         keyExtractor={(item) => item.key}
//         ListFooterComponent={<View style={{ height: 80 }} />}
//       />
//     );
//   }
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     checkAllUnreadNotices();
//   //   }, 5000); // 5초마다 체크
//   //   return () => clearInterval(interval);
//   // }, []);
//   // useLayoutEffect를 사용해 탭바 스타일 설정
//   React.useLayoutEffect(() => {
//     const routeName = getFocusedRouteNameFromRoute(route);
//     if (routeName === "Keyword" || routeName === "RegisKeyword") {
//       navigation.setOptions({
//         tabBarStyle: { display: "none" },
//       });
//     } else {
//       // 다른 페이지에서는 탭바 표시
//       navigation.setOptions({
//         tabBarStyle: {
//           borderTopWidth: 0,
//           backgroundColor: Color.WHITE,
//           height: "auto",
//           borderTopLeftRadius: 27,
//           borderTopRightRadius: 27,
//           position: "absolute",
//           shadowColor: "#bababa",
//           shadowOffset: { width: 0, height: -2 },
//           shadowOpacity: 0.15,
//           shadowRadius: 5,
//           elevation: 2,
//           display: "flex",
//         },
//       });
//     }
//   }, [navigation, route]);

//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="HomeMain"
//         component={HomeMain} // HomeMain에서 handleUnreadStatus 사용
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen name="AlarmPage" options={{ headerShown: false }}>
//         {(props: any) => (
//           <AlarmPage
//             {...props}
//             onUnreadStatusChange={setHasUnreadNotices} // 읽지 않은 상태 전달
//           />
//         )}
//       </HomeStack.Screen>

//       {/* 나머지 스크린들 */}
//       <HomeStack.Screen
//         name="SearchPage"
//         component={SearchPage}
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen
//         name="CategoryList"
//         component={CategoryListPage}
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen
//         name="ContactPage"
//         component={ContactPage}
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen
//         name="HomePage"
//         component={HomepagePage}
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen
//         name="SearchResultPage"
//         component={SearchResultPage}
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen
//         name="Keyword"
//         component={Keyword}
//         options={{ headerShown: false }}
//       />
//       <HomeStack.Screen
//         name="RegisKeyword"
//         component={RegisKeyword}
//         options={{ headerShown: false }}
//       />
//     </HomeStack.Navigator>
//   );
// }

// // 각 카테고리의 읽음 상태를 확인하는 함수
// const getViewedNotices = async (category: string) => {
//   const storageKey = `${category}_viewed`;
//   const existingNotices = await AsyncStorage.getItem(storageKey);
//   return existingNotices ? JSON.parse(existingNotices) : [];
// };
import { View, FlatList } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [hasUnreadNotices, setHasUnreadNotices] = useState<boolean>(false); // 읽지 않은 알림 여부 상태

  // 모든 카테고리에서 읽지 않은 공지를 확인하는 함수
  // const checkAllUnreadNotices = async () => {
  //   const categories = ["키워드", "입사신청", "장학금", "공모전"];
  //   let hasUnread = false;

  //   for (const category of categories) {
  //     const viewedNotices = await getViewedNotices(category); // 각 카테고리 읽음 상태 확인
  //     console.log(`카테고리 ${category} 불러온 읽음 상태:`, viewedNotices);

  //     // 필터링된 공지의 읽음 상태 확인
  //     const unreadNotices = viewedNotices.filter((notice: any) => !notice.read); // read가 false인 공지 필터링
  //     console.log(
  //       `카테고리: ${category}, 읽지 않은 공지 개수: ${unreadNotices.length}`
  //     );

  //     if (unreadNotices.length > 0) {
  //       hasUnread = true;
  //       break; // 하나라도 읽지 않은 공지가 있으면 중단
  //     }
  //   }

  //   // 상태가 변경될 때만 업데이트
  //   if (hasUnread !== hasUnreadNotices) {
  //     setHasUnreadNotices(hasUnread);
  //     console.log(`Unread Notices Status(home.tsx): ${hasUnread}`); // 읽지 않은 상태 업데이트
  //   }
  // };

  // // 5초마다 공지 확인
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     checkAllUnreadNotices(); // 주기적으로 읽지 않은 공지 확인
  //   }, 5000); // 5초마다 체크

  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
  // }, []);

  // HomeMain 컴포넌트 정의
  function HomeMain({ navigation }: { navigation: HomeScreenNavigationProp }) {
    const [categoryNotices, setCategoryNotices] = useState<TCategoryList[]>([]);
    // 모든 카테고리에서 읽지 않은 공지를 확인하는 함수
    const checkAllUnreadNotices = async () => {
      const categories = ["키워드", "입사신청", "장학금", "공모전"]; // 카테고리 리스트
      let unreadExists = false;

      // 모든 카테고리에서 읽지 않은 공지를 체크
      for (const category of categories) {
        const viewedNotices = await getViewedNotices(category); // 해당 카테고리의 읽음 상태 불러오기
        const unreadNotices = viewedNotices.filter(
          (notice: any) => !notice.read
        ); // 읽지 않은 공지 필터링
        console.log("체크할 부분 : ", unreadExists);
        if (unreadNotices != 0) {
          console.log("unreadExists:", unreadExists);
          unreadExists = true; // 하나라도 읽지 않은 공지가 있으면 true로 설정
          console.log("unreadExists2:", unreadExists);
          break; // 하나라도 있으면 더 이상 확인하지 않고 중단
        }
      }

      setHasUnreadNotices(unreadExists); // 읽지 않은 공지 여부 상태 업데이트
    };

    // useEffect를 사용해 첫 로드 시 모든 카테고리의 읽지 않은 공지 확인
    useEffect(() => {
      if (categoryNotices.length > 0) {
        checkAllUnreadNotices();
      }
    }, [categoryNotices]); // categoryNotices 변경 시에만 다시 체크

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
                hasUnreadNotices={hasUnreadNotices} // 읽지 않은 알림 여부 전달
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

  // useLayoutEffect를 사용해 탭바 스타일 설정
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
        component={HomeMain} // HomeMain에서 handleUnreadStatus 사용
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="AlarmPage" options={{ headerShown: false }}>
        {(props: any) => (
          <AlarmPage
            {...props}
            onUnreadStatusChange={setHasUnreadNotices} // 읽지 않은 상태 전달
          />
        )}
      </HomeStack.Screen>

      {/* 나머지 스크린들 */}
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

// // 각 카테고리의 읽음 상태를 확인하는 함수
// const getViewedNotices = async (category: string) => {
//   const storageKey = `${category}_viewed`;
//   const existingNotices = await AsyncStorage.getItem(storageKey);
//   console.log(`불러온 읽음 상태 (카테고리 ${category}): ${existingNotices}`); // 로그 추가

//   return existingNotices ? JSON.parse(existingNotices) : [];
// };
// 각 카테고리의 읽음 상태를 확인하는 함수

const getViewedNotices = async (category: string) => {
  const storageKey = `${category}_viewed`;
  const existingNotices = await AsyncStorage.getItem(storageKey);

  if (!existingNotices) {
    return []; // 비어 있으면 빈 배열 반환
  }

  console.log(`불러온 읽음 상태 (카테고리 ${category}): ${existingNotices}`); // 각 카테고리마다 로그 출력
  return JSON.parse(existingNotices);
};
