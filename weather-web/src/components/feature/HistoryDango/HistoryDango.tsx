import Image from "next/image";

interface HistoryDangoProps {
  survivalDays: number;
  successCareCount: number;
  startDate: string;
  deathDate: string;
  xCombo: number;
  totalPoints: number;
}

export const HistoryDango = ({
  survivalDays,
  successCareCount,
  startDate,
  deathDate,
  xCombo,
  totalPoints,
}: HistoryDangoProps) => {
  return (
    <div className="flex flex-col gap-5 py-5 px-3 rounded-md bg-radial shadow-md w-full ">
      <div className="flex items-end pb-2 border-b-[0.5px] border-black justify-between">
        <div className="flex flex-col gap-3 w-[180px]">
          <div className="flex items-center justify-between">
            <p>生存日数</p>
            <div className="flex items-end gap-1">
              <p className="font-sen text-lg">{survivalDays}</p>
              <p className="text-sm">日</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>成功ケア回数</p>
            <div className="flex items-end gap-1">
              <p className="font-sen text-lg">{successCareCount}</p>
              <p className="text-sm">回</p>
            </div>
          </div>
        </div>
        {/* ダミー */}
        <Image
          src="/images/dummy-image.png"
          alt="dummy-image"
          width={100}
          height={100}
        />
      </div>
      <div className="px-2 flex flex-col gap-4">
        <div className="flex item-end justify-between">
          <p className="">どろ団子を育て始めた日</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{startDate}</p>
            <p>(金)</p>
          </div>
        </div>
        <div className="flex item-end justify-between">
          <p className="">どろ団子が死んだ日</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{deathDate}</p>
            <p>(土)</p>
          </div>
        </div>
        <div className="flex item-end justify-between">
          <p className="">最大コンボ数</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{xCombo}</p>
            <p>コンボ</p>
          </div>
        </div>
        <div className="flex item-end justify-between">
          <p className="">合計ポイント数</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{totalPoints}</p>
            <p>ポイント</p>
          </div>
        </div>
      </div>
    </div>
  );
};
