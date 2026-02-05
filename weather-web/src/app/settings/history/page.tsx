"use client";

import { Icons } from "@/components/shea/icon";
import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { HistoryDango } from "@/components/feature/HistoryDango/HistoryDango";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/shea/Loading/Loading";
import { useDangos } from "@/hooks/useDangos";

export default function history() {

  const router = useRouter();
  const { dangos, isLoadingDangos } = useDangos();

  if (isLoadingDangos) return <Loading />;
  return (
    <div className="h-screen flex flex-col">
      <PageHeader title="アーカイブ" href="/settings" />
        {dangos && dangos.length === 0 ? (
          <main className="flex-1 bg-white overflow-y-auto py-7 px-4 pt-26">
            <div className="flex flex-col h-full justify-center items-center">
              <div className="flex gap-5 items-end">
                <span className="bg-accent w-1 h-10 rounded-full origin-bottom -rotate-45"></span>
                <span className="bg-accent w-1 h-10 rounded-full"></span>
                <span className="bg-accent w-1 h-10 rounded-full origin-bottom rotate-45"></span>
              </div>
              <Icons.bookOpen />
              <div className="flex flex-col items-center justify-center gap-1 mt-5">
                <h2 className="text-lg">まだ記録がありません</h2>
                <p>あなたの初めてのどろ団子を育てましょう！</p>
              </div>
              <PrimaryButton
                label="どろ団子を育てにいく"
                onClick={() => router.push('/settings')}
                py="mt-15 py-[18px]"
              />
            </div>
          </main>
        ): (
          <main className="flex flex-col gap-5 bg-white overflow-y-auto py-7 px-4 -26">
            {dangos && dangos.map((dango) => (
              <HistoryDango
                key={dango.id} 
                headSkin={dango.headSkin}
                bodySkin={dango.bodySkin}
                baseSkin={dango.baseSkin}
                damageLevel={dango.damageLevel}
                growthStage={dango.growthStage}
                totalDaysAlive={dango.totalDaysAlive}
                successCareCount={dango.successCareCount}
                caredAt={dango.caredAt}
                diedAt={dango.diedAt || ""}
                maxConsecutive={dango.maxConsecutive}
                point={dango.point}
              />
            ))}
          </main>
        )}
    </div>
  );
}
