import { Color, Font } from "@/constants/Theme";
import React, { useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { TFavoritesScheduleList, TYearMonthFavorites } from "@/types/favorites";
import FavoritesScheduleItem from "@/components/favorites/FavoritesScheduleItem";
import FavoritesScheduleHeader from "@/components/header/FavoritesScheduleHeader";
import { getBookmarkSchedule } from "@/service/bookmark/getBookmarkSchedule";
import { useFocusEffect } from "expo-router";

const FavoritesSchedulePage = () => {
  const [scheduleList, setScheduleList] = useState<TYearMonthFavorites[]>([]); //즐겨찾기한 학사일정 목록
  const [yearList, setYearList] = useState<string[]>([]); //연도 목록
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); //선택된 연도 index
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const currentYear = new Date().getFullYear().toString();

      const processFavorites = (favorites: TFavoritesScheduleList[]) => {
        const yearMonthMap: TYearMonthFavorites = {};

        //연도 및 월에 따라 분류
        favorites.forEach((item) => {
          const [startYear, startMonth] = item.startDate.split("-").map(Number);
          const [endYear, endMonth] = item.endDate.split("-").map(Number);

          if (!yearMonthMap[startYear]) {
            yearMonthMap[startYear] = {};
          }
          if (!yearMonthMap[startYear][startMonth]) {
            yearMonthMap[startYear][startMonth] = [];
          }

          if (
            !yearMonthMap[startYear][startMonth].find(
              (fav) => fav.id === item.id
            )
          ) {
            yearMonthMap[startYear][startMonth].push({ ...item, marked: true });
          }

          if (startYear !== endYear || startMonth !== endMonth) {
            if (!yearMonthMap[endYear]) {
              yearMonthMap[endYear] = {};
            }
            if (!yearMonthMap[endYear][endMonth]) {
              yearMonthMap[endYear][endMonth] = [];
            }
            if (
              !yearMonthMap[endYear][endMonth].find((fav) => fav.id === item.id)
            ) {
              yearMonthMap[endYear][endMonth].push({ ...item, marked: true });
            }
          }
        });

        //연도와 월을 기준으로 정리된 리스트로 변환
        const yearMonthList = Object.entries(yearMonthMap).map(
          ([year, months]) => ({
            [Number(year)]: Object.entries(months).reduce(
              (acc, [month, items]) => ({ ...acc, [Number(month)]: items }),
              {}
            ),
          })
        );

        const sortedYears = Object.keys(yearMonthMap).sort();

        setScheduleList(yearMonthList);
        setYearList(sortedYears);

        //현재 연도가 연도 목록에 포함되어 있으면 그 연도로 설정
        const currentYearIndex = sortedYears.indexOf(currentYear);
        if (currentYearIndex !== -1) {
          setSelectedYearIndex(currentYearIndex);
        } else {
          setSelectedYearIndex(0);
        }
      };

      const fetchData = async () => {
        try {
          const response = await getBookmarkSchedule();
          if (response.code === 200) {
            processFavorites(response.data);
          }
        } catch (error) {
          console.error(error);
          setScheduleList([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const updateList = (id: number) => {
    setScheduleList((prevList) =>
      prevList.map((yearObj) => {
        const year = Number(Object.keys(yearObj)[0]);
        const months = yearObj[year];

        //선택된 연도만 수정
        if (year.toString() === yearList[selectedYearIndex]) {
          const updatedMonths = Object.entries(months).reduce(
            (acc, [month, items]) => {
              //해당 월에서 id에 맞는 항목의 marked를 업데이트
              const updatedItems = items.map((item) =>
                item.id === id ? { ...item, marked: !item.marked } : item
              );
              return { ...acc, [month]: updatedItems };
            },
            {}
          );
          return { [year]: updatedMonths };
        } else {
          return yearObj;
        }
      })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <FavoritesScheduleHeader
        yearList={yearList}
        selectedYearIndex={selectedYearIndex}
        setSelectedYearIndex={setSelectedYearIndex}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Color.BLACK}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 100 }}>
            {yearList &&
              scheduleList
                .filter((yearObj) => {
                  const year = Number(Object.keys(yearObj)[0]);
                  return year.toString() === yearList[selectedYearIndex];
                })
                .map((yearObj) => {
                  const year = Number(Object.keys(yearObj)[0]);
                  const months = yearObj[year];

                  return Object.entries(months)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([month, items]) => (
                      <View key={`${year}-${month}`}>
                        <Text
                          style={{
                            ...Font.Pretendard500[14],
                            color: Color.BLACK,
                            marginTop: 28,
                            marginBottom: 4,
                            marginLeft: 22,
                          }}
                        >
                          {month}월
                        </Text>
                        <View style={{ marginBottom: 12 }}>
                          {items.map((item) => (
                            <FavoritesScheduleItem
                              key={item.id}
                              item={item}
                              updateList={updateList}
                            />
                          ))}
                        </View>
                      </View>
                    ));
                })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default FavoritesSchedulePage;
