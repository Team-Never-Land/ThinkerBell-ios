import { Color } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { dummyFavoritesRecentNotice } from "@/assets/data/dummyFavorites";
import { TFavoritesRecentNoticeList } from "@/types/favorites";
import FavoritesNoticeItem from "@/components/favorites/FavoritesNoticeItem";
import FavoritesHeader from "@/components/header/FavoritesHeader";
import FavoritesEmpty from "@/components/favorites/FavoritesEmpty";
import FavoritesHead from "@/components/favorites/FavoritesHead";

const FavoritesPage = ({ navigation }: { navigation: any }) => {
  const [favoritelist, setFavoriteList] = useState([]);
  const [noticelist, setNoticeList] = useState<TFavoritesRecentNoticeList[]>(
    []
  );

  useEffect(() => {
    setNoticeList(dummyFavoritesRecentNotice);
  }, []);

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
          isDisabled={favoritelist.length === 0}
          onPress={() => navigation.navigate("home")}
        />
        {favoritelist.length > 0 ? (
          favoritelist.map((item, index) => {
            return <FavoritesNoticeItem key={index} item={item} />;
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
