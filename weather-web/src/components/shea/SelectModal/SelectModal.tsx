import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../PrimaryButton/PrimaryButton";

interface SelectModalProps {
  buttonProps: PrimaryButtonProps;
  py?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SelectModal = ({
  buttonProps,
  isOpen,
  onClose,
  title,
  children,
}: SelectModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>

      <div className="relative bg-radial-close rounded-lg flex flex-col items-center justify-center text-center max-w-[360px] w-full overflow-hidden">
        <div className="bg-main text-white text-lg w-full text-center py-4">
          {title}
        </div>
        <div className="p-3 pt-6 flex flex-col gap-6 w-full">
          {children}
          <PrimaryButton {...buttonProps} />
        </div>
      </div>
    </div>
  );
};
