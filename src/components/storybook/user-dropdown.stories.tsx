import type { Meta, StoryObj } from "@storybook/react";
import { UserDropdown } from "@/app/_components/ui/user-dropdown";

const meta: Meta<typeof UserDropdown> = {
  title: "UI/UserDropdown",
  component: UserDropdown,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserDropdown>;

export const Default: Story = {
  render: () => <UserDropdown />,
};
