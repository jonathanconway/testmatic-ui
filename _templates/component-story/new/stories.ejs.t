---
to: <%= h.dir() %>/<%= h.name() %>/<%= h.name() %>.stories.ts
---

import type { Meta, StoryObj } from "@storybook/react";

import { <%= h.namePascal() %> } from "./<%= h.name() %>";

const meta = {
  title: "components/<%= h.namePascal() %>",
  component: <%= h.namePascal() %>,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof <%= h.namePascal() %>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
