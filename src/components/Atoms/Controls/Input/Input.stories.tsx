import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Input, { CustomChangeEvent } from "./index"; // Adjust this import path as needed
import { Button, Form } from "@/components";

const meta: Meta<typeof Input> = {
  title: "Atoms/Control/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "A versatile input component with various types and built-in validation",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWrapper: React.FC<React.ComponentProps<typeof Input>> = (args) => {
  return (
    <Form onSubmit={(data) => console.log(data)}>
      <Input {...args} />
      <Button type="submit" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Form>
  );
};

// For stories that need multiple inputs or custom form logic
const MultipleInputsWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Form onSubmit={(data) => console.log("data: ", data)}>
      {children}
      <Button type="submit" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Form>
  );
};

export const Text: Story = {
  args: {
    name: "textInput",
    type: "text",
    label: "Text Input",
    required: true,
    disabled: false,
    tooltip: "This is a tooltip",

    placeholder: "Enter text",
    defaultValue: "Hi theres",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const TextWithDefaultValue: Story = {
  args: {
    ...Text.args,
    name: "textWithDefaultValue",
    defaultValue: "Default text value",
    label: "Text Input with Default Value",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Email: Story = {
  args: {
    name: "emailInput",
    type: "email",
    label: "Email Input",
    placeholder: "Enter email",
    tooltip: "Must be a valid email format (e.g., user@example.com)",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Password: Story = {
  args: {
    name: "passwordInput",
    type: "password",
    label: "Password Input",
    placeholder: "Enter password",
    tooltip:
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Number: Story = {
  args: {
    name: "numberInput",
    type: "number",
    label: "Number Input",
    placeholder: "Enter number",
    tooltip: "Must be a positive number",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Tel: Story = {
  args: {
    name: "telInput",
    type: "tel",
    label: "Telephone Input",
    placeholder: "Enter phone number",
    tooltip: "Must be 10 digits (e.g., 1234567890)",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Radio: Story = {
  args: {
    name: "radioInput",
    type: "radio",
    label: "Radio Input", // Won't be displayed as label for radio type
    radioOptions: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
  },
  render: (args) => <InputWrapper {...args} />,
};

export const RadioWithDefaultSelected: Story = {
  args: {
    ...Radio.args,
    name: "radioWithDefault",
    defaultValue: "2",
    label: "Radio with Default Selection",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const RadioWithDisabledOptions: Story = {
  args: {
    ...Radio.args,
    name: "radioWithDisabled",
    label: "Radio with Disabled Options",
    radioOptions: [
      { label: "Option 1", value: "1" },
      { label: "Option 2 (Disabled)", value: "2", disabled: true },
      { label: "Option 3", value: "3" },
    ],
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Switch: Story = {
  args: {
    name: "switchInput",
    type: "switch",
    label: "Switch Input", // Will be displayed next to the switch
    tooltip: "Toggle this switch",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const SwitchCheckedByDefault: Story = {
  args: {
    ...Switch.args,
    name: "switchChecked",
    label: "Switch Checked by Default",
    defaultValue: "true",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Dropdown: Story = {
  args: {
    name: "dropdownInput",
    type: "dropdown",
    label: "Dropdown Input",
    defaultValue: "Option 1",
    dropdownOptions: [
      { label: "Option 1", key: "1" },
      { label: "Option 2", key: "2" },
      { label: "Option 3", key: "3" },
    ],
    tooltip: "Select an option from the dropdown",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const DropdownWithNoDefault: Story = {
  args: {
    ...Dropdown.args,
    name: "dropdownNoDefault",
    label: "Dropdown with No Default",
    defaultValue: undefined,
    placeholder: "Select an option",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithBadge: Story = {
  args: {
    name: "badgeInput",
    type: "text",
    label: "Input with Badge",
    badge: "Optional",
    placeholder: "Enter text",
    required: false,
    tooltip: "This field is optional as indicated by the badge",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Disabled: Story = {
  render: () => (
    <MultipleInputsWrapper>
      <div className="space-y-4">
        <Input
          name="disabledText"
          type="text"
          label="Disabled Text Input"
          placeholder="This input is disabled"
          defaultValue="You cannot edit this"
          disabled={true}
        />
        <Input
          name="disabledPassword"
          type="password"
          label="Disabled Password"
          defaultValue="password123"
          disabled={true}
        />
        <Input
          name="disabledRadio"
          type="radio"
          radioOptions={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
          ]}
          defaultValue="1"
          disabled={true}
        />
        <Input
          name="disabledSwitch"
          type="switch"
          label="Disabled Switch"
          defaultValue={"true"}
          disabled={true}
        />
        <Input
          name="disabledDropdown"
          type="dropdown"
          label="Disabled Dropdown"
          defaultValue="Option 1"
          dropdownOptions={[
            { label: "Option 1", key: "1" },
            { label: "Option 2", key: "2" },
          ]}
          disabled={true}
        />
      </div>
    </MultipleInputsWrapper>
  ),
};

export const WithCustomValidation: Story = {
  args: {
    name: "customValidationInput",
    type: "text",
    label: "Custom Validation Input",
    placeholder: "Enter more than 5 characters",
    customValidation: {
      validate: (value: string) =>
        value.length > 5 || "Must be more than 5 characters",
    },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithCustomOnChange: Story = {
  args: {
    name: "customOnChangeInput",
    type: "text",
    label: "Custom OnChange Input",
    placeholder: "Type something",
    onChange: (e: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent) => {
      if ("target" in e) {
        console.log("Custom onChange:", e.target.value);
      }
    },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithCustomRegexValidation: Story = {
  args: {
    name: "regexValidationInput",
    type: "text",
    label: "Letters Only Input",
    placeholder: "Enter letters only (a-z, A-Z)",
    customValidation: {
      pattern: {
        value: /^[A-Za-z]+$/,
        message: "Only letters are allowed",
      },
    },
    tooltip: "Only letters (A-Z, a-z) are allowed",
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithDifferentWidths: Story = {
  render: () => (
    <MultipleInputsWrapper>
      <div className="space-y-4">
        <Input
          name="fullWidthInput"
          type="text"
          label="Full Width Input"
          placeholder="This takes up the full width"
          className="w-full"
        />
        <Input
          name="halfWidthInput"
          type="text"
          label="Half Width Input"
          placeholder="This takes up half the width"
          className="w-1/2"
        />
        <Input
          name="quarterWidthInput"
          type="text"
          label="This is a very long label that demonstrates how the component handles lengthy text in the label area"
          placeholder="Quarter width"
          className="w-1/4"
        />
      </div>
    </MultipleInputsWrapper>
  ),
};

Text.parameters = {
  docs: {
    description: {
      story: "A basic text input field for general string input.",
    },
  },
};

Email.parameters = {
  docs: {
    description: {
      story:
        "An email input field with built-in validation that checks for proper email format (name@domain.com).",
    },
  },
};

Password.parameters = {
  docs: {
    description: {
      story:
        "A password input field with show/hide toggle and strong password validation rules.",
    },
  },
};

Number.parameters = {
  docs: {
    description: {
      story:
        "A number input field that only accepts numeric values with built-in validation for positive numbers.",
    },
  },
};

Tel.parameters = {
  docs: {
    description: {
      story:
        "A telephone input field with phone number validation for 10-digit numbers.",
    },
  },
};

Radio.parameters = {
  docs: {
    description: {
      story:
        "A radio button group for selecting a single option from a list of choices.",
    },
  },
};

RadioWithDisabledOptions.parameters = {
  docs: {
    description: {
      story:
        "Radio button group with certain options disabled, preventing users from selecting them.",
    },
  },
};

Switch.parameters = {
  docs: {
    description: {
      story:
        "A switch input for toggling boolean values, ideal for on/off settings.",
    },
  },
};

Dropdown.parameters = {
  docs: {
    description: {
      story:
        "A dropdown/select input for choosing one option from a list of choices.",
    },
  },
};

WithBadge.parameters = {
  docs: {
    description: {
      story:
        "Input field with an additional badge to indicate status or provide context (e.g., 'Optional', 'Required', 'New').",
    },
  },
};

Disabled.parameters = {
  docs: {
    description: {
      story:
        "Examples of disabled input fields across all input types, showing how they appear when interaction is not permitted.",
    },
  },
};

WithCustomValidation.parameters = {
  docs: {
    description: {
      story:
        "Input field with custom validation rules implemented using the customValidation prop.",
    },
  },
};

WithCustomOnChange.parameters = {
  docs: {
    description: {
      story:
        "Input field with a custom onChange handler to demonstrate event handling customization.",
    },
  },
};

meta.parameters = {
  docs: {
    description: {
      component: `
# Input Component

The Input component is a versatile and customizable input field that supports various types of inputs including text, email, password, number, telephone, radio buttons, switches, and dropdowns. It integrates seamlessly with react-hook-form for form state management and validation.

## Features

- Supports multiple input types: text, email, password, number, tel, radio, switch, and dropdown
- Built-in validation for common input types
- Custom validation support
- Integrates with react-hook-form
- Customizable styling with Tailwind CSS
- Accessibility features
- Support for additional badges
- Custom onChange handler support

## Usage

To use the Input component, wrap it inside a \`FormProvider\` from react-hook-form:

\`\`\`jsx
import { useForm, FormProvider } from 'react-hook-form';
import Input from './Input';

const MyForm = () => {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="email" type="email" label="Email" required />
        <Input name="password" type="password" label="Password" required />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
\`\`\`

## Props

The following table shows which props are applicable to each input type:

### Prop Descriptions

| Prop Name | Type | Description |
|-----------|------|-------------|
| name | string | The name of the input field (required) |
| label | string | The label for the input field |
| required | boolean | Whether the field is required (default: true) |
| disabled | boolean | Whether the input is disabled |
| className | string | Additional CSS classes |
| placeholder | string | Placeholder text for the input |
| options | Array<{ label: string; value: string; disabled?: boolean }> | Options for radio inputs |
| dropdownOptions | Array<Array<MenuItem> | Options for dropdown inputs |
| customOnChange | function | Custom onChange handler |
| customValidation | RegisterOptions | Custom validation rules |
| badge | string | Text to display in a badge next to the label |

Note: All standard HTML input attributes are also supported and will be passed to the underlying input element.
      `,
    },
  },
};
