"use client";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shea/icon";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { PrimaryButton } from "@/components/shea/PrimaryButton/PrimaryButton";
import { skinRepository } from "@/repositories/skin.repository";

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
}

const handleApplySkin = (skinId: number) => {
  
}

export const CustomModal = ({
  ...props
}: CustomModalProps) => {
  console.log(props.ownedSkinsHead);
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
              <div className="flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide px-[calc(10% + 14px)]">
                {categories.map((category) => (
                  <div
                    className="snap-center min-w-[80%]"
                    key={category.id}
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
                            onClick={() => handleFavoriteClick(skin.id, category.id as "head" | "body" | "base")}
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
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4">
              <PrimaryButton
                label="どろ団子につけてあげる"
                onClick={() => {}}
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