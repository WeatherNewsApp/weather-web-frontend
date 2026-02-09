import { SkeletonBox } from "./SkeletonBox";
import { SkeletonCircle } from "./SkeletonCircle";
import { SkeletonText } from "./SkeletonText";

export const SkeletonHome = () => {
  return (
    <main className="bg-radial-close flex flex-col h-screen w-full pt-26">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Weather Section */}
        <div className="flex flex-col items-center gap-3">
          <SkeletonText className="w-32 h-6" />
          <SkeletonCircle className="w-16 h-16" />
          <SkeletonText className="w-40 h-5" />
        </div>

        {/* Dango Section */}
        <div className="relative w-full flex justify-center items-center">
          <SkeletonCircle className="w-[300px] h-[300px]" />
        </div>

        {/* Stats Section */}
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <SkeletonCircle className="w-12 h-12" />
            <SkeletonText className="w-16 h-4" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <SkeletonCircle className="w-12 h-12" />
            <SkeletonText className="w-16 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-8">
        <SkeletonBox className="w-full h-14 rounded-full" />
      </div>
    </main>
  );
};
