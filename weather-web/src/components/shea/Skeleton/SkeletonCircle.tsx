import { cn } from "@/lib/utils";

interface SkeletonCircleProps {
  className?: string;
}

export const SkeletonCircle = ({ className }: SkeletonCircleProps) => {
  return (
    <div 
      className={cn(
        "bg-gray-200 animate-pulse rounded-full",
        className
      )} 
    />
  );
};
