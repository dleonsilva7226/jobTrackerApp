export type FilterStatuses = "Offer" | "Applied" | "Interviewing" | "Rejected" | "Nothing";

export const FilterStatuses = {
  Offer: "Offer",
  Applied: "Applied",
  Interviewing: "Interviewing",
  Rejected: "Rejected",
  Nothing: "Nothing"
} as const;
