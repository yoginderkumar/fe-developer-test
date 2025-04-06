import Spinner, { SpinnerSize } from "@/components/Loaders/Spinner";
import React from "react";
import { tv } from "tailwind-variants";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "default" | "small";
  isLoading?: boolean;
  spinnerSize?: SpinnerSize;
};

export default function Button({
  children,
  variant = "default",
  className,
  isLoading = false,
  size = "default",
  spinnerSize,
  disabled,
  ...props
}: ButtonProps) {
  const buttonVariants = tv({
    base: "w-fit text-white body-3 transition-all ease-in-out duration-200 flex items-center justify-center gap-2",
    variants: {
      variant: {
        default:
          "bg-primary-400 hover:bg-primary-600 disabled:bg-primary-400 disabled:cursor-not-allowed",
        secondary:
          "bg-neutral-500 hover:bg-neutral-600 disabled:bg-neutral-400 disabled:cursor-not-allowed",
        destructive:
          "bg-error-600 hover:bg-error-900 disabled:bg-error-400 disabled:cursor-not-allowed",
        success:
          "bg-success-600 hover:bg-success-900 disabled:bg-success-400 disabled:cursor-not-allowed",
        outline:
          "bg-transparent border border-primary-400 hover:bg-primary-600 disabled:border-primary-300 disabled:text-primary-300 disabled:cursor-not-allowed",
      },
      size: {
        default: "h-[40px] px-6 rounded-lg",
        small: "px-2 h-[32px] rounded",
      },
    },
  });

  // Determine spinner colors based on button variant
  const getSpinnerColors = () => {
    if (variant === "outline") {
      return {
        trackColor: "#4FB7DD", // primary color
        spinnerColor: "transparent",
      };
    }
    return {
      trackColor: "#ffffff", // white
      spinnerColor: "transparent",
    };
  };

  // Determine spinner size based on button size if not explicitly provided
  const getSpinnerSize = () => {
    return spinnerSize ? spinnerSize : size === "small" ? "sm" : "md";
  };

  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Spinner
          size={getSpinnerSize()}
          trackColor={getSpinnerColors().trackColor}
          spinnerColor={getSpinnerColors().spinnerColor}
        />
      ) : null}
      {children}
    </button>
  );
}
