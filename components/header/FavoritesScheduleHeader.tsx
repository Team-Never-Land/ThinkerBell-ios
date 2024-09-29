import React from "react";
import { View, Text, StatusBar, Pressable } from "react-native";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BeforeIcon from "../../assets/images/icon/Arrow/Before.svg";
import NextIcon from "../../assets/images/icon/Arrow/Next.svg";

export default function FavoritesScheduleHeader({
  yearList,
  selectedYearIndex,
  setSelectedYearIndex,
}: {
  yearList: string[];
  selectedYearIndex: number;
  setSelectedYearIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          paddingTop: 55,
          backgroundColor: Color.BLUE,
          alignItems: "center",
          paddingHorizontal: 12,
          paddingBottom: 7,
        }}
      >
        <Text
          style={{
            ...Font.Label.XL,
            color: Color.WHITE,
            marginBottom: 17,
          }}
        >
          즐겨찾기한 학사일정
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              padding: 10,
            }}
            onPress={() =>
              setSelectedYearIndex((prevIndex) => Math.max(prevIndex - 1, 0))
            }
            disabled={selectedYearIndex === 0}
          >
            <BeforeIcon
              color={
                selectedYearIndex === 0 ? Color.red.gray[200] : Color.WHITE
              }
            />
          </Pressable>
          <Text
            style={{
              ...Font.Pretendard600[14],
              color: Color.WHITE,
              textAlign: "center",
            }}
          >
            {yearList[selectedYearIndex]}
          </Text>
          <Pressable
            style={{
              padding: 10,
            }}
            onPress={() =>
              setSelectedYearIndex((prevIndex) =>
                Math.min(prevIndex + 1, yearList.length - 1)
              )
            }
            disabled={selectedYearIndex === yearList.length - 1}
          >
            <NextIcon
              color={
                selectedYearIndex === yearList.length - 1
                  ? Color.red.gray[200]
                  : Color.WHITE
              }
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}
