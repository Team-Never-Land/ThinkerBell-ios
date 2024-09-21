import React from "react";
import { Pressable, Text, View } from "react-native";
import DireactionLeftIcon from "../../assets/images/icon/Arrow/Direaction-Left.svg";
import DireactionRightIcon from "../../assets/images/icon/Arrow/Direaction-Right.svg";
import BeforeIcon from "../../assets/images/icon/Arrow/Before.svg";
import NextIcon from "../../assets/images/icon/Arrow/Next.svg";
import { Color, Font } from "@/constants/Theme";

export default function Pagination({
  page,
  setPage,
  totalSize,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalSize: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
        height: 34,
      }}
    >
      <Pressable
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: 2.5,
        }}
        disabled={page === 0 || page < 9}
        onPress={() => {
          setPage((prevPage) => Math.max(prevPage - 10, 0));
        }}
      >
        <DireactionLeftIcon
          color={page === 0 || page < 9 ? Color.Grey[1] : Color.red.gray[700]}
        />
      </Pressable>
      <Pressable
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: 2.5,
        }}
        disabled={page === 0}
        onPress={() => {
          setPage((prevPage) => Math.max(prevPage - 1, 0));
        }}
      >
        <BeforeIcon color={page === 0 ? Color.Grey[1] : Color.red.gray[700]} />
      </Pressable>
      <Text
        style={{
          ...Font.Paragraph.Medium,
          color: Color.BLACK,
          marginHorizontal: 19,
        }}
      >
        {page + 1}/{totalSize + 1}
      </Text>
      <Pressable
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: 2.5,
        }}
        disabled={totalSize === page}
        onPress={() => {
          setPage((prevPage) => Math.min(prevPage + 1, totalSize));
        }}
      >
        <NextIcon
          color={totalSize === page ? Color.Grey[1] : Color.red.gray[700]}
        />
      </Pressable>
      <Pressable
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: 2.5,
        }}
        disabled={totalSize - page < 10}
        onPress={() => {
          setPage((prevPage) => Math.min(prevPage + 10, totalSize));
        }}
      >
        <DireactionRightIcon
          color={totalSize - page < 10 ? Color.Grey[1] : Color.red.gray[700]}
        />
      </Pressable>
    </View>
  );
}
