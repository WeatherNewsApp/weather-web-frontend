import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { HistoryDango } from "@/components/feature/HistoryDango/HistoryDango";

export default function history() {
  // const {historyDango, isLoading, error} = useGet<HistoryDangoResponse>('api/history/dango');
  const historyDangoData = [
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2/4",
      deathDate: "2/5",
      xCombo: 100,
      totalPoints: 100,
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <PageHeader title="アーカイブ" href="/settings" />
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4">
        <div className="flex flex-col gap-6 items-center justify-center w-full">
          {historyDangoData.map((data, index) => (
            <HistoryDango
              key={index}
              survivalDays={data.survivalDays}
              successCareCount={data.successCareCount}
              startDate={data.startDate}
              deathDate={data.deathDate}
              xCombo={data.xCombo}
              totalPoints={data.totalPoints}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
