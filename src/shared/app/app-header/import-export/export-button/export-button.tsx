import { DateTime } from "luxon";
import { convertProjectToProjectJSON } from "testmatic";

import { Button } from "../../../../button";
import { useProject } from "../../../../project";

export function ExportButton() {
  const { project } = useProject();

  function downloadObjectAsJson(exportObj: object, exportName: string) {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function handleClick() {
    const projectJSON = convertProjectToProjectJSON(project);
    const projectDateTimeStamp = DateTime.fromJSDate(new Date()).toFormat(
      "yyyyMMdd-hhmmss",
    );
    const projectName = `testmatic-project-${projectDateTimeStamp}`;
    downloadObjectAsJson(projectJSON, projectName);
  }

  return <Button onClick={handleClick}>Export</Button>;
}
