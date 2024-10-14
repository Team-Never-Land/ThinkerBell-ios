import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Color, Font } from "@/constants/Theme";
import DownIcon from "@/assets/images/icon/Arrow/Down2.svg";
import UpIcon from "@/assets/images/icon/Arrow/Up2.svg";
import NextIcon from "@/assets/images/icon/Arrow/Next.svg";
import { getDepartmentUrls } from "@/service/getDepartmentUrls";

type LinkType = {
  id: number;
  college: string;
  url: string;
};

type SchoolType = {
  id: number;
  school: string;
  colleges: LinkType[];
};

export default function HomepageDropdown() {
  const [expandedSchool, setExpandedSchool] = useState<number | null>(null); // 확장된 학교 상태
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null); // 선택된 링크 상태 관리
  const [schools, setSchools] = useState<SchoolType[]>([]); // 학교 데이터
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리

  // API 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDepartmentUrls();
        const groupedData = groupBySchool(data); // 학교별로 그룹화
        setSchools(groupedData);
      } catch (error) {
        console.error("Error fetching department URLs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 학교별로 데이터 그룹화
  const groupBySchool = (data: any[]) => {
    const grouped: { [key: string]: LinkType[] } = {};

    data.forEach((item: any, index: number) => {
      if (!grouped[item.school]) {
        grouped[item.school] = [];
      }
      grouped[item.school].push({
        id: index,
        college: item.college,
        url: item.url,
      });
    });

    return Object.keys(grouped).map((school, index) => ({
      id: index,
      school,
      colleges: grouped[school],
    }));
  };

  const toggleDropdown = (schoolId: number) => {
    setExpandedSchool(schoolId === expandedSchool ? null : schoolId);
  };

  const handleLinkPress = (id: number, url: string) => {
    setSelectedLinkId(id); // 클릭된 링크의 ID를 상태로 저장
    Linking.openURL(url); // Open the URL in the browser
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={Color.BLUE} />;
  }

  return (
    <FlatList
      style={{
        marginBottom: 70,
      }}
      data={schools}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: school }) => (
        <View>
          {/* School Button */}
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              expandedSchool === school.id && styles.selectedCategoryButton,
            ]}
            onPress={() => toggleDropdown(school.id)}
          >
            <Text style={styles.dropdownText}>{school.school}</Text>
            <View>
              {expandedSchool === school.id ? (
                <UpIcon color={Color.red.gray[500]} />
              ) : (
                <DownIcon color={Color.red.gray[500]} />
              )}
            </View>
          </TouchableOpacity>

          {/* Show colleges if school is expanded */}
          {expandedSchool === school.id && (
            <FlatList
              data={school.colleges}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.linkItem,
                    selectedLinkId === item.id && styles.selectedLinkItem, // 선택된 링크는 회색 배경 적용
                  ]}
                  onPress={() => handleLinkPress(item.id, item.url)}
                >
                  <Text style={styles.linkText}>{item.college}</Text>
                  <NextIcon color={Color.BLACK} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    height: 49,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 31,
    paddingLeft: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
  },
  dropdownText: {
    ...Font.Label.Large,
    color: Color.BLACK,
  },
  linkItem: {
    height: 44,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 27,
    paddingLeft: 24,
  },
  linkText: {
    ...Font.Paragraph.Large,
    color: Color.BLACK,
  },
  selectedCategoryButton: {
    backgroundColor: "#E1E1E1",
  },
  selectedLinkItem: {
    backgroundColor: "#E1E1E1",
  },
});
