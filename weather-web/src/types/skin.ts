export interface Skin {
  id: number;
  name: string;
  imageUrl: string;
  rarity: "common" | "rare" | "epic";
  price: number;
  isOwned: boolean;
  isFavorite?: boolean;
}