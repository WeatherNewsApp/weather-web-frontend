interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  children,
  title,
}: ProfileModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={onClose}
      ></div>

      <div className="relative bg-radial-close rounded-lg flex flex-col items-center justify-center text-center max-w-[360px] w-full overflow-hidden">
        <div className="bg-main text-white text-lg py-4 w-full text-center">
          {title}
        </div>
        <div className="pt-7 p-3 flex flex-col gap-7 w-full ">{children}</div>
      </div>
    </div>
  );
};
