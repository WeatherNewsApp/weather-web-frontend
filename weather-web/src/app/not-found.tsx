import {Muddy} from "@/components/shea/Muddy/Muddy";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-radial">
      <div className="flex flex-col gap-2 w-fit bg-[#fff] rounded-sm shadow-speech py-3 px-6 speech-bubble relative z-10">
        <p>ページが見つからなかったよ</p>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Muddy
          face="sad"
          scale="scale-[0.8]"
          growthStage="1"
          damageLevel="1"
        />
      </div>
      <div className="flex gap-2 items-end justify-center">
        <p className="text-[40px] font-sen">404</p>
        <p className="pb-3 font-sen">Not Found</p>
      </div>
    </main>
  )
}