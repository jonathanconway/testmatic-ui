import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { AutoSuggestTextBox } from "./auto-suggest-text-box";

const meta = {
  title: "components/AutoSuggestTextBox",
  component: AutoSuggestTextBox,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof AutoSuggestTextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: ["One", "Two", "Three", "Four"],
    onSelectItem: fn(),
  },
};
