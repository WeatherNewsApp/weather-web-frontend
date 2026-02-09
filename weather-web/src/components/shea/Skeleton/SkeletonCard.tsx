import { SkeletonBox } from "./SkeletonBox";
import { SkeletonCircle } from "./SkeletonCircle";
import { SkeletonText } from "./SkeletonText";

export const SkeletonCard = () => {
  return (
    <div className="bg-radial rounded-md py-3 px-1 flex flex-col justify-center items-center">
      <div className="flex items-center justify-center w-20 h-20">
        <SkeletonCircle className="w-20 h-20" />
      </div>
      <SkeletonText className="w-16 h-3 mt-5 mb-2" />
      <SkeletonBox className="w-20 h-10 rounded-full" />
    </div>
  );
};
