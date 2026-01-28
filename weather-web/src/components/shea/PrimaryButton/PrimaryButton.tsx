import { cn } from "@/lib/utils";
import { Icons } from "../icon";

export interface PrimaryButtonProps {
  label: string;
  type?: "button" | "submit";
  py?: string;
  maxWidth?: string;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  shadow?: boolean;
  variant?: "accent" | "secondary" | "danger";
}

export const PrimaryButton = ({
  label,
  py = "py-3",
  maxWidth = "max-w-full",
  disabled = false,
  onClick,
  isLoading,
  type = "button",
  shadow = false,
  variant = "accent",
}: PrimaryButtonProps) => {
  const variantStyles = {
    accent: {
      bg: "bg-accent",
      shadowBg: "bg-accent-dark",
    },
    secondary: {
      bg: "bg-gray",
      shadowBg: "bg-gray-dark",
    },
    danger: {
      bg: "bg-error",
      shadowBg: "bg-error-dark",
    },
  };

  const styles = variantStyles[variant];

  const buttonContent = isLoading ? (
    <span className="flex items-center justify-center">
      <Icons.loader className="w-6 h-6 animate-spin" />
    </span>
  ) : (
    label
  );

  if (!shadow) {
    return (
      <button
        type={type}
        onClick={type === "submit" ? undefined : onClick}
        disabled={disabled || isLoading}
        className={cn(
          "font-medium text-lg rounded-full w-full text-white mt-15",
          styles.bg,
          py,
          maxWidth,
          (disabled || isLoading) && "opacity-40"
        )}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={type === "submit" ? undefined : onClick}
      disabled={disabled || isLoading}
      className={cn(
        "relative w-full",
        maxWidth,
        (disabled || isLoading) && "opacity-40"
      )}
    >
      <div
        className={cn(
          "font-medium rounded-sm w-full relative z-20 text-white",
          styles.bg,
          py
        )}
      >
        {buttonContent}
      </div>
      <span
        className={cn(
          "absolute w-full h-full rounded-sm top-1 left-0 z-10",
          styles.shadowBg
        )}
      />
    </button>
  );
};
