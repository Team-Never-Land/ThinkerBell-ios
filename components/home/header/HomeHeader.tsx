import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  Touchable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Font } from "@/constants/Theme";
import BelloffIcon from "../../../assets/images/icon/Topbar/Bell-Off.svg";
import BellonIcon from "../../../assets/images/icon/Topbar/Bell-On.svg";

import SearchIcon from "../../../assets/images/icon/Topbar/Search.svg";
import MenuIcon from "../../../assets/images/icon/Underbar/Menu.svg";
import LogoIcon from "@/assets/images/icon/Logo.svg";
import { dummyCategorySearch } from "@/assets/data/dummyCategory"; // 더미 데이터 가져오기
import { TCategoryKey, TCategoryList, TCategorySearch } from "@/types/category";
import { ScrollView } from "react-native-gesture-handler";
import {
  getNormalNotice,
  getAcademicNotice,
  getEventNotice,
  getScholarshipNotice,
  getCareerNotice,
} from "@/service/getNotice";
import { getCheckAllUnreadAlarms } from "@/service/alarm/getCheckAllUnreadAlarms";
import { useFocusEffect } from "expo-router";

export default function HomeHeader({
  navigation,
  setCategoryNotices,
}: {
  navigation: any;
  setCategoryNotices: React.Dispatch<React.SetStateAction<any[]>>; // TCategoryList[] 대신 any[]
}) {
  const categories = ["일반", "행사", "학사", "장학", "취업"];
  const { top } = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>("일반"); // 선택된 카테고리 상태
  const [hasUnreadNotices, setHasUnreadNotices] = useState<boolean>(false); // 미확인 알람 여부 상태

  const checkUnreadAlarms = async () => {
    try {
      const hasUnread = await getCheckAllUnreadAlarms(); // API 호출
      setHasUnreadNotices(hasUnread); // 미확인 알람 상태 업데이트
    } catch (error) {
      console.error("Error checking unread alarms:", error);
    }
  };
  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    let notices;

    try {
      if (category === "일반") {
        notices = await getNormalNotice(0);
      } else if (category === "행사") {
        notices = await getEventNotice(0);
      } else if (category === "학사") {
        notices = await getAcademicNotice(0);
      } else if (category === "장학") {
        notices = await getScholarshipNotice(0);
      } else if (category === "취업") {
        notices = await getCareerNotice(0);
      }

      // notices가 배열이 아닐 경우 배열로 변환
      if (notices && Array.isArray(notices.data.items)) {
        const sortedNotices = notices.data.items.sort((a, b) => {
          const dateA = new Date(a.pubDate);
          const dateB = new Date(b.pubDate);
          return dateB.getTime() - dateA.getTime(); // 최신 순으로 정렬
        });

        setCategoryNotices(sortedNotices.slice(0, 3)); // 상위 3개의 공지사항만 표시
      } else {
        setCategoryNotices([]); // 빈 배열로 초기화
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
      setCategoryNotices([]); // 오류 발생 시 빈 배열로 설정
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const initialNotices = await getNormalNotice(1);
        if (initialNotices && Array.isArray(initialNotices)) {
          setCategoryNotices(initialNotices);
        }
      } catch (error) {
        console.error("Error fetching initial notices:", error);
        setCategoryNotices([]); // 오류 발생 시 빈 배열로 설정
      }
    };
    initialFetch();
  }, [setCategoryNotices]);

  useEffect(() => {
    handleCategorySelect("일반");
  }, []);

  // hasUnreadNotices 값이 변경될 때마다 로그 출력
  useEffect(() => {
    checkUnreadAlarms();
    const interval = setInterval(checkUnreadAlarms, 60000); // 60초마다 체크
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );

  return (
    <>
      {/* Safe Area Inset */}
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>

      {/* Status Bar */}
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />

      {/* Header Content */}
      <View
        style={{
          position: "relative",
          height: 140,
          width: "100%",
          backgroundColor: Color.BLUE,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: "7.22%",
            right: "7.22%",
            top: "31.43%",
            bottom: "51.43%",
            alignItems: "center", // 수평 중앙 정렬
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LogoIcon />

          {/* 벨 아이콘 */}
          <Pressable
            onPress={() => navigation.navigate("AlarmPage")}
            style={{
              position: "absolute",
              left: "79.55%",
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hasUnreadNotices ? <BellonIcon /> : <BelloffIcon />}
          </Pressable>

          {/* 서치 아이콘 */}
          <Pressable
            style={{
              position: "absolute",
              left: "92.21%", // 92.21% 좌측
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              console.log("search"), navigation.navigate("SearchPage");
            }}
          >
            <SearchIcon />
          </Pressable>
        </View>

        <View
          style={{
            height: 34,
            left: 20,
            top: 93.5,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 40,
              alignItems: "center",
            }}
          >
            {categories.map((category, index) => (
              <Pressable
                key={index}
                onPress={() => handleCategorySelect(category)}
                style={{
                  marginRight: 38, // 카테고리 간 간격 설정
                }}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === category
                        ? Color.WHITE
                        : Color.Grey[1],
                    ...Font.Label.Medium,
                  }}
                >
                  {category}
                </Text>
                {/* 하단 강조선 - 수정 필요 */}
                {selectedCategory === category && (
                  <View
                    style={{
                      width: 27,
                      borderRadius: 1, // 모서리 반경 설정
                      borderWidth: 1,
                      borderColor: Color.WHITE, // 테두리 색상
                      opacity: 1, // 강조선의 투명도 설정
                      marginTop: -2,
                    }}
                  />
                )}
              </Pressable>
            ))}

            {/* 메뉴 아이콘 */}
            <Pressable
              onPress={() => {
                console.log("category");
                navigation.navigate("CategoryList");
              }} // 카테고리 페이지로 이동
            >
              <MenuIcon color={Color.Grey[1]} />
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
