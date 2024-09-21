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

export type TCategoryList = {
  id: number;
  pubDate: string;
  title: string;
  url: string;
  marked: boolean;
  important?: boolean;
  campus?: string;
};

export type TCategorySearch = {
  [key in TCategoryKey]?: TCategoryList[];
};
