export interface Skin {
  id: number;
  name: string;
  imageKey: string;
  rarity: "common" | "rare" | "epic";
  price: number;
  isOwned: boolean;
  isFavorite?: boolean;
}
