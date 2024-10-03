import React from "react";
import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import { Font, Color } from "@/constants/Theme";
import { TCategoryList } from "@/types/category";
import NextIcon from "../../assets/images/icon/Arrow/Next.svg";

export default function Notice({ notices }: { notices: TCategoryList[] }) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}.${day}`; // MM.DD 형태로 반환
  };

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.noticeContainer}>
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <Pressable
            key={index}
            style={styles.noticeItem}
            onPress={() => handlePress(notice.url)}
          >
            <Text style={styles.noticeTitle} numberOfLines={2}>
              {notice.title}
            </Text>
            <View style={styles.noticeDateContainer}>
              <Text style={styles.noticeDate}>
                {formatDate(notice.pubDate)}
              </Text>
              <NextIcon color={Color.red.gray[500]} />
            </View>
          </Pressable>
        ))
      ) : (
        <Text style={styles.noNotice}>공지사항이 없습니다.</Text>
      )}
    </View>
  );
}

// 스타일 객체
const styles = StyleSheet.create({
  noticeContainer: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  noticeItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 312,
    height: 35,
    borderBottomWidth: 0.8,
    borderBottomColor: Color.red.gray[400],
  },
  noticeTitle: {
    width: 230,
    height: 25,
    fontFamily: "Pretendard500",
    fontSize: 14,
    lineHeight: 25,
  },
  noticeDateContainer: {
    width: 61,
    height: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // 수직 중앙 정렬
    justifyContent: "space-between", // 아이콘과 텍스트 간의 간격
  },
  noticeDate: {
    color: Color.red.gray[500], // 날짜 색상 적용
    fontFamily: "Pretendard300",
    fontSize: 13,
    lineHeight: 24,
    textAlignVertical: "center", // 텍스트 수직 가운데 정렬
  },
  noNotice: {
    fontFamily: "Pretendard500",
    fontSize: 14,
  },
});
