import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { HistoryDango } from "@/components/feature/HistoryDango/HistoryDango";

export default function history() {
  // const {historyDango, isLoading, error} = useGet<HistoryDangoResponse>('api/history/dango');
  const historyDangoData = [
    {
      survivalDays: 100,
      successCareCount: 100,
      startDate: "2024-02-04",
      deathDate: "2024-05-14",
      xCombo: 100,
      totalPoints: 100,
    },
    {
      survivalDays: 85,
      successCareCount: 85,
      startDate: "2023-11-10",
      deathDate: "2024-02-03",
      xCombo: 95,
      totalPoints: 850,
    },
    {
      survivalDays: 72,
      successCareCount: 70,
      startDate: "2023-08-20",
      deathDate: "2023-10-31",
      xCombo: 80,
      totalPoints: 720,
    },
    {
      survivalDays: 65,
      successCareCount: 63,
      startDate: "2023-06-01",
      deathDate: "2023-08-05",
      xCombo: 75,
      totalPoints: 650,
    },
    {
      survivalDays: 58,
      successCareCount: 55,
      startDate: "2023-03-15",
      deathDate: "2023-05-12",
      xCombo: 68,
      totalPoints: 580,
    },
    {
      survivalDays: 51,
      successCareCount: 48,
      startDate: "2023-01-01",
      deathDate: "2023-02-21",
      xCombo: 60,
      totalPoints: 510,
    },
    {
      survivalDays: 42,
      successCareCount: 40,
      startDate: "2022-11-10",
      deathDate: "2022-12-22",
      xCombo: 50,
      totalPoints: 420,
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
