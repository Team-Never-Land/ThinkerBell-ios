import { View, Text, StatusBar, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TCategoryKey, TCategoryList } from "@/types/category";
import { dummyCategorySearch } from "@/assets/data/dummyCategory";
import DotIcon from "../../../assets/images/icon/Etc/Dot.svg";
import LogoIcon from "@/assets/images/icon/Logo.svg";
import * as Notifications from "expo-notifications";
import { getKeywords } from "@/service/keyword/getKeywords";
import { getNoticesByKeyword } from "@/service/alarm/getNoticesByKeyword";
import CategoryItem from "@/components/category/CategoryItem";
import AlarmCategoryItem from "../AlarmCategoryItem";
import { getCheckUnreadAlarmByKeyword } from "@/service/alarm/getCheckUnreadAlarmByKeyword";
import { useFocusEffect } from "expo-router";

// NoticeItem 타입 정의
type NoticeItem = {
  id: number;
  title: string;
  noticeTypeKorean: string;
  noticeTypeEnglish: string;
  pubDate: string;
  viewed: boolean;
  url: string;
  marked: boolean;
};

export default function AlarmHeader({
  navigation,
  onFilterNotices,
  updateUnreadStatus,
}: {
  navigation: any;
  onFilterNotices: (notices: NoticeItem[]) => void;
  updateUnreadStatus: (unreadKeywords: { [key: string]: boolean }) => void;
}) {
  const { top } = useSafeAreaInsets();
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [unreadKeywords, setUnreadKeywords] = useState<{
    [key: string]: boolean;
  }>({});
  const [filteredNotices, setFilteredNotices] = useState<NoticeItem[]>([]); // 필터링된 공지사항 목록

  const [keywords, setKeywords] = useState<string[]>([]); // 서버에서 가져온 키워드 목록

  const loadKeywordsAndCheckAlarms = async () => {
    try {
      const keywordList = await getKeywords(); // API에서 키워드 목록 가져오기
      const extractedKeywords = keywordList.map(
        (item: { keyword: string }) => item.keyword
      );
      setKeywords(extractedKeywords); // 가져온 키워드를 상태로 저장
      if (extractedKeywords.length > 0) {
        setSelectedKeyword(extractedKeywords[0]); // 첫 번째 키워드를 기본 선택값으로 설정
        const notices = await filterNoticesByKeyword(extractedKeywords[0]); // 첫 번째 키워드로 공지 필터링
        onFilterNotices(notices); // 필터링된 공지사항 전달
      }
      // 각 키워드에 대해 미확인 알람 확인
      const unreadStatus: { [key: string]: boolean } = {};
      for (const keyword of extractedKeywords) {
        const hasUnread = await getCheckUnreadAlarmByKeyword(keyword); // API 호출로 미확인 알람 여부 확인
        unreadStatus[keyword] = hasUnread;
      }
      setUnreadKeywords(unreadStatus); // 키워드별 읽지 않은 알림 상태 설정
      updateUnreadStatus(unreadStatus);
    } catch (error) {
      console.error("Error loading keywords or checking unread alarms:", error);
    }
  };

  // const updateUnreadStatus = async (keyword: string) => {
  //   const hasUnread = await getCheckUnreadAlarmByKeyword(keyword);
  //   setUnreadKeywords((prevStatus) => ({
  //     ...prevStatus,
  //     [keyword]: hasUnread, // 해당 키워드의 읽음 상태 즉시 반영
  //   }));
  // };

  const handleKeywordSelect = async (keyword: string) => {
    setSelectedKeyword(keyword);
    // 키워드로 공지사항 필터링 후 상위 컴포넌트로 전달
    const notices = await filterNoticesByKeyword(keyword);
    onFilterNotices(notices);
  };
  useEffect(() => {
    loadKeywordsAndCheckAlarms(); // 컴포넌트가 마운트될 때 키워드 목록 로드
  }, [keywords]);

  const filterNoticesByKeyword = async (keyword: string) => {
    try {
      const notices = await getNoticesByKeyword(keyword); // 서버에서 해당 키워드로 공지사항 조회
      return notices; // 필터링된 공지를 반환
    } catch (error) {
      console.error("Error filtering notices by keyword:", error);
      return [];
    }
  };
  // async function sendPushNotification(
  //   token: string,
  //   keyword: string,
  //   title: string,
  //   category: string
  // ) {
  //   const message = {
  //     to: token,
  //     sound: "default",
  //     title: `띵~🔔 **${keyword}**와(과) 관련한 공지가 올라왔어요!`,
  //     body: `[${category}] ${title.slice(0, 50)}...`, // 공지 제목 50자까지 표시
  //     data: { someData: "goes here" },
  //   };

  //   console.log("푸시 알림 전송 준비:", message);

  //   const response = await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  //   const data = await response.json();
  //   console.log("푸시 알림 응답:", data);
  // }
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );

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
            {keywords.map((keyword, index) => (
              <Pressable
                key={index}
                onPress={() => handleKeywordSelect(keyword)}
                style={{
                  marginRight: 40,
                  borderBottomWidth: selectedKeyword === keyword ? 2 : 0, // 선택된 키워드만 밑줄
                  borderBottomColor: Color.WHITE,
                  marginTop: selectedKeyword === keyword ? 3 : 0,
                }}
              >
                <Text
                  style={{
                    borderBottomWidth: selectedKeyword === keyword ? 1 : 0,
                    borderBottomColor: Color.WHITE,
                    color:
                      selectedKeyword === keyword ? Color.WHITE : Color.Grey[1],
                    ...Font.Label.Medium,
                  }}
                >
                  {keyword}
                </Text>

                {unreadKeywords[keyword] && ( // 읽지 않은 알림이 있으면 빨간 점 표시
                  <DotIcon
                    style={{
                      position: "absolute",
                      top: 0,
                      right: -5,
                    }}
                  />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
