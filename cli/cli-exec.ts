#! /usr/bin/env node
import { concurrently } from "concurrently";

concurrently(["npx ts-node ../server/server", "npx serve -s ../build"]);
