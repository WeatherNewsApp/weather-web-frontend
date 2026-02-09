import { z } from "zod";

export const updateUserSchema = z
  .object({
    email: z.string().email("※メールアドレスの形式が正しくありません"),
    name: z.string().min(1, { message: "※ユーザーネームが入力されていません" }),
  })
  .refine((data) => data.email !== data.name, {
    message: "※メールアドレスとユーザーネームは異なるものを入力してください",
    path: ["email", "name"],
  });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
