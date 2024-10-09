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

export default function HomeHeader({
  navigation,
  setCategoryNotices,
  hasUnreadNotices,
}: {
  navigation: any;
  setCategoryNotices: React.Dispatch<React.SetStateAction<TCategoryList[]>>;
  hasUnreadNotices: boolean;
}) {
  const categories = ["일반", "행사", "학사", "장학", "취업"];
  const { top } = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>("일반"); // 선택된 카테고리 상태

  const keyMap: { [key: string]: TCategoryKey } = {
    일반: "NormalNotice",
    행사: "EventNotice",
    학사: "AcademicNotice",
    장학: "ScholarshipNotice",
    취업: "CareerNotice",
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const categoryKey: TCategoryKey = keyMap[category]; // keyMap에서 카테고리 키 추출
    const notices = dummyCategorySearch[categoryKey]?.slice(0, 3) || []; // 해당 카테고리의 최신 3개의 공지 가져오기
    setCategoryNotices(notices);
  };
  useEffect(() => {
    const initialNotices =
      dummyCategorySearch["NormalNotice"]?.slice(0, 3) || [];
    setCategoryNotices(initialNotices);
  }, []);
  // hasUnreadNotices 값이 변경될 때마다 로그 출력
  useEffect(() => {
    console.log("Unread Notices Status(homeheader):", hasUnreadNotices);
  }, [hasUnreadNotices]);
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
              <MenuIcon fill={Color.Grey[1]} />
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
