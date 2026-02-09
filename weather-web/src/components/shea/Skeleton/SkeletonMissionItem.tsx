import { SkeletonBox } from "./SkeletonBox";
import { SkeletonText } from "./SkeletonText";

export const SkeletonMissionItem = () => {
  return (
    <div className="bg-radial shadow-md rounded-md px-4 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <SkeletonText className="w-32 h-4" />
        <SkeletonBox className="w-16 h-6 rounded-full" />
      </div>
      <SkeletonText className="w-full h-3" />
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-6 h-6 rounded-full" />
        <SkeletonText className="w-12 h-4" />
      </div>
    </div>
  );
};
