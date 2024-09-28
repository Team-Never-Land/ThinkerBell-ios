import { TCategoryKey } from "./category";

export type TFavoritesRecentNoticeList = {
  category: TCategoryKey;
  title: string;
  pubDate: string;
  url: string;
};
