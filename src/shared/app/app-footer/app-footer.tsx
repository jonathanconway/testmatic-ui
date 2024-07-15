import { packageInfo } from "../../../package-info";
import { Stack } from "../../layout";
import { Link } from "../../link";
import { Text } from "../../text";

export function AppFooter() {
  return (
    <Stack alignItems="center">
      <Stack alignItems="center" direction="row" spacing={1}>
        <Text>&copy; {packageInfo.author.name}</Text>
        <Link to={packageInfo.author.url} target="_blank">
          {packageInfo.author.url}
        </Link>
        <Link to={`mailto:${packageInfo.author.email}`} target="_blank">
          {packageInfo.author.email}
        </Link>
      </Stack>
    </Stack>
  );
}
