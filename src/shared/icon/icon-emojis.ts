import { IconName, IconNames } from "./icon-names";

export const ICON_EMOJIS: Partial<Record<IconName, string>> = {
  [IconNames.Test]: "🧪",
  [IconNames.Tag]: "🏷️",
  [IconNames.Run]: "▶️",
  [IconNames.Passed]: "✅",
  [IconNames.Failed]: "❌",
  [IconNames.Mixed]: "⚠️",
  [IconNames.NotRun]: "⚪️",
  [IconNames.FolderOpen]: "📂",
};
