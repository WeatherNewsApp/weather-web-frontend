import { apiClient } from "@/lib/api/client";
import type { Skin } from "@/types/skin";
import type { ApiResponse } from "@/types/api";

export const skinRepository = {
  // アタマスキン一覧取得
  getSkinsHead: async () => {
    const res = await apiClient.get<{ skins: Omit<Skin, "isFavorite">[] }>(
      "/api/v1/skins?category=head"
    );
    return res.skins;
  },

  // カラダスキン一覧取得
  getSkinsBody: async () => {
    const res = await apiClient.get<{ skins: Omit<Skin, "isFavorite">[] }>(
      "/api/v1/skins?category=body"
    );
    return res.skins;
  },

  // 土台スキン一覧取得
  getSkinsBase: async () => {
    const res = await apiClient.get<{ skins: Omit<Skin, "isFavorite">[] }>(
      "/api/v1/skins?category=base"
    );
    return res.skins;
  },

  // 所持アタマスキン一覧受け取り
  getOwnedSkinsHead: async () => {
    const res = await apiClient.get<{ skins: Skin[] }>(
      "/api/v1/skins?category=head&scope=owned"
    );
    return res.skins;
  },

  // 所持カラダスキン一覧受けとり
  getOwnedSkinsBody: async () => {
    const res = await apiClient.get<{ skins: Skin[] }>(
      "/api/v1/skins?category=body&scope=owned"
    );
    return res.skins;
  },

  // 所持土台スキン一覧受け取り
  getOwnedSkinsBase: async () => {
    const res = await apiClient.get<{ skins: Skin[] }>(
      "/api/v1/skins?category=base&scope=owned"
    );
    return res.skins;
  },

  // スキン受け取り
  purchaseSkin: async (skinId: number) => {
    const res = await apiClient.post<ApiResponse>(
      `/api/v1/skins/${skinId}`,
      skinId
    );
    return res;
  },

  // スキンのお気にり登録
  addFavoriteSkin: async (skinId: number) => {
    const res = await apiClient.post<ApiResponse>(
      `/api/v1/skins/${skinId}/favorite`
    );

    return res;
  },

  // スキンのお気にり解除
  removeFavoriteSkin: async (skinId: number) => {
    const res = await apiClient.delete<ApiResponse>(
      `/api/v1/skins/${skinId}/favorite`
    );
    return res;
  },
};
