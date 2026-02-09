import { SkeletonBox } from "./SkeletonBox";
import { SkeletonCircle } from "./SkeletonCircle";
import { SkeletonText } from "./SkeletonText";

export const SkeletonHistoryDango = () => {
  return (
    <div className="flex gap-4 items-center bg-radial rounded-md shadow-md p-4">
      <SkeletonCircle className="w-[100px] h-[100px]" />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonText className="w-32 h-4" />
        <SkeletonText className="w-24 h-3" />
        <div className="flex gap-2 mt-1">
          <SkeletonBox className="w-16 h-6 rounded-full" />
          <SkeletonBox className="w-16 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};
