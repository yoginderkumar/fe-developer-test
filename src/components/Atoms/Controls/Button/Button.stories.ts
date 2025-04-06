import Button from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Control/Buttons",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Buttons allow users to take actions, and make choices, with a single tap. ",
  },
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Connect Destinations",
    isLoading: false,
    variant: "default",
    onClick: () => {
      alert("You clicked a button!");
    },
  },
};

export const PrimarySmall: Story = {
  args: {
    children: "Continue",
    isLoading: true,
    variant: "default",
    size: "small",
    onClick: () => {
      alert("You clicked a button!");
    },
  },
};

export const Secondary: Story = {
  args: {
    children: "Go Back",
    isLoading: true,
    variant: "secondary",

    onClick: () => {
      alert("You clicked a button!");
    },
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete User",
    isLoading: true,
    variant: "destructive",
    onClick: () => {
      alert("You clicked a button!");
    },
  },
};

export const Success: Story = {
  args: {
    children: "Approve",
    isLoading: true,
    variant: "success",
    onClick: () => {
      alert("You clicked a button!");
    },
  },
};

export const Outline: Story = {
  args: {
    isLoading: true,
    children: "Continue",
    variant: "outline",
    onClick: () => {
      alert("You clicked a button!");
    },
  },
};
