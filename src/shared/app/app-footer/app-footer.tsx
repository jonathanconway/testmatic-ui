import { useMemo } from "react";

import { packageInfo } from "../../../package-info";
import { Stack } from "../../layout";
import { Link } from "../../link";
import { Text } from "../../text";

export function AppFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Stack alignItems="center">
      <Stack alignItems="center" direction="row" spacing={1}>
        <Text>&copy; {year} Testmatic</Text>

        <Link to={packageInfo.homepage} target="_blank">
          Docs
        </Link>

        <Link to={packageInfo.author.email} target="_blank">
          Support
        </Link>
      </Stack>
    </Stack>
  );
}
