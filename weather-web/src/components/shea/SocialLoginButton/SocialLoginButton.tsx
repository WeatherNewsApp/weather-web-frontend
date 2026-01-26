import { Icons } from "../icon";

interface SocialLoginButtonProps {
  provider: "google" | "apple";
  onClick: () => void;
}

export const SocialLoginButton = ({
  onClick,
  provider,
}: SocialLoginButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-15 h-15 border border-accent rounded-full"
    >
      {provider === "google" ? <Icons.google /> : <Icons.apple />}
    </button>
  );
};
