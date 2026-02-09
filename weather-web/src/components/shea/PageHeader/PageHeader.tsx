import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/shea/icon";
interface PageHeaderProps {
  title: string;
  href: string;
  showPoints?: boolean;
  points?: number;
  tabs?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export const PageHeader = ({
  title,
  href,
  showPoints = false,
  points = 0,
  tabs,
  activeTabId,
  onTabChange,
}: PageHeaderProps) => {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] z-30 pb-5">
      <header className="pt-6 pb-3 px-4 flex items-start justify-start">
        {tabs ? (
          <Image
            src="/images/page-head-bg.png"
            alt="page-head-bg"
            width={460}
            height={100}
            className="absolute bottom-0 left-0 w-full h-full "
          />
        ) : (
          <Image
            src="/images/page-head-bg-normal.png"
            alt="page-head-bg-normal"
            width={460}
            height={100}
            className="absolute bottom-0 left-0 w-full h-full"
          />
        )}
        <div className="flex items-center justify-between w-full relative">
          <Link href={href} className="text-white w-10 h-10">
            <Icons.chevronLeft className="w-10 h-10" strokeWidth={1} />
          </Link>
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg">
            {title}
          </h2>
          {showPoints && (
            <div className="flex items-center justify-between gap-1 pr-3 bg-white rounded-full w-25">
              <div className="pb-[2px] w-8 flex relative">
                <div className="w-8 h-8 bg-points rounded-full relative z-10 p-1">
                  <Image
                    src="/images/coin.svg"
                    alt="points"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-points-dark z-0" />
              </div>
              <p className="text-accent font-sen">{points}</p>
            </div>
          )}
        </div>
      </header>
      {tabs && tabs.length > 0 && (
        <div className="flex p-4 gap-5 relative z-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "flex items-center gap-1 text-sm rounded-full w-full p-3 justify-center text-white",
                activeTabId === tab.id && "text-black bg-white"
              )}
            >
              {tab.icon && tab.icon}
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
