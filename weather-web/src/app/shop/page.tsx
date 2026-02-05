"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Loading } from "@/components/shea/Loading/Loading";
import { StoreCard } from "@/components/feature/StoreCard/StoreCard";

// ダミーデータ（開発用 - 本番では削除）
const DUMMY1_ITEMS = [
  {
    id: 1,
    title: "ベーシックスキン",
    price: 100,
    image: "/images/dummy-1.png",
    isOwned: false,
  },
  {
    id: 2,
    title: "プレミアムスキン",
    price: 200,
    image: "/images/dummy-2.png",
    isOwned: true,
  },
  {
    id: 3,
    title: "レアスキン",
    price: 300,
    image: "/images/dummy-3.png",
    isOwned: false,
  },
  {
    id: 4,
    title: "エピックスキン",
    price: 500,
    image: "/images/dummy-1.png",
    isOwned: false,
  },
  {
    id: 5,
    title: "レジェンドスキン",
    price: 1000,
    image: "/images/dummy-2.png",
    isOwned: false,
  },
];

const DUMMY2_ITEMS = [
  {
    id: 6,
    title: "アイテムA",
    price: 150,
    image: "/images/dummy-3.png",
    isOwned: false,
  },
  {
    id: 7,
    title: "アイテムB",
    price: 250,
    image: "/images/dummy-1.png",
    isOwned: true,
  },
  {
    id: 8,
    title: "アイテムC",
    price: 350,
    image: "/images/dummy-2.png",
    isOwned: false,
  },
];

const DUMMY3_ITEMS = [
  {
    id: 9,
    title: "特別アイテムX",
    price: 500,
    image: "/images/dummy-3.png",
    isOwned: false,
  },
  {
    id: 10,
    title: "特別アイテムY",
    price: 800,
    image: "/images/dummy-1.png",
    isOwned: false,
  },
  {
    id: 11,
    title: "特別アイテムZ",
    price: 1200,
    image: "/images/dummy-2.png",
    isOwned: true,
  },
];

export default function Shop() {
  // const router = useRouter();
  // const [activeTabId, setActiveTabId] = useState("dummy1");
  // const {
  //   data: user,
  //   isLoading: isLoadingUser,
  //   error: userError,
  // } = useGet<UserResponse>("/api/v1/users/me");

  // useEffect(() => {
  //   if (userError && userError.status === 401) {
  //     router.push("/login");
  //   }
  // }, [userError, router]);

  // if (isLoadingUser) return <Loading />;

  // return (
  //   <div className="h-screen flex flex-col bg-main">
  //     <PageHeader
  //       title="ストア"
  //       href="/"
  //       showPoints={true}
  //       // points={user?.point ?? 0}
  //       tabs={[
  //         {
  //           id: "dummy1",
  //           label: "dummy",
  //         },
  //         {
  //           id: "dummy2",
  //           label: "dummy2",
  //         },
  //         {
  //           id: "dummy3",
  //           label: "dummy3",
  //         },
  //       ]}
  //       activeTabId={activeTabId}
  //       onTabChange={(tabId) => {
  //         setActiveTabId(tabId);
  //       }}
  //     />
  //     <main className="bg-white overflow-y-auto h-full py-5 px-4">
  //       <div className="grid grid-cols-3 gap-x-3 gap-y-4">
  //         {activeTabId === "dummy1" &&
  //           DUMMY1_ITEMS.map((item) => (
  //             <StoreCard
  //               key={item.id}
  //               title={item.title}
  //               price={item.price}
  //               image={item.image}
  //               onClick={() => {
  //                 //TODO: 購入処理を追加
  //               }}
  //               currentPoint={user?.point ?? 0}
  //               isOwned={item.isOwned}
  //             />
  //           ))}
  //         {activeTabId === "dummy2" &&
  //           DUMMY2_ITEMS.map((item) => (
  //             <StoreCard
  //               key={item.id}
  //               title={item.title}
  //               price={item.price}
  //               image={item.image}
  //               onClick={() => {
  //                 //TODO: 購入処理を追加
  //               }}
  //               currentPoint={user?.point ?? 0}
  //               isOwned={item.isOwned}
  //             />
  //           ))}
  //         {activeTabId === "dummy3" &&
  //           DUMMY3_ITEMS.map((item) => (
  //             <StoreCard
  //               key={item.id}
  //               title={item.title}
  //               price={item.price}
  //               image={item.image}
  //               onClick={() => {
  //                 //TODO: 購入処理を追加
  //               }}
  //               currentPoint={user?.point ?? 0}
  //               isOwned={item.isOwned}
  //             />
  //           ))}
  //       </div>
  //     </main>
  //   </div>
  // );
}
