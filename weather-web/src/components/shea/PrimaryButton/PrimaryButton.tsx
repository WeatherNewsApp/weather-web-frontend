import { cn } from "@/lib/utils";
import { Icons } from "../icon";

interface PrimaryButtonProps {
  label: string;
  type?: "button" | "submit";
  py?: string;
  maxWidth?: string;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export const PrimaryButton = ({
  label,
  py = "py-3",
  maxWidth = "max-w-full",
  disabled = false,
  onClick,
  isLoading,
  type = "button",
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={type === "submit" ? undefined : onClick}
      disabled={disabled || isLoading}
      className={cn(
        "font-medium text-lg bg-accent rounded-full w-full text-white mt-15",
        py,
        maxWidth,
        (disabled || isLoading) && "opacity-40"
      )}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Icons.loader className="w-6 h-6 animate-spin" />
        </span>
      ) : (
        label
      )}
    </button>
  );
};
