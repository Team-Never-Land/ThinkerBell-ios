import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { TCategoryList } from "@/types/category";
import ClippingOffIcon from "../../assets/images/icon/Clipping/Clipping-Off.svg";
import { Color, Font } from "@/constants/Theme";
type AcademicListProps = {
  notices: TCategoryList[]; // 학사 일정 데이터 배열
};
export default function AcademicList({ notices }: AcademicListProps) {
  const renderNoticeItem = ({ item }: { item: TCategoryList }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.date}>
          {item.pubDate.slice(5).replace("-", ".")}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <ClippingOffIcon
        style={{
          marginRight: 24,
        }}
      />
    </View>
  );
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
