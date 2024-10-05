import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Font } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function KeywordBox({
  keyword,
  disablePress = false,
}: {
  keyword: string;
  disablePress?: boolean;
}) {
  const [keywordsCount, setKeywordsCount] = useState<number>(0);

  // AsyncStorage에 저장된 키워드 개수를 가져오는 함수
  const checkKeywordCount = async () => {
    try {
      const storedKeywords = await AsyncStorage.getItem("keywords");
      const keywordsArray = storedKeywords ? JSON.parse(storedKeywords) : [];
      setKeywordsCount(keywordsArray.length);
    } catch (error) {
      console.error("키워드 개수 확인 오류:", error);
    }
  };

  useEffect(() => {
    checkKeywordCount(); // 컴포넌트가 마운트될 때 키워드 개수 확인
  }, []);

  const storeKeyword = async (keyword: string) => {
    try {
      const existingKeywords = await AsyncStorage.getItem("keywords");
      const keywordsArray = existingKeywords
        ? JSON.parse(existingKeywords)
        : [];

      // 키워드 개수가 9개 이상일 경우 추가 차단
      if (keywordsArray.length >= 9) {
        Toast.show({
          type: "success",
          text1: "키워드는 9개까지 등록됩니다.",
          position: "bottom",
        });
        return;
      }

      if (!keywordsArray.includes(keyword)) {
        keywordsArray.push(keyword);
        await AsyncStorage.setItem("keywords", JSON.stringify(keywordsArray));
        console.log("키워드 저장 완료:", keywordsArray);
        checkKeywordCount(); // 키워드 저장 후 다시 개수 확인

        // 키워드 저장 성공 시 토스트 메시지
        Toast.show({
          type: "success",
          text1: "등록되었습니다!",
          position: "bottom",
        });
      } else {
        // 이미 등록된 키워드일 경우 토스트 메시지
        Toast.show({
          type: "success",
          text1: "이미 등록된 키워드입니다.",
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("키워드 저장 오류:", error);
    }
  };

  const containerWidth = keyword.length > 3 ? 75 + keyword.length * 4 : 75; // 글자 수에 따라 너비 조정
  const textWidth = keyword.length > 3 ? 73 + keyword.length * 4 : 73;

  return (
    <Pressable
      style={[styles.keywordContainer, { width: containerWidth }]}
      onPress={() => {
        if (!disablePress) {
          storeKeyword(keyword);
        }
      }}
    >
      <View style={styles.keywordItem}>
        <Text style={[styles.keywordLabel, { width: textWidth }]}>
          {keyword}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keywordContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E9EFC4",
    borderRadius: 100,
    height: 44,
    marginBottom: 18,
    marginRight: 6,
  },
  keywordItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  keywordLabel: {
    ...Font.Label.Medium,
    color: "#6B6B6B",
    textAlign: "center",
    height: 24,
  },
});
