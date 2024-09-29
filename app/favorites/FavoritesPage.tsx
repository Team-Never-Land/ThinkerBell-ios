import { Color } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  dummyFavoritesRecentNotice,
  dummyRecentFavorites,
} from "@/assets/data/dummyFavorites";
import { TFavoritesList, TFavoritesRecentNoticeList } from "@/types/favorites";
import FavoritesNoticeItem from "@/components/favorites/FavoritesNoticeItem";
import FavoritesHeader from "@/components/header/FavoritesHeader";
import FavoritesEmpty from "@/components/favorites/FavoritesEmpty";
import FavoritesHead from "@/components/favorites/FavoritesHead";
import FavoritesScheduleItem from "@/components/favorites/FavoritesScheduleItem";

const FavoritesPage = ({ navigation }: { navigation: any }) => {
  const [scheduleList, setScheduleList] = useState<TFavoritesList[]>([]); //최근 즐겨찾기한 학사일정 목록
  const [noticelist, setNoticeList] = useState<TFavoritesRecentNoticeList[]>(
    []
  ); //최근 즐겨찾기한 공지사항 목록

  useEffect(() => {
    const updatedFavorites = dummyRecentFavorites.map((item) => ({
      ...item,
      marked: true,
    }));

    setScheduleList(updatedFavorites);
    setNoticeList(dummyFavoritesRecentNotice);
  }, []);

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
    </View>
  );
};

export default FavoritesPage;
