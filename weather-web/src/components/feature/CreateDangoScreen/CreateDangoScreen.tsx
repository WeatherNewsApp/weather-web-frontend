import React from "react";

interface CreateDangoScreenProps {
  onCreateDango: () => void;
}

export const CreateDangoScreen = React.memo(
  ({ onCreateDango }: CreateDangoScreenProps) => {
    return (
      <main className="bg-radial-close flex flex-col items-center justify-center h-screen w-full px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">団子がありません</h2>
            <p className="text-gray-600">新しい団子を作成してください</p>
          </div>
          <button
            onClick={onCreateDango}
            className="bg-accent text-white px-8 py-4 rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            新しい団子を作る
          </button>
        </div>
      </main>
    );
  }
);

CreateDangoScreen.displayName = "CreateDangoScreen";
