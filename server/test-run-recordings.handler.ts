import express from "express";
import { existsSync, mkdirSync, renameSync } from "fs";
import {
  getRunFilepath,
  isError,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTime,
} from "testmatic";
import { projectMdRead } from "testmatic/files";
import thumbsupply from "thumbsupply";

import { getProjectPathCwd } from "./get-project-path-cwd";

interface RecordingPreview {
  readonly thumbnailFilename: string;
  readonly thumbnailPathFilename: string;
  readonly thumbnailUrl: string;
}

export function getTestRunRecordings(app: express.Express) {
  app.get("/tests/:testName/runs/:runDateTime/recordings", async (req, res) => {
    const project = projectMdRead(getProjectPathCwd());

    const { testName: testNameOrTitle, runDateTime } = req.params;

    if (!project) {
      res.json([]);
      res.status(500);
      return;
    }

    const test = projectGetTestByNameOrTitle({ project, testNameOrTitle });
    if (isError(test)) {
      res.json([]);
      res.status(500);
      return;
    }

    const run = projectGetTestRunByDateTime(test, runDateTime);
    if (!run) {
      res.json([]);
      res.status(500);
      return;
    }

    const projectPath = getProjectPathCwd();

    const runFilepath = getRunFilepath(test, run, projectPath);

    const filenames = run.recordings.map(
      (filename) => `${runFilepath}/${filename}`,
    );

    const recordingPreviews: RecordingPreview[] = [];

    const cacheDir = __dirname + "/../public/cache";

    for await (const filename of filenames ?? []) {
      if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir);
      }

      const thumbnailFilename =
        getFilename(filename).replace(/\W/g, "") + ".png";
      const thumbnailPathFilename = `${cacheDir}/${thumbnailFilename}`;

      if (!existsSync(thumbnailPathFilename)) {
        const thumbnailGeneratedPathFilename =
          await thumbsupply.generateThumbnail(filename, {
            cacheDir,
          });

        renameSync(thumbnailGeneratedPathFilename, thumbnailPathFilename);
      }
      const thumbnailUrl = getThumbnailUrl(thumbnailPathFilename);

      recordingPreviews.push({
        thumbnailUrl,
        thumbnailFilename,
        thumbnailPathFilename,
      });
    }

    res.json(recordingPreviews);
    res.status(200);
  });
}

function getFilename(path: string) {
  return path.split("/").slice(-1).join("/");
}

// function replaceExtension(filename: string, extension: string) {
//   return filename.split(".").slice(0, -1).join(".") + `.${extension}`;
// }

function getThumbnailUrl(thumbnailPathFilename: string) {
  return `/cache/${getFilename(thumbnailPathFilename)}`;
}
