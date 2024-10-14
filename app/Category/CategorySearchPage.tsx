import CategoryBackButton from "@/components/category/CategoryBackButton";
import CategoryItem from "@/components/category/CategoryItem";
import CategoryEmpty from "@/components/category/CategoryEmpty";
import DropdownMenu from "@/components/category/DropdownMenu";
import Pagination from "@/components/category/Pagination";
import CategoryHeader from "@/components/header/CategoryHeader";
import { Color, Font } from "@/constants/Theme";
import { TCategoryKey, TCategoryList } from "@/types/category";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import {
  getAcademicNotice,
  getBiddingNotice,
  getCareerNotice,
  getDormitoryEntryNotice,
  getDormitoryNotice,
  getEventNotice,
  getLibraryNotice,
  getNormalNotice,
  getRevisionNotice,
  getSafetyNotice,
  getScholarshipNotice,
  getStudentActsNotice,
  getTeachingNotice,
} from "@/service/getNotice";
import { getSearchNotices } from "@/service/getSearchNotices";

type CategorySearchRouteProp = RouteProp<
  { CategorySearch: { categoryText: string; categoryKey: TCategoryKey } },
  "CategorySearch"
>;

const CategorySearchPage = ({ navigation }: { navigation: any }) => {
  const route = useRoute<CategorySearchRouteProp>();
  const { categoryText, categoryKey } = route.params;
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [list, setList] = useState<TCategoryList[]>([]);
  const [searchList, setSearchList] = useState<TCategoryList[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 0,
    totalItems: 0,
  });
  const [selectedCampus, setSelectedCampus] = useState("전체");
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (categoryKey && !isSearch) {
          switch (categoryKey) {
            case "NormalNotice":
              response = await getNormalNotice(page);
              break;
            case "AcademicNotice":
              response = await getAcademicNotice(page);
              break;
            case "EventNotice":
              response = await getEventNotice(page);
              break;
            case "ScholarshipNotice":
              response = await getScholarshipNotice(page);
              break;
            case "CareerNotice":
              response = await getCareerNotice(page);
              break;
            case "StudentActsNotice":
              response = await getStudentActsNotice(page);
              break;
            case "BiddingNotice":
              response = await getBiddingNotice(page);
              break;
            case "SafetyNotice":
              response = await getSafetyNotice(page);
              break;
            case "RevisionNotice":
              response = await getRevisionNotice(page);
              break;
            case "DormitoryNotice":
              response = await getDormitoryNotice(page, selectedCampus);
              break;
            case "DormitoryEntryNotice":
              response = await getDormitoryEntryNotice(page, selectedCampus);
              break;
            case "LibraryNotice":
              response = await getLibraryNotice(page, selectedCampus);
              break;
            case "TeachingNotice":
              response = await getTeachingNotice(page);
              break;
            default:
              response = await getNormalNotice(page);
              break;
          }
          if (response.code === 200) {
            setList(response.data.items);
            setPageInfo({
              page: response.data.page,
              size: response.data.size,
              totalItems: response.data.totalItems,
            });
          }
        }
      } catch (error) {
        console.error(error);
        setList([]);
      } finally {
        if (!isSearch) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [page, selectedCampus, isSearch]);

  useEffect(() => {
    if (!isLoading) {
      setTotalSize(Math.ceil((pageInfo.totalItems - pageInfo.size) / 10));
    }
  }, [isLoading]);

  //검색
  const onSearch = async () => {
    setSearchText(search);
    setIsSearch(true);
    setIsLoading(true);

    try {
      console.log(`검색어: ${search}, 카테고리: ${categoryKey}`);

      const response = await getSearchNotices(search, categoryKey);
      console.log("Response Data:", response.data);

      if (response.data[categoryKey]) {
        if (
          categoryKey === "DormitoryNotice" ||
          categoryKey === "DormitoryEntryNotice" ||
          categoryKey === "LibraryNotice"
        ) {
          setSearchList(response.data[categoryKey]);
          handleSearchList(response.data[categoryKey], selectedCampus);
        } else {
          setList(response.data[categoryKey]);
        }
      } else {
        setList([]);
      }
    } catch (error) {
      console.error(error);
      setList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchList = (searchLists: TCategoryList[], campus: string) => {
    if (campus === "전체") {
      setList(searchLists);
    } else {
      setList(searchLists.filter((item) => item.campus === campus));
    }
  };

  const updateList = (id: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, marked: !item.marked } : item
      )
    );
  };

  const handleSelectedCampus = (campus: string) => {
    setSelectedCampus(campus);
    if (isSearch) {
      handleSearchList(searchList, campus);
    } else {
      setIsLoading(true);
      setPage(0);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <CategoryHeader
        navigation={navigation}
        title={categoryText}
        search={search}
        setSearch={setSearch}
        onSearch={onSearch}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Color.BLACK}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : list.length > 0 ? (
        <>
          {isSearch ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: Color.red.gray[700],
                borderBottomWidth: 1,
                height: 58,
                zIndex: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexShrink: 1,
                  paddingLeft: 22,
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    ...Font.Pretendard500[14],
                    color: Color.contents.contentSecondary,
                  }}
                >
                  ‘{searchText}’이(가) 포함된 공지사항 ({list.length}개)
                </Text>
              </View>
              {(categoryKey === "DormitoryNotice" ||
                categoryKey === "DormitoryEntryNotice" ||
                categoryKey === "LibraryNotice") && (
                <View
                  style={{
                    paddingTop: 13,
                    paddingRight: 19,
                  }}
                >
                  <DropdownMenu
                    selectedCampus={selectedCampus}
                    handleSelectedCampus={handleSelectedCampus}
                  />
                </View>
              )}
            </View>
          ) : (
            (categoryKey === "DormitoryNotice" ||
              categoryKey === "DormitoryEntryNotice" ||
              categoryKey === "LibraryNotice") && (
              <View
                style={{
                  borderColor: Color.red.gray[700],
                  borderBottomWidth: 1,
                  alignItems: "flex-end",
                  paddingTop: 13,
                  paddingRight: 19,
                  height: 58,
                  zIndex: 10,
                }}
              >
                <DropdownMenu
                  selectedCampus={selectedCampus}
                  handleSelectedCampus={handleSelectedCampus}
                />
              </View>
            )
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {list.map((item, index) => {
              return (
                <CategoryItem
                  key={index}
                  item={item}
                  categoryKey={categoryKey}
                  updateList={updateList}
                />
              );
            })}
            {isSearch && (
              <View
                style={{
                  marginVertical: 75,
                }}
              >
                <CategoryBackButton
                  onPress={() => {
                    setIsSearch(false);
                    setSearch("");
                    setSearchText("");
                    setPage(0);
                    setIsLoading(true);
                  }}
                />
              </View>
            )}
          </ScrollView>
          {!isSearch && (
            <Pagination page={page} setPage={setPage} totalSize={totalSize} />
          )}
        </>
      ) : (
        <CategoryEmpty
          searchText={searchText}
          onPress={() => {
            setIsSearch(false);
            setSearch("");
            setSearchText("");
            setPage(0);
            setIsLoading(true);
          }}
        />
      )}
    </View>
  );
};

export default CategorySearchPage;
