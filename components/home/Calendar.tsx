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
import { getMonthlyAcademicSchedule } from "@/service/getMonthlyAcademicSchedule";
import { getOrCreateUUID } from "@/utils/uuid-function";
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

  const [filteredNotices, setFilteredNotices] = useState<any[]>([]); // 필터링된 학사 일정 상태
  const [academicNotices, setAcademicNotices] = useState<any[]>([]); // 학사 일정 전체 데이터 상태

  // 현재 달에 맞는 학사 일정 필터링 및 정렬
  const filterAndSortAcademicNotices = (notices: any[]) => {
    return notices.sort((a, b) => (a.startDate > b.startDate ? -1 : 1)); // 날짜 기준 내림차순 정렬
  };

  // API에서 학사 일정을 가져오는 함수
  const fetchAcademicNotices = async (year: number, month: number) => {
    try {
      const response = await getMonthlyAcademicSchedule(year, month); // API 호출
      setAcademicNotices(response); // 전체 데이터를 상태에 저장
      const filteredData = filterAndSortAcademicNotices(response);
      setFilteredNotices(filteredData); // 필터링된 학사 일정 설정
    } catch (error) {
      console.error("Error fetching academic notices:", error);
      setAcademicNotices([]);
      setFilteredNotices([]);
    }
  };
  useEffect(() => {
    const today = new Date();
    const initialYear = today.getFullYear();
    const initialMonth = today.getMonth() + 1;
    setCurrentMonth(`${initialYear}-${String(initialMonth).padStart(2, "0")}`);
    fetchAcademicNotices(initialYear, initialMonth); // 첫 로드 시 데이터 가져오기
  }, []);

  // 달이 변경되었을 때 호출
  const handleMonthChange = (month: any) => {
    const formattedMonth = `${month.year}-${String(month.month).padStart(
      2,
      "0"
    )}`;
    setCurrentMonth(formattedMonth);
    fetchAcademicNotices(month.year, month.month); // 변경된 달에 맞는 학사 일정 필터링
  };

  const getKoreanToday = () => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // UTC에서 한국 시간으로 변환 (UTC + 9)
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const markedDates = academicNotices.reduce((acc, notice) => {
    const dateKey = notice.startDate;
    if (!acc[dateKey]) {
      acc[dateKey] = {
        dots: [{ key: `${notice.id}`, color: Color.BLUE }],
        selected: true,
        selectedTextColor: Color.BLUE,
        selectedColor: "transparent",
      };
    } else {
      acc[dateKey].dots.push({ key: `${notice.id}`, color: Color.BLUE });
    }
    return acc;
  }, {});

  const today = getKoreanToday();

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
        categoryKey="AcademicSchedule"
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
