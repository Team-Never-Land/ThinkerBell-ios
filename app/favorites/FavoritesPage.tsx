import { Color } from "@/constants/Theme";
import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { TFavoritesList, TFavoritesRecentNoticeList } from "@/types/favorites";
import FavoritesNoticeItem from "@/components/favorites/FavoritesNoticeItem";
import FavoritesHeader from "@/components/header/FavoritesHeader";
import FavoritesEmpty from "@/components/favorites/FavoritesEmpty";
import FavoritesHead from "@/components/favorites/FavoritesHead";
import FavoritesScheduleItem from "@/components/favorites/FavoritesScheduleItem";
import { getBookmarkRecentSchedule } from "@/service/bookmark/getBookmarkRecentSchedule";
import { getBookmarkRecentNotice } from "@/service/bookmark/getBookmarkRecentNotice";
import { useFocusEffect } from "expo-router";

const FavoritesPage = ({ navigation }: { navigation: any }) => {
  const [scheduleList, setScheduleList] = useState<TFavoritesList[]>([]); //최근 즐겨찾기한 학사일정 목록
  const [noticelist, setNoticeList] = useState<TFavoritesRecentNoticeList[]>(
    []
  ); //최근 즐겨찾기한 공지사항 목록
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const [scheduleResponse, noticeResponse] = await Promise.all([
            getBookmarkRecentSchedule(),
            getBookmarkRecentNotice(),
          ]);
          if (scheduleResponse.code === 200) {
            const updatedSchedules = scheduleResponse.data.map((item) => ({
              ...item,
              marked: true,
            }));
            setScheduleList(updatedSchedules);
          }
          if (noticeResponse.code === 200) {
            setNoticeList(noticeResponse.data);
          }
        } catch (error) {
          console.error(error);
          setScheduleList([]);
          setNoticeList([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();

      return () => {};
    }, [])
  );

  const updateList = (id: number) => {
    setScheduleList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <FavoritesHeader navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Color.BLACK}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FavoritesHead
            text="학사일정"
            isDisabled={scheduleList.length === 0}
            onPress={() => navigation.navigate("FavoritesSchedule")}
          />
          {scheduleList.length > 0 ? (
            scheduleList.map((item, index) => {
              return (
                <FavoritesScheduleItem
                  key={index}
                  item={item}
                  updateList={updateList}
                />
              );
            })
          ) : (
            <FavoritesEmpty text="학사일정" />
          )}
          <FavoritesHead
            text="공지사항"
            isDisabled={noticelist.length === 0}
            onPress={() => navigation.navigate("FavoritesNotice")}
          />
          {noticelist.length > 0 ? (
            noticelist.map((item, index) => {
              return <FavoritesNoticeItem key={index} item={item} />;
            })
          ) : (
            <FavoritesEmpty text="공지사항" />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default FavoritesPage;
