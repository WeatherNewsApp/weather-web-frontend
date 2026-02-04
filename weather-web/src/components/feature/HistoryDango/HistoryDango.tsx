import { HistoryDangoResponse } from "@/types/api";
import { Muddy } from "@/components/shea/Muddy/Muddy";

type HistoryDangProps = Omit<HistoryDangoResponse, 'id'>;

export const HistoryDango = ({
  totalDaysAlive,
  caredAt,
  headSkin,
  bodySkin,
  baseSkin,
  damageLevel,
  growthLevel,
  diedAt,
  successCareCount,
  point,
  maxConsecutive,
}: HistoryDangProps) => {
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const getWeekday = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ja-JP", { weekday: "short" });
  };

  return (
    <div className="flex flex-col gap-5 py-5 px-3 rounded-md bg-radial shadow-md w-full ">
      <div className="flex items-end pb-2 border-b-[0.5px] border-black justify-between">
        <div className="flex flex-col gap-3 w-[180px]">
          <div className="flex items-center justify-between">
            <p>生存日数</p>
            <div className="flex items-end gap-1">
              <p className="font-sen text-lg">{totalDaysAlive}</p>
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
        <Muddy
          face="normal"
          scale=""
          width="w-[100px]"
          height="h-[100px]"
          headSkin={headSkin}
          bodySkin={bodySkin}
          baseSkin={baseSkin}
          damageLevel={damageLevel}
          growthLevel={growthLevel}
        />
      </div>
      <div className="px-2 flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <p className="">どろ団子を育て始めた日</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">
              {formatDate(caredAt)}
            </p>
            <p>({getWeekday(caredAt)})</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="">どろ団子が死んだ日</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">
              {diedAt ? formatDate(diedAt) : ""}
            </p>
            <p>
              {diedAt ? `(${getWeekday(diedAt)})` : "生存中"}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="">最大コンボ数</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{maxConsecutive}</p>
            <p>コンボ</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="">合計ポイント数</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{point}</p>
            <p>ポイント</p>
          </div>
        </div>
      </div>
    </div>
  );
};
