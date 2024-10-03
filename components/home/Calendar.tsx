import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Color, Font } from "@/constants/Theme";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
import LeftArrowIcon from "../../assets/images/icon/Arrow/Before.svg";
import RightArrowIcon from "../../assets/images/icon/Arrow/Next.svg";
import { Direction } from "react-native-calendars/src/types";
import { dummyCategorySearch } from "@/assets/data/dummyCategory";
import AcademicList from "./AcademicList";
LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

export default function Calendars() {
  const [currentMonth, setCurrentMonth] = useState(""); // 현재 달력에 표시된 월
  const [filteredNotices, setFilteredNotices] = useState(
    dummyCategorySearch?.AcademicNotice || []
  ); // 필터링된 학사 일정 상태

  // 달력의 현재 월을 가져와 필터링하기 위한 함수
  //   const handleMonthChange = (month: any) => {
  //     const formattedMonth = `${month.year}-${String(month.month).padStart(
  //       2,
  //       "0"
  //     )}`;
  //     setCurrentMonth(formattedMonth);
  //   };
  const academicNotices = dummyCategorySearch?.AcademicNotice || [];

  //   // 해당 월의 학사 일정 필터링
  //   const filteredNotices = academicNotices.filter((notice) =>
  //     notice.pubDate.startsWith(currentMonth)
  //   );
  // 현재 달에 맞는 학사 일정 필터링
  const filterAcademicNotices = (month: string) => {
    const academicNotices = dummyCategorySearch?.AcademicNotice || [];
    return academicNotices.filter((notice) => notice.pubDate.startsWith(month));
  };
  // 오늘 날짜 기준으로 현재 월을 설정하는 함수
  const getCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
    return `${year}-${month}`;
  };
  useEffect(() => {
    const initialMonth = getCurrentMonth();
    setCurrentMonth(initialMonth);
    setFilteredNotices(filterAcademicNotices(initialMonth)); // 처음 로드 시 필터링
  }, []);
  // 달이 변경되었을 때 호출
  const handleMonthChange = (month: any) => {
    const formattedMonth = `${month.year}-${String(month.month).padStart(
      2,
      "0"
    )}`;
    setCurrentMonth(formattedMonth);
    setFilteredNotices(filterAcademicNotices(formattedMonth)); // 변경된 달에 맞는 학사 일정 필터링
  };

  const getKoreanToday = () => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // UTC에서 한국 시간으로 변환 (UTC + 9)
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getKoreanToday();

  const markedDates = academicNotices.reduce((acc, notice) => {
    acc[notice.pubDate] = {
      //추후 수정해야함
      selected: true,
      selectedColor: Color.BLUE,
    };
    return acc;
  }, {} as { [key: string]: any });

  markedDates[today] = {
    marked: true, // 오늘 날짜에 작은 점 표시
    selected: true,
    dotColor: Color.BLUE, // 점 색상
    selectedColor: "transparent",
    selectedTextColor: Color.Grey[2],
  };

  return (
    <View>
      <Text
        style={{
          ...Font.Label.Medium,
          height: 32,
          width: 104,
          textAlign: "center",
          lineHeight: 32,
          marginTop: 40,
        }}
      >
        학사일정
      </Text>
      <View style={{ width: 327, alignSelf: "center" }}>
        <Calendar
          theme={{
            todayTextColor: "black",
            textMonthFontWeight: "600",
            textSectionTitleColor: Color.BLACK,
            textSectionFontSize: 12,
            textDayHeaderFontSize: 12,
            dayTextColor: Color.Grey[2],
          }}
          monthFormat={"M월"}
          onMonthChange={handleMonthChange}
          markedDates={markedDates}
          renderArrow={(direction: Direction) =>
            direction === "left" ? (
              <LeftArrowIcon
                style={{ marginLeft: 70 }}
                color={Color.contents.contentSecondary}
              />
            ) : (
              <RightArrowIcon
                style={{ marginRight: 70 }}
                color={Color.contents.contentSecondary}
              />
            )
          }
        />
      </View>
      <AcademicList
        notices={filteredNotices}
        categoryKey="학사공지"
        updateList={(id) => {
          // 공지사항 상태 업데이트
          setFilteredNotices((prev) =>
            prev.map((notice) =>
              notice.id === id
                ? { ...notice, read: true } // 공지를 읽었을 때 read를 true로 변경
                : notice
            )
          );
        }}
      />
    </View>
  );
}
