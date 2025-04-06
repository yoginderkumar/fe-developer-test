import dayjs from "dayjs";

export enum DatePickerPresets {
  today = "Today",
  yesterday = "Yesterday",
  lastWeek = "Last Week",
  lastMonth = "Last Month",
  lastThreeMonths = "Last 3 Months",
  custom = "Custom",
}

export const presetsToDateRange = (preset: DatePickerPresets): [Date, Date] => {
  const now = dayjs();
  switch (preset) {
    case DatePickerPresets.today:
      return [now.startOf("day").toDate(), now.endOf("day").toDate()];
    case DatePickerPresets.yesterday:
      return [
        now.subtract(1, "day").startOf("day").toDate(),
        now.subtract(1, "day").endOf("day").toDate(),
      ];
    case DatePickerPresets.lastWeek:
      return [
        now.subtract(1, "week").startOf("week").toDate(),
        now.subtract(1, "week").endOf("week").toDate(),
      ];
    case DatePickerPresets.lastMonth:
      return [
        now.subtract(1, "month").startOf("month").toDate(),
        now.subtract(1, "month").endOf("month").toDate(),
      ];
    case DatePickerPresets.lastThreeMonths:
      return [
        now.subtract(3, "month").startOf("month").toDate(),
        now.endOf("month").toDate(),
      ];
    default:
      return [now.startOf("day").toDate(), now.endOf("day").toDate()];
  }
};
