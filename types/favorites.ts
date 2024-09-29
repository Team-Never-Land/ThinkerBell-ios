import { TCategoryKey } from "./category";

export type TFavoritesRecentNoticeList = {
  category: TCategoryKey;
  title: string;
  pubDate: string;
  url: string;
};

export type TFavoritesListResponse = {
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
