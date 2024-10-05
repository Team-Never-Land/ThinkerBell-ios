import { View, Text, StatusBar, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TCategoryKey, TCategoryList } from "@/types/category";
import { dummyCategorySearch } from "@/assets/data/dummyCategory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DotIcon from "../../../assets/images/icon/Etc/Dot.svg";
import LogoIcon from "@/assets/images/icon/Logo.svg";

export default function AlarmHeader({
  onFilterNotices,
  navigation,
}: {
  onFilterNotices: (notices: TCategoryList[], category: string) => void;
  navigation: any;
}) {
  const { top } = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>("키워드"); // 선택된 카테고리 상태
  const [unreadCategories, setUnreadCategories] = useState<{
    [key: string]: boolean;
  }>({
    키워드: false,
    입사신청: false,
    장학금: false,
    공모전: false,
  }); // 카테고리별 읽지 않은 공지 상태
  const [savedKeywords, setSavedKeywords] = useState<string[]>([]); // AsyncStorage에서 불러온 키워드 저장

  const categories = ["키워드", "입사신청", "장학금", "공모전"];
  const keyMap: { [key: string]: TCategoryKey | string } = {
    키워드: "keyword",
    입사신청: "DormitoryEntryNotice",
    장학금: "ScholarshipNotice",
    공모전: "CompetitionNotice",
  };

  // 카테고리별로 빨간 점의 위치를 정의
  const dotPositions: { [key: string]: number } = {
    키워드: 45,
    입사신청: 60,
    장학금: 45,
    공모전: 45,
  };

  // 읽음 상태 확인
  const checkUnreadNotices = async (
    category: string,
    notices: TCategoryList[]
  ) => {
    const storageKey = `${category}_viewed`;
    let viewedNotices = await getNoticesArray(storageKey);

    // 중복 제거 및 상태 출력
    viewedNotices = [...new Set(viewedNotices)];
    console.log(`불러온 읽음 상태: ${viewedNotices.join(",")}`);

    // 기존 필터링된 데이터를 기반으로 읽음 상태를 계산
    const unreadNotices = notices.filter(
      (notice) => !viewedNotices.includes(notice.id)
    );

    console.log(
      `카테고리: ${category}, 총 공지 개수: ${notices.length}, 읽지 않은 공지 개수: ${unreadNotices.length}`
    );

    // 읽지 않은 공지가 있으면 상태 업데이트
    setUnreadCategories((prev) => ({
      ...prev,
      [category]: unreadNotices.length > 0,
    }));
  };

  const loadSavedKeywords = async () => {
    try {
      const storedKeywords = await AsyncStorage.getItem("keywords");
      if (storedKeywords) {
        setSavedKeywords(JSON.parse(storedKeywords));
      } else {
        setSavedKeywords([]); // 저장된 키워드가 없을 경우 빈 배열
      }
    } catch (error) {
      console.error("저장된 키워드 불러오기 오류:", error);
    }
  };
  useEffect(() => {
    loadSavedKeywords(); // 컴포넌트가 마운트될 때 키워드 로드
  }, []);
  const getNoticesArray = async (key: string) => {
    try {
      const existingNotices = await AsyncStorage.getItem(key);
      return existingNotices ? JSON.parse(existingNotices) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getCategoryName = (key: TCategoryKey | string) => {
    switch (key) {
      case "NormalNotice":
        return "[일반공지]";
      case "AcademicNotice":
        return "[학사공지]";
      case "EventNotice":
        return "[행사공지]";
      case "ScholarshipNotice":
        return "[장학/학자금공지]";
      case "CareerNotice":
        return "[진로/취업/창업공지]";
      case "StudentActsNotice":
        return "[학생활동공지]";
      case "BiddingNotice":
        return "[입찰공지]";
      case "SafetyNotice":
        return "[대학안전공지]";
      case "RevisionNotice":
        return "[학칙개정 사전공고]";
      case "DormitoryNotice":
        return "[생활관] 공지사항";
      case "DormitoryEntryNotice":
        return "[생활관] 입퇴사 공지사항";
      case "LibraryNotice":
        return "[도서관] 공지사항";
      case "TeachingNotice":
        return "[교직] 공지사항";
      default:
        return "[기타공지]";
    }
  };

  const filterByKeywords = (keywords: string[]) => {
    const results: TCategoryList[] = [];

    Object.keys(dummyCategorySearch).forEach((key) => {
      const categoryKey = key as TCategoryKey;
      const notices = dummyCategorySearch[categoryKey] || [];

      keywords.forEach((keyword) => {
        const filteredNotices = notices.filter((notice) =>
          notice.title.includes(keyword)
        );

        results.push(...filteredNotices);
      });
    });

    return results;
  };

  const handleCategorySelect = async (category: string) => {
    let notices: TCategoryList[] = [];
    let categoryKey = `notice_${category}`;

    // 키워드 및 공모전 필터링
    if (category === "키워드") {
      notices = filterByKeywords(savedKeywords);
      categoryKey = `키워드`;
    } else if (category === "공모전") {
      notices = filterByKeywords(["공모전"]);
      categoryKey = `공모전`;
    } else if (category === "입사신청" || category === "장학금") {
      const categoryKeyFromMap = keyMap[category] as TCategoryKey;
      notices = dummyCategorySearch[categoryKeyFromMap] || [];
      categoryKey = category;
    }

    // 공지를 올바르게 가져온 경우에만 처리
    if (notices.length === 0) {
      console.log(`카테고리 ${category}에 필터링된 공지가 없습니다.`);
      setSelectedCategory(category);
      onFilterNotices([], category);
      return; // 빈 결과일 때 필터링 로직 종료
    }

    const storageKey = `${categoryKey}_viewed`;
    const viewedNotices = await getNoticesArray(storageKey);

    const updatedNotices = notices.map((notice) => ({
      ...notice,
      read: viewedNotices.includes(notice.id),
    }));

    const hasUnread = updatedNotices.some((notice) => !notice.read);

    setUnreadCategories((prev) => ({
      ...prev,
      [category]: hasUnread,
    }));

    // 필터링된 공지 개수와 읽지 않은 공지 개수 출력
    console.log(
      `카테고리: ${category}, 필터링된 공지 개수: ${
        updatedNotices.length
      }, 읽지 않은 공지 개수: ${updatedNotices.filter((n) => !n.read).length}`
    );

    setSelectedCategory(category);
    onFilterNotices(updatedNotices, category);
  };

  useEffect(() => {
    const checkAllCategories = async () => {
      // 모든 카테고리를 순회하며 읽지 않은 공지를 체크
      for (const category of categories) {
        const categoryKeyFromMap = keyMap[category] as TCategoryKey;
        const notices = dummyCategorySearch[categoryKeyFromMap] || [];

        if (notices.length > 0) {
          await checkUnreadNotices(category, notices); // 각 카테고리별 읽지 않은 공지 체크
        }
      }
    };

    checkAllCategories(); // 페이지 로드 시 모든 카테고리의 읽지 않은 공지를 탐지

    const interval = setInterval(checkAllCategories, 3000); // 3초마다 다시 체크
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  useEffect(() => {
    handleCategorySelect(selectedCategory);
  }, []);

  const saveViewedNotice = async (category: string, noticeId: number) => {
    const storageKey = `${category}_viewed`;
    let viewedNotices = await getNoticesArray(storageKey);

    // 중복된 공지 ID가 추가되지 않도록 확인
    if (!viewedNotices.includes(noticeId)) {
      viewedNotices.push(noticeId);
      await AsyncStorage.setItem(storageKey, JSON.stringify(viewedNotices));
      console.log(`공지 ${noticeId} 읽음 상태 저장됨: ${viewedNotices}`);
    }
  };

  const handleNoticeClick = async (category: string, noticeId: number) => {
    // 공지를 클릭했을 때 읽음 상태로 저장
    await saveViewedNotice(category, noticeId);

    // 클릭 후 읽지 않은 공지 상태 다시 확인
    let notices: TCategoryList[] =
      dummyCategorySearch[keyMap[category] as TCategoryKey] || [];
    await checkUnreadNotices(category, notices);
  };

  return (
    <>
      <View
        style={{
          height: top,
          backgroundColor: Color.BLUE,
        }}
      ></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          position: "relative",
          height: 185,
          width: "100%",
          backgroundColor: Color.BLUE,
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            marginTop: 50,
          }}
        >
          <LogoIcon
            width={28}
            height={22}
            onPress={() => navigation.navigate("HomeMain")}
          />
        </View>
        <View
          style={{
            position: "absolute",
            width: 58,
            height: 51,
            alignSelf: "center",
            marginTop: 75,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Font.Label.XL,
              color: Color.WHITE,
              textAlign: "center",
            }}
          >
            알림
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 40,
            position: "absolute",
            width: 342,
            height: 40,
            left: "50%",
            transform: [{ translateX: -171 }],
            top: 134,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {categories.map((category, index) => (
              <Pressable
                key={index}
                onPress={() => handleCategorySelect(category)}
                style={{
                  marginRight: 40,
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

                {unreadCategories[category] && (
                  <DotIcon
                    style={{
                      position: "absolute",
                      top: 0,
                      left: dotPositions[category], // 카테고리별 빨간 점 위치 지정
                    }}
                  />
                )}
                {selectedCategory === category && (
                  <View
                    style={{
                      width: category === "입사신청" ? 55 : 42,
                      borderRadius: 1,
                      borderWidth: 1,
                      borderColor: Color.WHITE,
                      opacity: 1,
                      marginTop: -2,
                    }}
                  />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* 공지사항 리스트 부분 */}
      <View>
        {dummyCategorySearch[keyMap[selectedCategory] as TCategoryKey]?.map(
          (notice) => (
            <Pressable
              key={notice.id}
              onPress={() => handleNoticeClick(selectedCategory, notice.id)}
            ></Pressable>
          )
        )}
      </View>
    </>
  );
}
