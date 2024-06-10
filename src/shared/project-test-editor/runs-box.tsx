import { ListBox } from "../list-box";
import { runResultEmoji } from "../run";
import { DateTime } from "luxon";
import { Test } from "testmatic";

export interface RunsBoxProps {
  readonly test: Test;
}

export function parseDateTimeString(dateTimeString: string) {
  const [date, time] = dateTimeString.split("_");
  const dateTime = new Date(`${date} ${time.replaceAll("-", ":")}`);

  return dateTime;
}

function formatDateTimeString(dateTimeString: string) {
  return DateTime.fromJSDate(parseDateTimeString(dateTimeString)).toFormat(
    "dd/MM/yyyy hh:mm"
  );
}

export function RunsBox(props: RunsBoxProps) {
  return (
    <ListBox>
      {props.test.runs.map((run) => (
        <div>
          {runResultEmoji(run.result)} {formatDateTimeString(run.dateTime)}
        </div>
      ))}
    </ListBox>
  );
}
