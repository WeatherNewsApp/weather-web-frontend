"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

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
  mutateDangos: () => void;
}

export const CustomModal = ({
  ...props
}: CustomModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  

  // 団子スキン変更
  const handleApplySkin = async (head_skin_id: number | null, body_skin_id: number | null, base_skin_id: number | null) => {
    try {
      await dangoRepository.changeDangoSkin(head_skin_id, body_skin_id, base_skin_id);
    } catch (error) {
      console.error("団子スキン変更に失敗しました:", error);
    } finally {
      props.mutateDangos();
    }
  }

  // お気に入りの更新
  const handleFavoriteClick = async (skinId: number, categoryId: "head" | "body" | "base") => {
    try {
      const skins = categoryId === "head" 
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
  }

  const categories = [
    {
      id: "head",
      skins: props.tabId === "favorite"
        ? props.ownedSkinsHead.filter((skin) => skin.isFavorite)
        : props.ownedSkinsHead,
      isLoading: props.isLoadingOwnedSkinsHead,
    },
    {
      id: "body",
      skins: props.tabId === "favorite"
        ? props.ownedSkinsBody.filter((skin) => skin.isFavorite)
        : props.ownedSkinsBody,
      isLoading: props.isLoadingOwnedSkinsBody,
    },
    {
      id: "base",
      skins: props.tabId === "favorite"
        ? props.ownedSkinsBase.filter((skin) => skin.isFavorite)
        : props.ownedSkinsBase,
      isLoading: props.isLoadingOwnedSkinsBase,
    }
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
                  props.tabId === "normal" && "bg-white text-black",
                )}
                onClick={() => props.onTabChange("normal")}
              >
                <Icons.custom className="w-5 h-5"/>
                <p className="text-sm">カスタム一覧</p>
              </button>
              <button
                className={cn(
                  "rounded-full h-12 flex items-center justify-center gap-2 text-white w-full",
                  props.tabId === "favorite" && "bg-white text-black"
                )}
                onClick={() => props.onTabChange("favorite")}
              >
                <Icons.favorite className="w-5 h-5"/>
                <p className="text-sm">お気に入り一覧</p>
              </button>
            </div>
            <div className="pt-7 pb-10">
              <div ref={containerRef} className="overflow-hidden px-[calc(10%+14px)]">
                <motion.div
                  className="flex gap-4"
                  drag="x"
                  dragConstraints={{
                    left: -(categories.length - 1) * (containerRef.current?.clientWidth || 0),
                    right: 0,
                  }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    const containerWidth = containerRef.current?.clientWidth || 0;
                    const cardWidth = containerWidth * 0.8 + 16; // 80% + gap
                    
                    // ドラッグの速度と距離から次のインデックスを決定
                    const offset = info.offset.x;
                    const velocity = info.velocity.x;
                    
                    let newIndex = currentIndex;
                    
                    if (velocity > 500 || offset > cardWidth / 3) {
                      // 左にスワイプ（前のカードへ）
                      newIndex = Math.max(0, currentIndex - 1);
                    } else if (velocity < -500 || offset < -cardWidth / 3) {
                      // 右にスワイプ（次のカードへ）
                      newIndex = Math.min(categories.length - 1, currentIndex + 1);
                    }
                    
                    setCurrentIndex(newIndex);
                  }}
                  animate={{
                    x: -currentIndex * ((containerRef.current?.clientWidth || 0) * 0.8 + 16),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {categories.map((category, index) => (
                    <motion.div
                      className="min-w-[80%] max-w-[80%]"
                      key={category.id}
                      animate={{
                        scale: currentIndex === index ? 1 : 0.95,
                        opacity: currentIndex === index ? 1 : 0.7,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="grid grid-cols-3 grid-rows-4 gap-3 max-h-[400px] min-h-[400px] overflow-y-auto bg-white rounded-lg p-3 h-full">
                        {category.skins.map((skin) => (
                          <div 
                            className="relative" 
                            key={skin.id}
                          >
                            <div
                              className={cn(
                                "relative flex items-center justify-center aspect-square h-auto overflow-hidden rounded-sm z-10",
                                (category.id === "head" && props.selectedSkinHeadId === skin.id) && "bg-radial",
                                (category.id === "body" && props.selectedSkinBodyId === skin.id) && "bg-radial",
                                (category.id === "base" && props.selectedSkinBaseId === skin.id) && "bg-radial",
                              )}
                              onClick={() => {
                                if (category.id === "head") {
                                  props.selectedSkinHeadId !== skin.id ? props.onSkinSelectHead(skin.id) : props.onSkinSelectHead(null);
                                } 
                                if (category.id === "body") {
                                  props.selectedSkinBodyId !== skin.id ? props.onSkinSelectBody(skin.id) : props.onSkinSelectBody(null);
                                }
                                if (category.id === "base") {
                                  props.selectedSkinBaseId !== skin.id ? props.onSkinSelectBase(skin.id) : props.onSkinSelectBase(null);
                                }
                              }}
                            >
                              <Muddy
                                face="normal"
                                scale="scale-[0.3]"
                                headSkin={category.id === "head" ? skin.imageUrl : undefined}
                                bodySkin={category.id === "body" ? skin.imageUrl : undefined}
                                baseSkin={category.id === "base" ? skin.imageUrl : undefined}
                                growthStage="1"
                                damageLevel="1"
                              />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteClick(skin.id, category.id as "head" | "body" | "base");
                              }}
                              className="absolute top-0 right-0 w-7 h-7 z-20"
                            >
                              {skin.isFavorite ? (
                                <Icons.favorite className="w-7 h-7 bg-error"/>
                              ) : (
                                <Icons.favorite className="w-7 h-7"/>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="px-4">
              <PrimaryButton
                label="どろ団子につけてあげる"
                onClick={() => handleApplySkin(props.selectedSkinHeadId ?? null, props.selectedSkinBodyId ?? null, props.selectedSkinBaseId ?? null)}
                shadow={true}
                py="py-4"
              />
            </div>
          </motion.div>
        </motion.div>  
      )}
    </AnimatePresence>
  )
};