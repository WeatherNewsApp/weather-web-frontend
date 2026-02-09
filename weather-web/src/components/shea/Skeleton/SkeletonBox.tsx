import { cn } from "@/lib/utils";

interface SkeletonBoxProps {
  className?: string;
}

export const SkeletonBox = ({ className }: SkeletonBoxProps) => {
  return (
    <div 
      className={cn(
        "bg-gray-200 animate-pulse rounded",
        className
      )} 
    />
  );
};
