import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { TCategoryList } from "@/types/category";
import ClippingOnIcon from "@/assets/images/icon/Clipping/Clipping-On.svg";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { Color, Font } from "@/constants/Theme";
import { onMarkedPress } from "@/utils/favorites";
type AcademicListProps = {
  notices: TCategoryList[]; // 학사 일정 데이터 배열
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
  const handleMarkedPress = (item: TCategoryList) => {
    const currentMarkedStatus = markedNotices[item.id] || item.marked;
    const newMarkedStatus = !currentMarkedStatus;

    // UI 즉시 업데이트
    setMarkedNotices((prevState) => ({
      ...prevState,
      [item.id]: newMarkedStatus,
    }));

    // 즐겨찾기 추가/삭제 처리
    onMarkedPress(item.id, categoryKey, currentMarkedStatus, updateList);
  };
  const renderNoticeItem = ({ item }: { item: TCategoryList }) => {
    const isMarked = markedNotices[item.id] || item.marked; // 현재 즐겨찾기 상태
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.date}>
            {item.pubDate.slice(5).replace("-", ".")}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </View>

        {/* Clipping 아이콘을 눌렀을 때 상태 변경 */}
        <Pressable
          onPress={() => handleMarkedPress(item)}
          style={{
            marginRight: 24,
          }}
        >
          {isMarked ? <ClippingOnIcon /> : <ClippingOffIcon />}
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item.id.toString()}
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
    width: "100%",
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
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 9, // 간격 설정
    width: 306,
  },
  date: {
    width: 30,
    ...Font.Paragraph.Small,
    lineHeight: 19, // 텍스트 높이 설정
    color: Color.BLACK,
  },
  title: {
    width: 205,
    ...Font.Paragraph.Small,

    lineHeight: 19, // 텍스트 높이 설정
    color: Color.red.gray[700],
  },
});
