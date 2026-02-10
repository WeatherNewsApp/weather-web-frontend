"use client";

import { useState, useCallback, useMemo } from "react";
import { mutate } from "swr";

import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { SkeletonCard } from "@/components/shea/Skeleton";
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

  const isInitialLoading = useMemo(
    () =>
      (isLoadingHead && !skinsHead) ||
      (isLoadingBody && !skinsBody) ||
      (isLoadingBase && !skinsBase),
    [isLoadingHead, skinsHead, isLoadingBody, skinsBody, isLoadingBase, skinsBase]
  );

  const handlePurchaseSkin = useCallback(
    async (skinId: number, category: "head" | "body" | "base") => {
    try {
      const res = await skinRepository.purchaseSkin(skinId);
      if (res.success) {
        if (category === "head") {
          await mutateHead();
          await mutate("/api/v1/skins?category=head&scope=owned");
        } else if (category === "body") {
          await mutateBody();
          await mutate("/api/v1/skins?category=body&scope=owned");
        } else {
          await mutateBase();
          await mutate("/api/v1/skins?category=base&scope=owned");
        }

        // ユーザー情報を強制的に再取得
        await refreshUser();
      }
    } catch (error) {
      console.error(error);
    }
  }, [mutateHead, mutateBody, mutateBase, refreshUser]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

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
        onTabChange={handleTabChange}
      />
      <main className="bg-white overflow-y-auto h-full py-5 px-4 pt-[201px]">
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {activeTabId === "head" && isInitialLoading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : activeTabId === "head" &&
              skinsHead?.map((item) => (
                <StoreCard
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  onClick={() => handlePurchaseSkin(item.id, "head")}
                  currentPoint={user?.point ?? 0}
                  isOwned={item.isOwned}
                  imageKey={item.imageKey}
                  category="head"
                />
              ))}
          {activeTabId === "body" && isInitialLoading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : activeTabId === "body" &&
              skinsBody?.map((item) => (
                <StoreCard
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  onClick={() => handlePurchaseSkin(item.id, "body")}
                  currentPoint={user?.point ?? 0}
                  isOwned={item.isOwned}
                  imageKey={item.imageKey}
                  category="body"
                />
              ))}
          {activeTabId === "base" && isInitialLoading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : activeTabId === "base" &&
              skinsBase?.map((item) => (
                <StoreCard
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  onClick={() => handlePurchaseSkin(item.id, "base")}
                  currentPoint={user?.point ?? 0}
                  isOwned={item.isOwned}
                  imageKey={item.imageKey}
                  category="base"
                />
              ))}
        </div>
      </main>
    </div>
  );
}
