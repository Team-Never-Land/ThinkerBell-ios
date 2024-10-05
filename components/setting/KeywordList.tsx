import { View, Text, Pressable } from "react-native";
import React from "react";
import { Color, Font } from "@/constants/Theme";
import DeleteIcon from "@/assets/images/icon/Element/Delete.svg";
import Toast from "react-native-toast-message";

export default function KeywordList({
  keyword,
  onDelete,
}: {
  keyword: string;
  onDelete: (keyword: string) => void;
}) {
  const handleDelete = (keyword: string) => {
    onDelete(keyword); // 부모로부터 전달된 삭제 함수 호출
    Toast.show({
      type: "success",
      text1: "삭제되었습니다.",
      position: "bottom",
    }); // 삭제 완료 토스트 메시지
  };

  return (
    <View
      style={{
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Color.red.gray[700],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 15,
      }}
    >
      <View
        style={{
          justifyContent: "center", // 세로 가운데 정렬
          alignItems: "center", // 가로 가운데 정렬
          width: 106, // 텍스트 박스 크기
          height: 30,
        }}
      >
        <Text
          style={{
            ...Font.Heading.Medium,
          }}
        >
          {keyword}
        </Text>
      </View>
      <Pressable onPress={() => handleDelete(keyword)}>
        <DeleteIcon />
      </Pressable>
    </View>
  );
}
