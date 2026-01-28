import Link from "next/link";
import { Icons } from "@/components/shea/icon";

interface PageHeaderProps {
  title: string;
  href: string;
}

export const PageHeader = ({ title, href }: PageHeaderProps) => {
  return (
    <header className="flex-shrink-0 pt-6 pb-3 px-4 bg-main flex items-start justify-start relative">
      <Link href={href} className="text-white w-10 h-10">
        <Icons.chevronLeft className="w-10 h-10" strokeWidth={1} />
      </Link>
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg">
        {title}
      </h2>
    </header>
  );
};
