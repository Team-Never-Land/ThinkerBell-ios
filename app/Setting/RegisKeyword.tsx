import {
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color, Font } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import KeywordBox from "@/components/setting/KeywordBox";

export default function RegisKeyword({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const [input, setInput] = useState<string>(""); // 입력 필드 상태
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // 버튼 비활성화 상태

  const isValidSearch = (text: string) => {
    const validText = /^[a-zA-Z0-9가-힣]{2,9}$/; // 한글, 영문, 숫자만 허용
    const isInitialSound = /^[ㄱ-ㅎ]+$/; // 초성만 입력된 경우
    if (isInitialSound.test(text)) return false; // 초성만 있을 경우 유효하지 않음
    return validText.test(text);
  };

  // 버튼 비활성화 상태 관리 함수
  const checkKeywordCount = async () => {
    try {
      const storedKeywords = await AsyncStorage.getItem("keywords");
      const keywordsArray = storedKeywords ? JSON.parse(storedKeywords) : [];
      if (keywordsArray.length >= 9) {
        setIsButtonDisabled(true); // 9개 이상일 경우 버튼 비활성화
      } else {
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.error("키워드 개수 확인 오류:", error);
    }
  };

  useEffect(() => {
    checkKeywordCount(); // 컴포넌트가 마운트될 때 키워드 개수 확인
  }, []);

  const handleRegister = () => {
    if (input.length < 2) {
      setErrorMessage("두 글자 이상 입력해주세요.");
    } else if (!isValidSearch(input)) {
      setErrorMessage("키워드를 정확하게 입력해주세요.");
    } else {
      setErrorMessage("");
      Keyboard.dismiss();
      storeKeyword(input);
    }
  };

  // 키워드를 AsyncStorage에 저장하는 함수
  const storeKeyword = async (keyword: string) => {
    try {
      const existingKeywords = await AsyncStorage.getItem("keywords");
      const keywordsArray = existingKeywords
        ? JSON.parse(existingKeywords)
        : [];

      if (!keywordsArray.includes(keyword)) {
        if (keywordsArray.length < 9) {
          keywordsArray.push(keyword);
          await AsyncStorage.setItem("keywords", JSON.stringify(keywordsArray));
          console.log("키워드 저장 완료:", keywordsArray);
          checkKeywordCount(); // 키워드 개수 다시 체크
          navigation.goBack();
        } else {
          setErrorMessage("최대 9개까지 등록할 수 있습니다.");
        }
      } else {
        setErrorMessage("이미 등록된 키워드입니다.");
      }
    } catch (error) {
      console.error("키워드 저장 오류:", error);
    }
  };

  return (
    <>
      <View style={{ height: top, backgroundColor: Color.WHITE }}></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Pressable
          style={{
            position: "absolute",
            marginTop: 57,
            marginLeft: 29,
          }}
          onPress={() => navigation.navigate("Keyword")}
        >
          <Text
            style={{
              fontFamily: "Pretendard",
              color: Color.contents.contentSecondary,
              fontSize: 14,
            }}
          >
            닫기
          </Text>
        </Pressable>
        <Text
          style={{
            position: "absolute",
            marginTop: 57,
            alignSelf: "center",
            ...Font.Label.XL,
          }}
        >
          키워드 등록
        </Text>
        <View style={{ marginTop: 125, alignSelf: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="직접입력"
            value={input}
            onChangeText={setInput} // 입력값 변화 시 호출
            placeholderTextColor={Color.BLACK}
            maxLength={9}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text> // 오류 메시지 표시
          ) : null}
        </View>
        {/* 추천 키워드 */}
        <View
          style={{
            position: "absolute",
            width: 328,
            height: 244,
            marginTop: 212,
            marginLeft: 24,
            gap: 18,
          }}
        >
          <View
            style={{
              width: 168,
              height: 58,
            }}
          >
            <Text style={{ ...Font.Paragraph.Medium }}>
              이런 공지를 기다리시나요?
            </Text>
            <Text style={{ ...Font.Label.Large }}>추천 키워드</Text>
          </View>

          <View
            style={{
              width: 328,
              height: 168,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {/* 추천 키워드를 클릭했을 때 키워드가 저장됨 */}
            <KeywordBox keyword="등록금" />
            <KeywordBox keyword="입사신청" />
            <KeywordBox keyword="수강신청" />
            <KeywordBox keyword="계절수업" />
            <KeywordBox keyword="교환학생" />
            <KeywordBox keyword="장학금" />
            <KeywordBox keyword="학점교류" />
            <KeywordBox keyword="교직이수" />
            <KeywordBox keyword="공모전" />
          </View>
        </View>

        <Pressable
          style={{
            backgroundColor: Color.BLUE,
            width: 178,
            height: 56,
            borderWidth: 2,
            borderColor: "#E4E9EF",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            marginTop: 604,
            alignSelf: "center",
          }}
          onPress={handleRegister}
          disabled={isButtonDisabled}
        >
          <Text
            style={{
              ...Font.Heading.Medium,
              color: isButtonDisabled
                ? Color.contents.contentSecondary
                : Color.WHITE,
            }}
          >
            등록
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 282,
    height: 36,
    ...Font.Label.Medium,
    borderWidth: 1.2,
    borderRadius: 10,
    borderColor: "#898989",
    paddingLeft: 11,
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
  },
});
