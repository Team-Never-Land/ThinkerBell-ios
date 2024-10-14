import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { TCategoryList } from "@/types/category";
import ClippingOnIcon from "@/assets/images/icon/Clipping/Clipping-On.svg";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { Color, Font } from "@/constants/Theme";
import { onMarkedPress } from "@/utils/favorites";

// API에서 받아오는 데이터의 구조에 맞는 타입 정의
type NoticeItem = {
  id: number;
  startDate?: string; // 시작일
  endDate?: string; // 종료일
  title: string;
  marked: boolean;
};

type AcademicListProps = {
  notices: NoticeItem[]; // 학사 일정 데이터 배열
  categoryKey: string; // 카테고리 키 (즐겨찾기 상태를 관리하기 위해 사용)
  updateList: (id: number) => void; // 목록 업데이트 함수
};

export default function AcademicList({
  notices,
  categoryKey,
  updateList,
}: AcademicListProps) {
  const [markedNotices, setMarkedNotices] = useState<Record<number, boolean>>(
    {}
  );
  const [textHeight, setTextHeight] = useState<Record<number, number>>({});

  const handleMarkedPress = (item: NoticeItem) => {
    const currentMarkedStatus = markedNotices[item.id] ?? item.marked;
    const newMarkedStatus = !currentMarkedStatus;

    // UI 즉시 업데이트
    setMarkedNotices((prevState) => ({
      ...prevState,
      [item.id]: newMarkedStatus,
    }));

    onMarkedPress(item.id, categoryKey, currentMarkedStatus, updateList);
  };

  const sortedNotices = notices.sort((a, b) => {
    if (a.startDate && b.startDate) {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
    return 0; // 날짜가 없는 항목은 위치를 변경하지 않음
  });

  const formatDate = (startDate?: string, endDate?: string) => {
    if (!startDate) return "N/A"; // 시작일이 없으면 "N/A"
    const start = startDate.slice(5).replace("-", "."); // 시작일 형식
    const end = endDate ? endDate.slice(5).replace("-", ".") : ""; // 종료일 형식

    if (startDate === endDate || !endDate) {
      return start; // 시작일과 종료일이 같으면 시작일만 표시
    } else {
      return `${start} ~ ${end}`; // 다르면 범위로 표시
    }
  };

  const renderNoticeItem = ({ item }: { item: NoticeItem }) => {
    const isMarked = markedNotices[item.id] ?? item.marked; // 현재 즐겨찾기 상태 확인
    const displayDate = formatDate(item.startDate, item.endDate); // 날짜 포맷 처리

    const calculatedHeight = textHeight[item.id]
      ? textHeight[item.id] + 20 // 텍스트 높이에 20을 더해 충분한 여백을 확보
      : 35; // 기본 높이

    return (
      <View style={[styles.itemContainer, { height: calculatedHeight }]}>
        <View style={styles.textContainer}>
          <Text style={styles.date}>{displayDate}</Text>
          <Text
            style={styles.title}
            numberOfLines={undefined}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setTextHeight((prev) => ({ ...prev, [item.id]: height }));
            }}
          >
            {item.title}
          </Text>
          {/* Clipping 아이콘을 눌렀을 때 상태 변경 */}
          <Pressable
            onPress={() => handleMarkedPress(item)}
            style={{ marginLeft: 15, marginRight: 10 }}
          >
            {isMarked ? <ClippingOnIcon /> : <ClippingOffIcon />}
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedNotices}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => `${item.id}-${item.startDate || "no-date"}`}
      />
      <View
        style={{
          height: 60,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginLeft: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 35,
    borderBottomWidth: 0.8,
    borderBottomColor: Color.red.gray[400],
  },
  textContainer: {
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 9, // 간격 설정
    width: 306,
  },
  date: {
    ...Font.Paragraph.Small,
    lineHeight: 19, // 텍스트 높이 설정
    color: Color.BLACK,
  },
  title: {
    flex: 1,
    ...Font.Paragraph.Small,
    lineHeight: 19, // 텍스트 높이 설정
    color: Color.red.gray[700],
  },
});
