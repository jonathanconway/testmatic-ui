#! /usr/bin/env node
import { concurrently } from "concurrently";

const env = {
  TESTMATIC_CWD: process.cwd(),
};

concurrently(
  [
    { command: "npm:serve:server", name: "server", env },
    { command: "npm:serve:static", name: "client", env },
  ],
  {
    raw: true,
    cwd: __dirname,
  },
);
