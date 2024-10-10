export type TCategoryKey =
  | "NormalNotice"
  | "AcademicNotice"
  | "EventNotice"
  | "ScholarshipNotice"
  | "CareerNotice"
  | "StudentActsNotice"
  | "BiddingNotice"
  | "SafetyNotice"
  | "RevisionNotice"
  | "DormitoryNotice"
  | "DormitoryEntryNotice"
  | "LibraryNotice"
  | "TeachingNotice";

export type TCategoryListResponse = {
  code: number;
  status: string;
  message: string;
  data: {
    items: TCategoryList[];
    page: number;
    size: number;
    totalItems: number;
  };
};

export type TCategoryList = {
  id: number;
  pubDate: string;
  title: string;
  url: string;
  marked: boolean;
  important?: boolean;
  campus?: string;
  read: boolean;
};

export type TCategorySearch = {
  [key in TCategoryKey]?: TCategoryList[];
};
