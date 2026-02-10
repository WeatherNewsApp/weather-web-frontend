"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shea/icon";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";
import { skinRepository } from "@/repositories/skin.repository";
import { dangoRepository } from "@/repositories/dango.repository";

import type { Skin } from "@/types/skin";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  tabId: "normal" | "favorite";
  onTabChange: (tabId: "normal" | "favorite") => void;
  selectedSkinHeadId: number | null;
  selectedSkinBodyId: number | null;
  selectedSkinBaseId: number | null;
  onSkinSelectHead: (skinId: number | null) => void;
  onSkinSelectBody: (skinId: number | null) => void;
  onSkinSelectBase: (skinId: number | null) => void;
  ownedSkinsHead: Skin[];
  ownedSkinsBody: Skin[];
  ownedSkinsBase: Skin[];
  isLoadingOwnedSkinsHead: boolean;
  isLoadingOwnedSkinsBody: boolean;
  isLoadingOwnedSkinsBase: boolean;
  mutateOwnedSkinsHead: () => void;
  mutateOwnedSkinsBody: () => void;
  mutateOwnedSkinsBase: () => void;
  mutateDango: () => void;
}

export const CustomModal = React.memo(({ ...props }: CustomModalProps) => {
  const isDragging = useRef(false);

  const handleApplySkin = async (
    head_skin_id: number | null,
    body_skin_id: number | null,
    base_skin_id: number | null
  ) => {
    try {
      await dangoRepository.changeDangoSkin(
        head_skin_id,
        body_skin_id,
        base_skin_id
      );
      props.onClose();
    } catch (error) {
      console.error("団子スキン変更に失敗しました:", error);
    } finally {
      props.mutateDango();
    }
  };

  const handleFavoriteClick = async (
    skinId: number,
    categoryId: "head" | "body" | "base"
  ) => {
    try {
      const skins =
        categoryId === "head"
          ? props.ownedSkinsHead
          : categoryId === "body"
            ? props.ownedSkinsBody
            : props.ownedSkinsBase;

      const skin = skins.find((s) => s.id === skinId);

      if (skin?.isFavorite) {
        await skinRepository.removeFavoriteSkin(skinId);
      } else {
        await skinRepository.addFavoriteSkin(skinId);
      }

      if (categoryId === "head") {
        props.mutateOwnedSkinsHead();
      } else if (categoryId === "body") {
        props.mutateOwnedSkinsBody();
      } else {
        props.mutateOwnedSkinsBase();
      }
    } catch (error) {
      console.error("お気に入りの更新に失敗しました:", error);
    }
  };

  const handleSkinClick = (categoryId: string, skinId: number) => {
    if (isDragging.current) return;

    const handlers = {
      head: {
        current: props.selectedSkinHeadId,
        handler: props.onSkinSelectHead,
      },
      body: {
        current: props.selectedSkinBodyId,
        handler: props.onSkinSelectBody,
      },
      base: {
        current: props.selectedSkinBaseId,
        handler: props.onSkinSelectBase,
      },
    };

    const { current, handler } = handlers[categoryId as keyof typeof handlers];
    handler(current !== skinId ? skinId : null);
  };

  const isSkinSelected = (categoryId: string, skinId: number) => {
    const selectedIds = {
      head: props.selectedSkinHeadId,
      body: props.selectedSkinBodyId,
      base: props.selectedSkinBaseId,
    };
    return selectedIds[categoryId as keyof typeof selectedIds] === skinId;
  };

  const isAllSkinsSelected = () => {
    return (
      props.selectedSkinHeadId !== null &&
      props.selectedSkinBodyId !== null &&
      props.selectedSkinBaseId !== null
    );
  };

  const getUnselectedCategories = () => {
    const unselected = [];
    if (props.selectedSkinHeadId === null) unselected.push("アタマ");
    if (props.selectedSkinBodyId === null) unselected.push("カラダ");
    if (props.selectedSkinBaseId === null) unselected.push("土台");
    return unselected;
  };

  const categories = [
    {
      id: "head",
      skins:
        props.tabId === "favorite"
          ? props.ownedSkinsHead.filter((skin) => skin.isFavorite)
          : props.ownedSkinsHead,
      isLoading: props.isLoadingOwnedSkinsHead,
    },
    {
      id: "body",
      skins:
        props.tabId === "favorite"
          ? props.ownedSkinsBody.filter((skin) => skin.isFavorite)
          : props.ownedSkinsBody,
      isLoading: props.isLoadingOwnedSkinsBody,
    },
    {
      id: "base",
      skins:
        props.tabId === "favorite"
          ? props.ownedSkinsBase.filter((skin) => skin.isFavorite)
          : props.ownedSkinsBase,
      isLoading: props.isLoadingOwnedSkinsBase,
    },
  ];

  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          className="w-full h-full fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* オーバーレイ */}
          <motion.div
            className="absolute inset-0 bg-black opacity-80"
            onClick={props.onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* コンテンツ */}
          <motion.div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full rounded-t-lg bg-radial max-w-[460px] pb-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-main p-4 rounded-t-lg flex justify-between items-center gap-5">
              <button
                className={cn(
                  "rounded-full h-12 flex items-center justify-center gap-2 text-white w-full",
                  props.tabId === "normal" && "bg-white text-black"
                )}
                onClick={() => props.onTabChange("normal")}
              >
                <Icons.custom className="w-5 h-5" />
                <p className="text-sm">カスタム一覧</p>
              </button>
              <button
                className={cn(
                  "rounded-full h-12 flex items-center justify-center gap-2 text-white w-full",
                  props.tabId === "favorite" && "bg-white text-black"
                )}
                onClick={() => props.onTabChange("favorite")}
              >
                <Icons.favorite className="w-5 h-5" />
                <p className="text-sm">お気に入り一覧</p>
              </button>
            </div>
            <div className="pt-7 pb-10">
              <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                centeredSlides={true}
                slidesPerView="auto"
                initialSlide={0}
                spaceBetween={40}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: false,
                }}
                className="w-full px-6"
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.id} className="!w-auto">
                    <div
                      className={cn(
                        "bg-white rounded-lg p-3 grid grid-cols-3 gap-2 min-w-[328px] min-h-[320px]",
                        getUnselectedCategories().length > 0 &&
                          "opacity-80 cursor-not-allowed"
                      )}
                    >
                      {category.skins.map((skin) => (
                        <div
                          key={skin.id}
                          className={cn(
                            "relative flex items-center justify-center aspect-square overflow-hidden rounded-sm w-24 h-24 cursor-pointer transition-all duration-200",
                            isSkinSelected(category.id, skin.id) &&
                              "bg-radial ring-2 ring-accent"
                          )}
                          onClick={() => handleSkinClick(category.id, skin.id)}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <Muddy
                              face="normal"
                              scale="scale-[0.3]"
                              headSkin={
                                category.id === "head"
                                  ? skin.imageKey
                                  : undefined
                              }
                              bodySkin={
                                category.id === "body"
                                  ? skin.imageKey
                                  : undefined
                              }
                              baseSkin={
                                category.id === "base"
                                  ? skin.imageKey
                                  : undefined
                              }
                              growthStage="1"
                              damageLevel="1"
                            />
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavoriteClick(
                                skin.id,
                                category.id as "head" | "body" | "base"
                              );
                            }}
                            className="absolute top-1 right-1 w-7 h-7 z-20 transition-transform hover:scale-110"
                            aria-label={
                              skin.isFavorite
                                ? "お気に入りから削除"
                                : "お気に入りに追加"
                            }
                          >
                            {skin.isFavorite ? (
                              <Icons.trueHeart />
                            ) : (
                              <Icons.favorite
                                className="w-7 h-7"
                                strokeWidth={1.2}
                              />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="px-4">
              <PrimaryButton
                label="どろ団子につけてあげる"
                onClick={() =>
                  handleApplySkin(
                    props.selectedSkinHeadId ?? null,
                    props.selectedSkinBodyId ?? null,
                    props.selectedSkinBaseId ?? null
                  )
                }
                shadow={true}
                py="py-4"
                disabled={!isAllSkinsSelected()}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CustomModal.displayName = "CustomModal";
