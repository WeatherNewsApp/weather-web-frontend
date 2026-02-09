import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: "※ユーザーネームが入力されていません" }),
    email: z.string().email("※メールアドレスの形式が正しくありません"),
    password: z.string().min(8, "パスワードは8文字以上である必要があります"),
    confirmPassword: z.string().min(1, "パスワード確認が入力されていません"),
    isTermsAccepted: z.literal(true, {
      message: "※利用規約に同意してください",
    }),
    areaId: z.number({ message: "※地域を選択してください" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "※パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("※メールアドレスの形式が正しくありません"),
  password: z.string().min(1, "※パスワードが入力されていません"),
});
export type LoginSchema = z.infer<typeof loginSchema>;
