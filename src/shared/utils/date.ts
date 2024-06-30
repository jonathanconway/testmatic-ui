import { DateTime } from "luxon";

export function parseDateTimeString(dateTimeString: string) {
  const [date, time] = dateTimeString.split("_");
  const dateTime = new Date(`${date} ${time.replaceAll("-", ":")}`);

  return dateTime;
}

export function formatDateTimeString(dateTimeString: string) {
  return DateTime.fromJSDate(parseDateTimeString(dateTimeString)).toFormat(
    "dd/MM/yyyy hh:mm",
  );
}
