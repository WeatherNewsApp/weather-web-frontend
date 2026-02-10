import type { Dango } from "@/types/dango";
import { Muddy } from "@/components/shea/Muddy/Muddy";

type HistoryDangoProps = Dango;

export const HistoryDango = ({ ...dango }: HistoryDangoProps) => {  
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
      <div className="flex items-end pb-2 border-b-2 border-border-main justify-between">
        <div className="flex flex-col gap-3 w-[180px]">
          <div className="flex items-center justify-between">
            <p>生存日数</p>
            <div className="flex items-end gap-1">
              <p className="font-sen text-lg">{dango.createdAt}</p>
              <p className="text-sm">日</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>成功ケア回数</p>
            <div className="flex items-end gap-1">
              <p className="font-sen text-lg">{dango.successCareCount}</p>
              <p className="text-sm">回</p>
            </div>
          </div>
        </div>
        <div className="max-h-25 max-w-25 overflow-hidden flex items-center justify-center ">
          <Muddy
            face="normal"
            scale="scale-[0.4]"
            headSkin={dango.headSkin}
            bodySkin={dango.bodySkin}
            baseSkin={dango.baseSkin}
            damageLevel={dango.damageLevel}
            growthStage={dango.growthStage}
          />
        </div>
      </div>
      <div className="px-2 flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <p className="">どろ団子を育て始めた日</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">
              {formatDate(dango.caredAt)}
            </p>
            <p>({getWeekday(dango.caredAt)})</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="">どろ団子が死んだ日</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">
              {dango.diedAt ? formatDate(dango.diedAt) : ""}
            </p>
            <p>{dango.diedAt ? `(${getWeekday(dango.diedAt)})` : "生存中"}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="">最大コンボ数</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{dango.maxConsecutive}</p>
            <p>コンボ</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="">合計ポイント数</p>
          <div className="flex items-end gap-1">
            <p className="font-sen text-lg leading-6">{dango.point}</p>
            <p>ポイント</p>
          </div>
        </div>
      </div>
    </div>
  );
};
