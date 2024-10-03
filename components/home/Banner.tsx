import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Linking,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { Color } from "@/constants/Theme";

type BannerItem = {
  id: number;
  title: string;
  url: string;
  imageUrl: ImageSourcePropType;
};

export default function Banner() {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0); // 현재 페이지 인덱스 상태
  const flatListRef = useRef<FlatList>(null); // FlatList에 접근할 수 있는 ref

  const banners: BannerItem[] = [
    {
      id: 1,
      title: "정기 일정 공지 1",
      url: "https://www.mju.ac.kr/bbs/mjukr/141/208825/artclView.do",
      imageUrl: require("../../assets/images/banners/banner1.png"),
    },
    {
      id: 2,
      title: "정보성 공지 2",
      url: "https://www.mju.ac.kr/bbs/mjukr/141/190823/artclView.do",
      imageUrl: require("../../assets/images/banners/banner2.png"),
    },
    {
      id: 3,
      title: "정기 일정 공지 3",
      url: "https://www.mju.ac.kr/bbs/mjukr/141/214594/artclView.do",
      imageUrl: require("../../assets/images/banners/banner3.png"),
    },
    {
      id: 4,
      title: "이벤트성 공지",
      url: "https://www.mju.ac.kr/bbs/mjukr/143/212130/artclView.do",
      imageUrl: require("../../assets/images/banners/banner4.png"),
    },
  ];

  // FlatList에서 스크롤을 감지해 현재 페이지를 업데이트
  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.floor(
      event.nativeEvent.contentOffset.x / slideSize
    );
    setActiveIndex(currentIndex);
  };
  const handleBannerClick = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length; // 다음 인덱스 계산
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true }); // FlatList 스크롤
      setActiveIndex(nextIndex); // 인덱스 업데이트
    }, 4000);

    return () => clearInterval(intervalId); // 컴포넌트 unmount 시 interval 클리어
  }, [activeIndex]);

  const renderItem = ({ item }: { item: BannerItem }) => (
    <Pressable onPress={() => handleBannerClick(item.url)}>
      <Image
        source={item.imageUrl}
        style={{ height: 132, width: screenWidth }}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      {/* 인디케이터 */}
      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { opacity: index === activeIndex ? 1 : 0.5 }, // 현재 인덱스 강조
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    position: "relative", // 인디케이터를 배너 위에 표시하기 위한 설정
  },
  indicatorContainer: {
    position: "absolute",
    top: 108,
    left: 0,
    right: 0,
    padding: 4,
    flexDirection: "row",
    justifyContent: "center", // 좌우 중앙 정렬
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Color.BLUE,
    marginHorizontal: 5,
  },
});
