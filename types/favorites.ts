import { TCategoryKey } from "./category";

//즐겨찾기 설정, 취소 Response
export type TFavoritesResponse = {
  code: number;
  status: string;
  message: string;
  data: string | null;
};

//공지사항 최근 즐겨찾기 3개 내역 Response
export type TFavoritesRecentNoticeListResponse = {
  code: number;
  status: string;
  message: string;
  data: TFavoritesRecentNoticeList[];
};

//공지사항 최근 즐겨찾기 3개 내역
export type TFavoritesRecentNoticeList = {
  category: TCategoryKey;
  title: string;
  pubDate: string;
  url: string;
};

//학사일정 즐겨찾기 내역 조회 Response
export type TFavoritesScheduleListResponse = {
  code: number;
  status: string;
  message: string;
  data: TFavoritesScheduleList[];
};

//학사일정 즐겨찾기 내역 조회
export type TFavoritesScheduleList = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
};

export type TFavoritesList = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  marked: boolean;
};

export type TYearMonthFavorites = {
  [year: number]: {
    [month: number]: TFavoritesList[];
  };
};
