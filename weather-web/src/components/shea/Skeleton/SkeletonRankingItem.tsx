import { SkeletonBox } from "./SkeletonBox";
import { SkeletonCircle } from "./SkeletonCircle";
import { SkeletonText } from "./SkeletonText";

export const SkeletonRankingItem = () => {
  return (
    <div className="flex items-center justify-between shadow-md rounded-md p-2 bg-radial">
      <div className="flex gap-3">
        <SkeletonCircle className="w-13 h-13" />
        <div className="flex flex-col gap-2">
          <SkeletonText className="w-24 h-3" />
          <SkeletonText className="w-16 h-5" />
        </div>
      </div>
      <SkeletonBox className="w-13 h-13 rounded-sm" />
    </div>
  );
};
