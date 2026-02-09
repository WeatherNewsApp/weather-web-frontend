import { cn } from "@/lib/utils";

interface SkeletonTextProps {
  className?: string;
}

export const SkeletonText = ({ className }: SkeletonTextProps) => {
  return (
    <div className={cn("bg-gray-200 animate-pulse rounded h-4", className)} />
  );
};
