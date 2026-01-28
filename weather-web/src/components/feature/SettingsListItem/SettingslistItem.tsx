"use client";

import Link from "next/link";
import { Icons } from "@/components/shea/icon";

interface SettingsListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  variant?: "default" | "danger";
  showChevron?: boolean;
}

export const SettingsListItem = ({
  icon,
  title,
  subtitle,
  href,
  onClick,
  rightElement,
  variant = "default",
  showChevron = true,
}: SettingsListItemProps) => {
  const iconColorClass = variant === "danger" ? "text-error" : "text-accent";

  const leftContent = (
    <div className="flex items-center gap-2">
      {icon && <div className={iconColorClass}>{icon}</div>}
      <div className={subtitle ? "flex flex-col gap-1" : ""}>
        <p className={`${subtitle ? "text-lg" : ""}`}>{title}</p>
        {subtitle && <p className="text-sm opacity-60">{subtitle}</p>}
      </div>
    </div>
  );
  const rightContent = rightElement ? (
    rightElement
  ) : showChevron ? (
    <Icons.chevronRight className="w-8 h-8" strokeWidth={1} />
  ) : null;

  const itemClassName =
    "flex items-center justify-between w-full border-b border-b-[0.5px] py-4 px-3";

  if (href) {
    return (
      <li>
        <Link href={href} className={itemClassName}>
          {leftContent}
          {rightContent}
        </Link>
      </li>
    );
  }

  if (onClick) {
    return (
      <li>
        <button onClick={onClick} className={`${itemClassName} text-left`}>
          {leftContent}
          {rightContent}
        </button>
      </li>
    );
  }

  return (
    <li className={itemClassName}>
      {leftContent}
      {rightContent}
    </li>
  );
};
