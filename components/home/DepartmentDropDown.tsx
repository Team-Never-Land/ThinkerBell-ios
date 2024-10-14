import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color, Font } from "@/constants/Theme";
import DownIcon from "@/assets/images/icon/Arrow/Down2.svg";
import UpIcon from "@/assets/images/icon/Arrow/Up2.svg";
import CallDialog from "./CallDialog";
import { getDepartmentContacts } from "@/service/getDepartmentContacts";

type DepartmentType = {
  campus: string;
  major: string;
  college: string;
  contact: string;
};

export default function DepartmentDropDown() {
  const [departmentData, setDepartmentData] = useState<DepartmentType[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<{
    department: DepartmentType;
  } | null>(null);
  const [isDialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDepartmentContacts();
        setDepartmentData(data.data);
      } catch (error) {
        console.error("Error fetching department contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (campus: string) => {
    setSelectedCampus(campus === selectedCampus ? null : campus);
    setExpanded(campus === selectedCampus ? false : true);
  };

  const toggleCollegeDropdown = (college: string) => {
    setSelectedCollege(college === selectedCollege ? null : college);
  };

  const handleDepartmentSelect = (department: DepartmentType) => {
    setSelectedDepartment({ department });
    setDialogVisible(true);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={Color.BLUE} />;
  }

  const campuses = [...new Set(departmentData.map((item) => item.campus))];

  return (
    <FlatList
      style={{
        marginBottom: 70,
      }}
      data={campuses}
      keyExtractor={(item) => item}
      renderItem={({ item: campus }) => (
        <View>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              expanded && selectedCampus === campus
                ? styles.dropdownButtonHover
                : {},
            ]}
            onPress={() => toggleDropdown(campus)}
          >
            <Text style={styles.dropdownText}>{campus}</Text>
            <View>
              {expanded && selectedCampus === campus ? (
                <UpIcon color={Color.red.gray[500]} />
              ) : (
                <DownIcon color={Color.red.gray[500]} />
              )}
            </View>
          </TouchableOpacity>

          {selectedCampus === campus && expanded && (
            <FlatList
              data={[
                ...new Set(
                  departmentData
                    .filter((item) => item.campus === campus)
                    .map((item) => item.college)
                ),
              ]}
              keyExtractor={(item) => item}
              renderItem={({ item: college }) => (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,
                      selectedCollege === college
                        ? styles.dropdownButtonHover
                        : {},
                    ]}
                    onPress={() => toggleCollegeDropdown(college)}
                  >
                    <Text style={styles.dropdownText}>{college}</Text>
                    <View>
                      {selectedCollege === college ? (
                        <UpIcon color={Color.red.gray[500]} />
                      ) : (
                        <DownIcon color={Color.red.gray[500]} />
                      )}
                    </View>
                  </TouchableOpacity>

                  {selectedCollege === college && (
                    <FlatList
                      data={departmentData.filter(
                        (item) =>
                          item.college === college && item.campus === campus
                      )}
                      keyExtractor={(item) => item.major}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.departmentItem}
                          onPress={() => handleDepartmentSelect(item)}
                        >
                          <Text
                            style={styles.departmentText}
                            numberOfLines={1} // 한 줄로 제한
                            ellipsizeMode="tail" // 텍스트가 넘치면 끝에 ... 표시
                          >
                            {item.major}
                          </Text>

                          <Text style={styles.departmentPhone}>
                            {item.contact}
                          </Text>
                        </TouchableOpacity>
                      )}
                      nestedScrollEnabled={true} // 중첩 스크롤 가능하게 설정
                    />
                  )}
                </View>
              )}
              nestedScrollEnabled={true} // 중첩 스크롤 가능하게 설정
            />
          )}
        </View>
      )}
      nestedScrollEnabled={true} // 중첩 스크롤 가능하게 설정
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
  dropdownButtonHover: {
    backgroundColor: "#E1E1E1",
  },
  dropdownText: {
    ...Font.Paragraph.Large,
  },
  departmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 31,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
    height: 40,
  },
  departmentText: {
    ...Font.Paragraph.Medium,
    width: 220,
  },
  departmentPhone: {
    fontFamily: "Pretendard",
    fontSize: 16,
    color: Color.contents.contentSecondary,
    textDecorationLine: "underline",
  },
});
