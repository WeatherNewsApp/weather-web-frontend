"use client";

import { useState } from "react";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { Loading } from "@/components/shea/Loading/Loading";
import { StoreCard } from "@/components/feature/StoreCard/StoreCard";
import { useUserStore } from "@/store/user.store";
import { useSkinsHead, useSkinsBody, useSkinsBase } from "@/hooks/useSkins";
import { skinRepository } from "@/repositories/skin.repository";

export default function Shop() {
  const { user, refreshUser } = useUserStore();
  const [activeTabId, setActiveTabId] = useState("head");

  const { skinsHead, isLoadingHead, mutateHead } = useSkinsHead();
  const { skinsBody, isLoadingBody, mutateBody } = useSkinsBody();
  const { skinsBase, isLoadingBase, mutateBase } = useSkinsBase();

  // 初回ロード時のみローディング表示
  const isInitialLoading = (isLoadingHead && !skinsHead) || (isLoadingBody && !skinsBody) || (isLoadingBase && !skinsBase);

  if (isInitialLoading) return <Loading />;

  const handlePurchaseSkin = async (skinId: number, category: "head" | "body" | "base") => {
    try {
      const res = await skinRepository.purchaseSkin(skinId);
      if (res.success) {
        // 購入したカテゴリーのみ再取得
        if (category === "head") {
          await mutateHead();
        } else if (category === "body") {
          await mutateBody();
        } else {
          await mutateBase();
        }
        
        // ユーザー情報を強制的に再取得
        await refreshUser();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-main">
      <PageHeader
        title="ストア"
        href="/"
        showPoints={true}
        points={user?.point ?? 0}
        tabs={[
          {
            id: "head",
            label: "アタマ",
          },
          {
            id: "body",
            label: "カラダ",
          },
          {
            id: "base",
            label: "土台",
          },
        ]}
        activeTabId={activeTabId}
        onTabChange={(tabId) => {
          setActiveTabId(tabId);
        }}
      />
      <main className="bg-white overflow-y-auto h-full py-5 px-4 pt-[201px]">
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {activeTabId === "head" &&
            skinsHead?.map((item) => (
              <StoreCard
                key={item.id}
                title={item.name}
                price={item.price}
                onClick={() => handlePurchaseSkin(item.id, "head")}
                currentPoint={user?.point ?? 0}
                isOwned={item.isOwned}
                imageUrl={item.imageUrl}
                category="head"
              />
            ))}
          {activeTabId === "body" &&
            skinsBody?.map((item) => (
              <StoreCard
                key={item.id}
                title={item.name}
                price={item.price}
                onClick={() => handlePurchaseSkin(item.id, "body")}
                currentPoint={user?.point ?? 0}
                isOwned={item.isOwned}
                imageUrl={item.imageUrl}
                category="body"
              />
            ))}
          {activeTabId === "base" &&
            skinsBase?.map((item) => (
              <StoreCard
                key={item.id}
                title={item.name}
                price={item.price}
                onClick={() => handlePurchaseSkin(item.id, "base")}
                currentPoint={user?.point ?? 0}
                isOwned={item.isOwned}
                imageUrl={item.imageUrl}
                category="base"
              />
            ))}
        </div>
      </main>
    </div>
  );
}
