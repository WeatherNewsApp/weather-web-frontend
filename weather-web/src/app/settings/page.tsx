"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/shea/icon";
import { ToggleSwitch } from "@/components/shea/ToggleSwitch/ToggleSwitch";
import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { SettingsList } from "@/components/feature/SettingsList/SettingsList";
import { SettingsListItem } from "@/components/feature/SettingsListItem/SettingslistItem";
import { ConfirmModal } from "@/components/shea/ConfirmModal/ConfirmModal";
import { logout, deleteAccount } from "@/lib/api/auth";
import { Prefecture, User } from "@/types/api";
import { updatePrefecture, UserResponse } from "@/lib/api/user";
import { PrefecturesResponse } from "@/lib/api/prefecture";
import { Loading } from "@/components/shea/Loading/Loading";
import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import { ComboBox } from "@/components/shea/ComboBox/ComboBox";
import { useGet } from "@/hooks/useApi";

export default function Settings() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showPrefectureModal, setShowPrefectureModal] = useState(false);
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<number | null>(null);
  const [shouldFetchPrefectures, setShouldFetchPrefectures] = useState(false);

  // SWRでユーザー情報を取得
  const { data: user, isLoading: isLoadingUser, mutate: mutateUser } = useGet<UserResponse>(
    "/api/v1/user/me"
  );

  // SWRで都道府県リストを取得（遅延ロード）
  const { data: prefecturesData, isLoading: isPrefecturesLoading } = useGet<PrefecturesResponse>(
    shouldFetchPrefectures ? "/api/v1/prefectures" : null
  );

  const prefectures = prefecturesData || [];

  // モーダルを開いたときに都道府県リストを取得（遅延ロード）
  const handleOpenPrefectureModal = () => {
    setShowPrefectureModal(true);
    setSelectedPrefectureId(user?.prefecture?.id ?? null);
    setShouldFetchPrefectures(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error(error);
      setShowLogoutModal(false);
      alert("ログアウトに失敗しました");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      router.push("/top");
    } catch (error) {
      console.error(error);
      setShowDeleteAccountModal(false);
      alert("アカウント削除に失敗しました");
    }
  };

  // 地域変更の確定処理
  const handleConfirmPrefecture = async () => {
    if (!selectedPrefectureId) {
      alert("地域を選択してください");
      return;
    }

    try {
      await updatePrefecture({ prefecture_id: Number(selectedPrefectureId) });

      const selectedPrefecture = prefectures.find(
        (p) => p.id === selectedPrefectureId
      );
      if (user && selectedPrefecture) {
        // SWRのキャッシュを更新（楽観的更新）
        mutateUser({
          ...user,
          prefecture: {
            id: selectedPrefecture.id,
            name: selectedPrefecture.name,
          },
        }, false);
      }
      setShowPrefectureModal(false);
    } catch (error) {
      console.error(error);
      alert("地域の更新に失敗しました");
      mutateUser(); // エラー時は再取得
    }
  };

  if (isLoadingUser) return <Loading />;

  return (
    <div className="h-screen flex flex-col bg-main">
      {/* ヘッダー（固定） */}
      <PageHeader title="設定" href="/" />

      {/* メインコンテンツ（スクロール可能） */}
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4">
        <div className="flex flex-col items-center w-full gap-6">
          <div className="flex justify-between w-full items-center p-3 bg-radial-close rounded-md shadow-md h-[150px]">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-accent">
                  マイベストどろ団子
                </p>
                <p>
                  お気に入りどろ団子を
                  <br />
                  飾りましょう！
                </p>
              </div>
              {/* ボタン */}
              <button className="bg-accent rounded-full py-1 w-[180px]">
                <span className="text-white text-xs">どろ団子を切り替える</span>
              </button>
            </div>
            <div className="w-30 h-30 bg-accent rounded-full"></div>
          </div>
          <Link
            href="/settings/history"
            className="flex justify-between w-full items-center py-4 px-3 bg-radial rounded-md shadow-md"
          >
            <div className="flex items-center gap-2">
              <Icons.history className="w-6 h-6" strokeWidth={1.2} />
              <p className="">今までのどろ団子</p>
            </div>
            <Icons.chevronRight className="w-8 h-8" strokeWidth={1} />
          </Link>
          <SettingsList>
            {/* ユーザー情報 */}
            <SettingsListItem
              // ダミー値
              title="ユーザー"
              subtitle="example@example.com"
              onClick={() => {
                /* プロフィール編集 */
              }}
            />

            {/* 地域設定 */}
            <SettingsListItem
              icon={<Icons.prefecture className="w-6 h-6" strokeWidth={1.2} />}
              title="地域設定"
              onClick={handleOpenPrefectureModal}
            />

            {/* 通知を許可 */}
            <SettingsListItem
              icon={
                <Icons.notification className="w-6 h-6" strokeWidth={1.2} />
              }
              title="通知を許可"
              rightElement={<ToggleSwitch />}
              showChevron={false}
            />

            {/* プライバシーポリシー */}
            <SettingsListItem
              icon={<Icons.privacy className="w-6 h-6" strokeWidth={1.2} />}
              title="プライバシーポリシー"
              href="/privacy"
            />

            {/* ログアウト */}
            <SettingsListItem
              icon={<Icons.logout className="w-6 h-6" strokeWidth={1.2} />}
              title="ログアウト"
              onClick={() => setShowLogoutModal(true)}
              variant="danger"
            />

            {/* アカウント削除 */}
            <SettingsListItem
              icon={<Icons.delete className="w-6 h-6" strokeWidth={1.2} />}
              title="アカウント削除"
              onClick={() => setShowDeleteAccountModal(true)}
              variant="danger"
            />
          </SettingsList>
          <ConfirmModal
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            title={<span>本当にログアウトするの？</span>}
            message={
              <span>
                ログアウト後、ログイン画面へ
                <br />
                戻されます
              </span>
            }
            confirmText="ログアウト"
          />
          <ConfirmModal
            isOpen={showDeleteAccountModal}
            onClose={() => setShowDeleteAccountModal(false)}
            onConfirm={handleDeleteAccount}
            title={
              <span>
                本当にアカウントを削除
                <br />
                しちゃうんですか？
              </span>
            }
            message={<span>この操作は元には戻せません</span>}
            confirmText="アカウント削除"
            cancelText="キャンセル"
          />
          <SelectModal
            isOpen={showPrefectureModal}
            onClose={() => setShowPrefectureModal(false)}
            title="地域設定"
            buttonProps={{
              label: "地域を設定する",
              onClick: handleConfirmPrefecture,
              disabled: !selectedPrefectureId,
              variant: "accent",
              shadow: true,
              py: "py-4",
            }}
          >
            {isPrefecturesLoading ? (
              <span>都道府県を読み込んでいます...</span>
            ) : (
              <ComboBox
                items={prefectures}
                selectedId={selectedPrefectureId}
                onSelect={(prefecture) =>
                  setSelectedPrefectureId(prefecture.id)
                }
                getItemLabel={(prefecture) => prefecture.name}
                getItemKey={(prefecture) => prefecture.id}
                searchPlaceholder="都道府県名で検索..."
                emptyMessage="該当する都道府県が見つかりません"
              />
            )}
          </SelectModal>
        </div>
      </main>
    </div>
  );
}
