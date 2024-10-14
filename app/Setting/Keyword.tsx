import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SettingUsableHeader from "@/components/header/SettingUsableHeader";
import KeywordList from "@/components/setting/KeywordList";
import { Color, Font } from "@/constants/Theme";
import AddIcon from "@/assets/images/icon/Element/Add.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getKeywords } from "@/service/keyword/getKeywords";
import { deleteKeyword } from "@/service/keyword/deleteKeyword";

export default function Keyword({ navigation }: { navigation: any }) {
  const title = "키워드 관리";
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  const loadKeywords = async () => {
    try {
      const keywordList = await getKeywords(); // 서버에서 키워드 불러오기
      console.log("불러온 키워드:", keywordList); // 불러온 데이터 확인

      // Assuming the API response is an array of objects with { keyword: 'some_keyword' }
      const keywordsArray = keywordList.map((item: any) => item.keyword); // Extract 'keyword' from each object

      setKeywords(keywordsArray);
      setIsButtonDisabled(keywordsArray.length >= 9); // 키워드가 9개 이상이면 버튼 비활성화
    } catch (error) {
      console.error("키워드 불러오기 오류:", error);
    }
  };

  const handleDelete = async (keywordToDelete: string) => {
    try {
      await deleteKeyword(keywordToDelete); // 서버에서 키워드 삭제
      const updatedKeywords = keywords.filter(
        (keyword) => keyword !== keywordToDelete
      );
      setKeywords(updatedKeywords); // 삭제 후 키워드 상태 업데이트
      setIsButtonDisabled(updatedKeywords.length >= 9); // 버튼 비활성화 상태 업데이트
    } catch (error) {
      console.error("키워드 삭제 오류:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadKeywords();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <SettingUsableHeader
        navigation={navigation}
        name={title}
        disablePress={false}
      />

      {/* 키워드 리스트 + 버튼을 스크롤 가능하게 함 */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <KeywordList
              key={index}
              keyword={keyword}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Text
            style={{
              position: "absolute",
              width: 196,
              height: 52,
              left: "50%",
              transform: [{ translateX: -98 }],
              top: 200,
              fontFamily: "Pretendard",
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 26,
              textAlign: "center",
              color: Color.contents.contentSecondary,
            }}
          >
            알림을 받고 싶은 공지가 있다면 키워드를 등록해놓으세요!
          </Text>
        )}
        {/* 키워드 등록 버튼 */}
        <View
          style={{
            width: 178,
            height: 98,
            alignSelf: "center",
            marginTop: keywords.length === 0 ? 0 : 30, // 키워드가 없을 때는 marginTop 제거
            position: keywords.length === 0 ? "absolute" : "relative", // 키워드 없을 때 절대 위치 지정
            top: keywords.length === 0 ? 431 : undefined, // 키워드가 없을 때 top 431 설정
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              backgroundColor: isButtonDisabled
                ? Color.red.gray[300]
                : Color.BLUE, // 비활성화 시 회색
              width: 178,
              height: 56,
              borderWidth: 2,
              borderColor: "#E4E9EF",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              if (!isButtonDisabled) navigation.navigate("RegisKeyword");
            }}
            disabled={isButtonDisabled}
          >
            <View
              style={{
                width: 141,
                height: 24,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...Font.Heading.Medium,
                  color: isButtonDisabled ? "#E1E1E1" : Color.WHITE,
                }}
              >
                키워드 등록하기
              </Text>
              <AddIcon />
            </View>
          </Pressable>
          <Text
            style={{
              ...Font.Paragraph.Medium,
              textAlign: "center",
            }}
          >
            {`${keywords.length} / 9`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
