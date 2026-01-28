interface SettingsListProps {
  children: React.ReactNode;
}

export const SettingsList = ({ children }: SettingsListProps) => {
  return (
    <ul className="flex flex-col py-4 px-3 bg-radial shadow-md w-full rounded-md">
      {children}
    </ul>
  );
};
