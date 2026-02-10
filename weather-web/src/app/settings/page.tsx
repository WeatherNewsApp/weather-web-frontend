"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, type UpdateUserSchema } from "@/schemas/user";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shea/icon";
import { ToggleSwitch } from "@/components/shea/ToggleSwitch/ToggleSwitch";
import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { SettingsList } from "@/components/feature/SettingsList/SettingsList";
import { SettingsListItem } from "@/components/feature/SettingsListItem/SettingslistItem";
import { Loading } from "@/components/shea/Loading/Loading";
import { useBestDango, useDangos } from "@/hooks/useDangos";
import { useUserStore } from "@/store/user.store";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { userRepository } from "@/repositories/user.repository";
import { UpdateUserForm } from "@/components/feature/UpdateUserForm/UpdateUserForm";
import { AreaComboBox } from "@/components/shea/AreaComboBox/AreaComboBox";
import { Dango } from "@/types/dango";

// モーダルを動的インポート
const ConfirmModal = dynamic(
  () =>
    import("@/components/shea/ConfirmModal/ConfirmModal").then((mod) => ({
      default: mod.ConfirmModal,
    })),
  { ssr: false }
);

const SelectModal = dynamic(
  () =>
    import("@/components/shea/SelectModal/SelectModal").then((mod) => ({
      default: mod.SelectModal,
    })),
  { ssr: false }
);

const UpdateUserModal = dynamic(
  () =>
    import("@/components/feature/UpdateUserModal/UpdateUserModal").then(
      (mod) => ({ default: mod.UpdateUserModal })
    ),
  { ssr: false }
);

const ShareModal = dynamic(
  () =>
    import("@/components/feature/ShareModal/ShareModal").then((mod) => ({
      default: mod.ShareModal,
    })),
  { ssr: false }
);

export default function Settings() {
  const router = useRouter();
  // モーダル
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUpdateBestDangoModal, setShowUpdateBestDangoModal] =
    useState(false);

  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [selectedBestDangoId, setSelectedBestDangoId] = useState<number | null>(
    null
  );

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const deleteAccount = useUserStore((state) => state.deleteAccount);
  const updateUser = useUserStore((state) => state.updateUser);
  const refreshUser = useUserStore((state) => state.refreshUser);

  const { bestDango, isLoadingBestDango, mutateBestDango } = useBestDango();
  console.log("bestDango", bestDango);
  const { dangos, isLoadingDangos } = useDangos();

  const { register, handleSubmit } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = useCallback(
    async (data: UpdateUserSchema) => {
      try {
        updateUser(data);
        setShowUpdateUserModal(false);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    },
    [updateUser]
  );

  // ログアウト
  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/top");
  }, [logout, router]);

  // アカウント削除
  const handleDeleteAccount = useCallback(async () => {
    await deleteAccount();
    router.push("/top");
  }, [deleteAccount, router]);

  // 共有モーダルを開く
  const handleShowShareModal = useCallback(() => {
    if (isLoadingBestDango || !bestDango) return;
    setShowShareModal(true);
  }, [isLoadingBestDango, bestDango]);

  // ベスト団子変更モーダル
  const handleShowUpdateBestDangoModal = useCallback(() => {
    if (isLoadingDangos || !dangos) return;
    setShowUpdateBestDangoModal(true);
  }, [isLoadingDangos, dangos]);

  // ベスト団子選択
  const handleSelectBestDango = useCallback((dangoId: number) => {
    setSelectedBestDangoId(dangoId);
  }, []);

  // ベスト団子更新
  const handleUpdateBestDango = useCallback(async () => {
    try {
      await userRepository.updateBestDango({
        dangoId: selectedBestDangoId ?? 0,
      });
      mutateBestDango();
      setShowUpdateBestDangoModal(false);
      setSelectedBestDangoId(null);
    } catch (error) {
      console.error(error);
    }
  }, [selectedBestDangoId, mutateBestDango]);

  // 地域変更
  const handleAreaUpdate = useCallback(async () => {
    if (!selectedAreaId) return;

    try {
      await userRepository.updateArea({ areaId: selectedAreaId });
      await refreshUser();
      setShowAreaModal(false);
      setSelectedAreaId(null);
    } catch (error) {
      console.error(error);
    }
  }, [selectedAreaId, refreshUser]);

  // モーダルのcloseハンドラーをメモ化
  const handleCloseLogoutModal = useCallback(() => {
    setShowLogoutModal(false);
  }, []);

  const handleCloseDeleteAccountModal = useCallback(() => {
    setShowDeleteAccountModal(false);
  }, []);

  const handleCloseAreaModal = useCallback(() => {
    setShowAreaModal(false);
  }, []);

  const handleCloseUpdateUserModal = useCallback(() => {
    setShowUpdateUserModal(false);
  }, []);

  const handleCloseShareModal = useCallback(() => {
    setShowShareModal(false);
  }, []);

  const handleCloseUpdateBestDangoModal = useCallback(() => {
    setShowUpdateBestDangoModal(false);
  }, []);

  // SettingsListItemのonClickハンドラー
  const handleShowUpdateUserModal = useCallback(() => {
    setShowUpdateUserModal(true);
  }, []);

  const handleShowAreaModal = useCallback(() => {
    setShowAreaModal(true);
  }, []);

  const handleShowLogoutModal = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const handleShowDeleteAccountModal = useCallback(() => {
    setShowDeleteAccountModal(true);
  }, []);

  if (isLoadingBestDango) return <Loading />;

  return (
    <div className="h-screen flex flex-col">
      {/* ヘッダー（固定） */}
      <PageHeader title="設定" href="/" />

      {/* メインコンテンツ（スクロール可能） */}
      <main className="flex-1 bg-white overflow-y-auto py-7 px-4 pt-26">
        <div className="flex flex-col items-center w-full gap-6">
          <div className="flex justify-between w-full items-center p-3 bg-radial-close rounded-md shadow-md h-[150px] relative">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">マイベストどろ団子</p>
                <p>
                  お気に入りどろ団子を
                  <br />
                  飾りましょう！
                </p>
              </div>
              {/* ボタン */}
              <button
                className="bg-accent rounded-full h-9 flex items-center justify-center  w-[180px]"
                onClick={handleShowUpdateBestDangoModal}
              >
                <span className="text-white text-xs">どろ団子を切り替える</span>
              </button>
            </div>
            <div className="w-30 h-30 flex items-center justify-center">
              <Muddy
                face="normal"
                scale="scale-[0.5]"
                {...(bestDango
                  ? (({ id: _id, ...rest }) => rest)(bestDango) // eslint-disable-line @typescript-eslint/no-unused-vars
                  : {
                      headSkin: "",
                      bodySkin: "",
                      baseSkin: "",
                      damageLevel: "1",
                      growthStage: "1",
                    })}
              />
            </div>
            <Icons.Share
              className="w-7 h-7 absolute bottom-[2px] right-[2px]"
              strokeWidth={1.2}
              onClick={handleShowShareModal}
            />
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
              title={user?.name ?? ""}
              subtitle={user?.email ?? ""}
              onClick={handleShowUpdateUserModal}
            />

            {/* 地域設定 */}
            <SettingsListItem
              icon={<Icons.prefecture className="w-6 h-6" strokeWidth={1.2} />}
              title="地域設定"
              onClick={handleShowAreaModal}
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
              onClick={handleShowLogoutModal}
              variant="danger"
            />

            {/* アカウント削除 */}
            <SettingsListItem
              icon={<Icons.delete className="w-6 h-6" strokeWidth={1.2} />}
              title="アカウント削除"
              onClick={handleShowDeleteAccountModal}
              variant="danger"
            />
          </SettingsList>

          {/* 共有モーダル */}
          <ShareModal
            isOpen={showShareModal}
            onClose={handleCloseShareModal}
            bestDango={
              bestDango
                ? (({ id: _id, ...rest }) => rest)(bestDango) // eslint-disable-line @typescript-eslint/no-unused-vars
                : undefined
            }
          />

          {/* ベスト団子変更モーダル */}
          <UpdateUserModal
            isOpen={showUpdateBestDangoModal}
            onClose={handleCloseUpdateBestDangoModal}
            title="どの団子にする"
          >
            {dangos && dangos.length === 0 ? (
              <p className="text-lg text-center">まだどろだんごがありません</p>
            ) : (
              <>
                <ul className="grid grid-cols-3 gap-y-4 gap-x-3 overflow-y-auto">
                  {dangos &&
                    dangos.map((dango) => (
                      <li
                        key={dango.id}
                        className={cn(
                          "flex justify-center items-center max-h-25",
                          selectedBestDangoId === dango.id &&
                            "bg-white rounded-xs"
                        )}
                        onClick={() => handleSelectBestDango(dango.id)}
                      >
                        <Muddy
                          face="normal"
                          scale="scale-[0.35]"
                          headSkin={dango.headSkin}
                          bodySkin={dango.bodySkin}
                          baseSkin={dango.baseSkin}
                          growthStage={dango.growthStage}
                          damageLevel="1"
                        />
                      </li>
                    ))}
                </ul>
                <button
                  className="h-15 w-full relative"
                  onClick={handleUpdateBestDango}
                >
                  <span className="text-white flex justify-center items-center bg-accent w-full rounded-sm py-4 relative z-20">
                    このどろ団子に決めた！
                  </span>
                  <span className="absolute bottom-0 right-0 w-full h-14 bg-accent-dark rounded-sm z-10" />
                </button>
              </>
            )}
          </UpdateUserModal>

          {/* ログアウトモーダル */}
          <ConfirmModal
            dango={
              bestDango
                ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ((({ id: _id, ...rest }) => rest)(bestDango) as Omit<
                    Dango,
                    "id"
                  >)
                : {
                    headSkin: "",
                    bodySkin: "",
                    baseSkin: "",
                    damageLevel: "1",
                    growthStage: "1",
                    totalDaysAlive: 0,
                    caredAt: "",
                    diedAt: null,
                    successCareCount: 0,
                    point: 0,
                    maxConsecutive: 0,
                  }
            }
            isOpen={showLogoutModal}
            onClose={handleCloseLogoutModal}
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

          {/* アカウント削除モーダル */}
          <ConfirmModal
            dango={
              bestDango
                ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ((({ id: _id, ...rest }) => rest)(bestDango) as Omit<
                    Dango,
                    "id"
                  >)
                : {
                    headSkin: "",
                    bodySkin: "",
                    baseSkin: "",
                    damageLevel: "1",
                    growthStage: "1",
                    totalDaysAlive: 0,
                    caredAt: "",
                    diedAt: null,
                    successCareCount: 0,
                    point: 0,
                    maxConsecutive: 0,
                  }
            }
            isOpen={showDeleteAccountModal}
            onClose={handleCloseDeleteAccountModal}
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

          {/* ユーザー情報変更モーダル */}
          <UpdateUserModal
            isOpen={showUpdateUserModal}
            onClose={handleCloseUpdateUserModal}
            title="ユーザー情報変更"
          >
            <UpdateUserForm
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
            />
          </UpdateUserModal>
          {/* エリア変更モーダル */}
          <SelectModal
            isOpen={showAreaModal}
            onClose={handleCloseAreaModal}
            title="地域設定"
            buttonProps={{
              label: "地域を設定する",
              onClick: handleAreaUpdate,
              disabled: !selectedAreaId,
              variant: "accent",
              shadow: true,
              py: "py-4",
            }}
          >
            <div className="h-[360px]">
              <AreaComboBox
                selectedAreaId={selectedAreaId ?? undefined}
                onChangeSelectedAreaId={(areaId: number) =>
                  setSelectedAreaId(areaId)
                }
                hasIcon={true}
              />
            </div>
          </SelectModal>
        </div>
      </main>
    </div>
  );
}
