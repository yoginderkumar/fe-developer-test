import * as React from "react";
import { useFormContext, RegisterOptions, useWatch } from "react-hook-form";
import { tv } from "tailwind-variants";
import Switch from "@/components/Atoms/Controls/Switch";
import DropdownMenu from "@/components/Molecules/Dropdowns";
import Radio from "../RadioButton";
//import { MenuItem } from "@/types";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Tooltip } from "../../Misc/Tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MenuItem } from "@/types";

// Extract validation logic into separate functions with specific return types
const getEmailValidation = () => ({
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
});

const getTelValidation = () => ({
  pattern: {
    value: /^[0-9]{10}$/,
    message: "Invalid phone number (10 digits required)",
  },
});

const getNumberValidation = () => ({
  min: { value: 0, message: "Value must be positive" },
});

const getPasswordValidation = () => ({
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  validate: (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasNonalphas = /\W/.test(value);
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasNonalphas) {
      return "Password must contain an uppercase letter, lowercase letter, number, and special character";
    }
    return true;
  },
});

export interface CustomChangeEvent {
  target: {
    name: string;
    value: unknown;
    type: string;
  };
}

// Input type definition
type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "radio"
  | "switch"
  | "checkbox"
  | "dropdown";

// Option interfaces
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  tooltip?: string;
  type: InputType;
  radioOptions?: Array<Option>;
  required?: boolean;
  badge?: string;
  dropdownOptions?: Array<MenuItem>;
  customValidation?: RegisterOptions;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void;
}

const inputClass = tv({
  base: "body-3 w-full rounded-xl p-4 bg-white bg-opacity-10 ring-0 outline-0 focus:ring-1 active:ring-1 focus:ring-white active:ring-white transition-all ease-in-out duration-300 text-white",
  variants: {
    error: {
      true: "border border-error-600",
      false: "",
    },
    withIcon: {
      true: "pr-12", // Add padding to the right to accommodate the icon
    },
  },
});

const createCustomEvent = (
  name: string,
  value: unknown,
  type: InputType,
): CustomChangeEvent => ({
  target: {
    name,
    value,
    type,
  },
});

const getValidationRules = ({
  type,
  required,
  label,
  name,
  customValidation,
}: Pick<
  CustomInputProps,
  "type" | "required" | "label" | "name" | "customValidation"
>): RegisterOptions => {
  const rules: RegisterOptions = {
    required:
      type !== "switch" && required ? `${label || name} is required` : false,
  };

  switch (type) {
    case "email":
      rules.pattern = getEmailValidation().pattern;
      break;
    case "tel":
      rules.pattern = getTelValidation().pattern;
      break;
    case "number":
      rules.valueAsNumber = true;
      rules.min = getNumberValidation().min;
      break;
    case "password":
      rules.minLength = getPasswordValidation().minLength;
      rules.validate = getPasswordValidation().validate;
      break;
  }

  // Apply custom validation if provided
  if (customValidation) {
    const {
      pattern,
      min,
      max,
      minLength,
      maxLength,
      validate,
      required,
      deps,
    } = customValidation;

    if (pattern) rules.pattern = pattern;
    if (min) rules.min = min;
    if (max) rules.max = max;
    if (minLength) rules.minLength = minLength;
    if (maxLength) rules.maxLength = maxLength;
    if (validate) rules.validate = validate;
    if (required) rules.required = required;
    if (deps) rules.deps = deps;
  }

  return rules;
};

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      disabled = false,
      name,
      label,
      tooltip,
      type,
      radioOptions,
      required = true,
      badge,
      className,
      dropdownOptions,
      onChange,
      customValidation,
      ...props
    },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
      setValue,
      trigger,
      resetField,
      control,
    } = useFormContext();

    const fieldValue = useWatch({
      control,
      name,
      defaultValue: props.defaultValue,
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const { ref: inputRef, ...inputProps } = register(
      name,
      getValidationRules({ type, label, name, required, customValidation }),
    );

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent) => {
        if ("nativeEvent" in event) {
          inputProps.onChange(event);
        } else {
          // For custom components, manually call setValue
          setValue(name, event.target.value);
        }

        if (onChange) {
          onChange(event);
        }
        trigger(name);
      },
      [onChange, trigger, name, inputProps, setValue],
    );

    const error: string | undefined = React.useMemo(() => {
      return !disabled && !!errors?.[name]
        ? (errors[name].message as string)
        : undefined;
    }, [disabled, errors, name]);

    const renderPasswordInput = React.useCallback(() => {
      const doesHaveError = Boolean(error);
      return (
        <div className="relative w-full">
          <input
            defaultValue={props.defaultValue}
            className={inputClass({
              error: doesHaveError,
              withIcon: true,
              className,
            })}
            disabled={disabled}
            id={name}
            type={showPassword ? "text" : "password"}
            aria-invalid={doesHaveError}
            aria-describedby={doesHaveError ? `${name}-error` : undefined}
            {...inputProps}
            onChange={handleChange}
            {...props}
            ref={(e) => {
              inputRef(e);
              if (typeof ref === "function") ref(e);
              else if (ref) ref.current = e;
            }}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {showPassword ? <IoIosEyeOff size={20} /> : <IoEye size={20} />}
          </button>
        </div>
      );
    }, [
      error,
      props,
      className,
      disabled,
      name,
      showPassword,
      inputProps,
      handleChange,
      inputRef,
      ref,
    ]);

    const renderStandardInput = React.useCallback(() => {
      const doesHaveError = Boolean(error);
      return (
        <div className="relative w-full">
          <input
            defaultValue={props.defaultValue}
            className={inputClass({
              error: doesHaveError,
              className,
            })}
            disabled={disabled}
            id={name}
            type={type}
            aria-invalid={doesHaveError}
            aria-describedby={doesHaveError ? `${name}-error` : undefined}
            {...inputProps}
            onChange={handleChange}
            {...props}
            ref={(e) => {
              inputRef(e);
              if (typeof ref === "function") ref(e);
              else if (ref) ref.current = e;
            }}
          />
        </div>
      );
    }, [
      error,
      props,
      className,
      disabled,
      name,
      type,
      inputProps,
      handleChange,
      inputRef,
      ref,
    ]);

    const renderRadioInput = React.useCallback(() => {
      const options =
        radioOptions?.map((option) => ({
          ...option,
          disabled: option.disabled || disabled,
        })) || [];
      return (
        <Radio
          options={options}
          defaultValue={String(props.defaultValue)}
          className="space-y-2"
          labelClassName="body-2 text-white ml-3"
          onClick={(selectedOption) =>
            handleChange(createCustomEvent(name, selectedOption.value, "radio"))
          }
          size="sm"
        />
      );
    }, [radioOptions, props.defaultValue, disabled, handleChange, name]);

    const renderSwitchInput = React.useCallback(
      () => (
        <Switch
          disabled={disabled}
          name={name}
          label={label}
          className={className}
          {...props}
          ref={(e) => {
            if (e) {
              inputRef(e);
              if (typeof ref === "function") ref(e);
              else if (ref) ref.current = e;
            }
          }}
          onChange={(checked) =>
            handleChange(createCustomEvent(name, checked, "switch"))
          }
        />
      ),
      [disabled, name, label, props, inputRef, ref, className, handleChange],
    );

    const renderDropdownInput = React.useCallback(() => {
      return (
        <DropdownMenu
          disabled={disabled}
          size="lg"
          menuList={dropdownOptions || []}
          onChange={(value) =>
            handleChange(createCustomEvent(name, value.label, "dropdown"))
          }
          className={className}
        >
          {fieldValue ? fieldValue : (props.defaultValue ?? props.placeholder)}
        </DropdownMenu>
      );
    }, [
      disabled,
      dropdownOptions,
      className,
      fieldValue,
      props.defaultValue,
      props.placeholder,
      handleChange,
      name,
    ]);

    const renderInput = React.useCallback(
      (type: InputType) => {
        switch (type) {
          case "password":
            return renderPasswordInput();
          case "radio":
            return renderRadioInput();
          case "switch":
            return renderSwitchInput();
          case "dropdown":
            return renderDropdownInput();
          default:
            return renderStandardInput();
        }
      },
      [
        renderPasswordInput,
        renderRadioInput,
        renderSwitchInput,
        renderDropdownInput,
        renderStandardInput,
      ],
    );

    React.useEffect(() => {
      if (!disabled) {
        resetField(name, { defaultValue: props.defaultValue });
      }
      // Add all dependencies to avoid potential bugs
    }, [disabled, name, resetField, props.defaultValue]);

    const renderLabel = React.useCallback(
      (type: InputType, required?: boolean, label?: string) => {
        if (!label?.length || type === "switch" || type === "radio")
          return null;
        return (
          <label
            htmlFor={name}
            className={`body-2 text-white ${className?.includes("w-") && className}`}
          >
            {label}
            {required && <span className="text-error-600 ml-1">*</span>}
          </label>
        );
      },
      [name, className],
    );

    const renderTooltip = React.useCallback(
      (type: InputType, text?: string) => {
        if (!text?.length || type === "switch" || type === "radio") return null;
        return (
          <Tooltip content={text}>
            <div>
              <AiOutlineInfoCircle
                className="text-white flex-shrink-0"
                size={16}
              />
            </div>
          </Tooltip>
        );
      },
      [],
    );

    const renderErrorMessage = React.useCallback(() => {
      const doesHaveError = Boolean(error);
      if (disabled || !doesHaveError) return null;
      return (
        <span
          className="text-error-600 text-xs"
          id={`${name}-error`}
          role="alert"
        >
          {error}
        </span>
      );
    }, [disabled, error, name]);

    return (
      <div className={`flex flex-col gap-2 w-full py-1 h-fit `}>
        <div className="flex flex-row items-center space-x-3">
          {renderLabel(type, required, label)}
          {badge && (
            <div className="caption text-white py-1 px-2 rounded-xl bg-white bg-opacity-10">
              {badge}
            </div>
          )}
          {tooltip && renderTooltip(type, tooltip)}
        </div>
        <div
          className={` opacity-100 ${disabled ? (type !== "radio" && type !== "switch" ? "opacity-60" : "") : ""}`}
        >
          {renderInput(type)}
        </div>
        {renderErrorMessage()}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
