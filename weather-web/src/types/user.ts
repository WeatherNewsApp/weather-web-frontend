import { Area } from "./api";

export interface User {
  id: number,
  email: string,
  name: string,
  point: number,
  area: Area,
}

export interface UpdateBestDangoRequest {
  dangoId: number;
}