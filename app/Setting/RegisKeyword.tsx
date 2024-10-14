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
import { saveKeyword } from "@/service/keyword/saveKeyword"; // API 호출 함수 임포트
import { getKeywords } from "@/service/keyword/getKeywords";

export default function RegisKeyword({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const [input, setInput] = useState<string>(""); // 입력 필드 상태
  const [errorMessage, setErrorMessage] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // 버튼 비활성화 상태

  const isValidSearch = (text: string) => {
    const validText = /^[a-zA-Z0-9가-힣]{2,9}$/; // 한글, 영문, 숫자만 허용
    const isInitialSound = /^[ㄱ-ㅎ]+$/; // 초성만 입력된 경우
    if (isInitialSound.test(text)) return false; // 초성만 있을 경우 유효하지 않음
    return validText.test(text);
  };

  const fetchKeywords = async () => {
    try {
      const keywordList = await getKeywords(); // 서버에서 키워드 불러오기
      console.log("불러온 키워드:", keywordList); // 불러온 데이터 확인
      setKeywords(keywordList); // 상태 업데이트
      setIsButtonDisabled(keywordList.length >= 9); // 키워드가 9개 이상일 경우 버튼 비활성화
    } catch (error) {
      console.error("키워드 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchKeywords(); // 컴포넌트가 마운트될 때 키워드 불러오기
  }, []);

  const handleRegister = async () => {
    if (input.length < 2) {
      setErrorMessage("두 글자 이상 입력해주세요.");
    } else if (!isValidSearch(input)) {
      setErrorMessage("키워드를 정확하게 입력해주세요.");
    } else {
      setErrorMessage("");
      Keyboard.dismiss();
      await storeKeyword(input); // 키워드 저장
    }
  };

  const storeKeyword = async (keyword: string) => {
    try {
      await saveKeyword(keyword); // 서버에 키워드 저장
      await fetchKeywords(); // 저장 후 키워드 목록 다시 불러오기
      navigation.goBack(); // 저장 후 이전 화면으로 이동
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("잘못된 입력값입니다.");
      } else if (error.response && error.response.status === 500) {
        setErrorMessage("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      } else {
        setErrorMessage("키워드 저장 중 오류가 발생했습니다.");
      }
    }
  };
  const handleKeywordSelect = (selectedKeyword: string) => {
    setInput(selectedKeyword); // Show the selected keyword in the input field
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
            <KeywordBox
              keyword="등록금"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="입사신청"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="수강신청"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="계절수업"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="교환학생"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="장학금"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="학점교류"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="교직이수"
              onKeywordSelect={handleKeywordSelect}
            />
            <KeywordBox
              keyword="공모전"
              onKeywordSelect={handleKeywordSelect}
            />
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
