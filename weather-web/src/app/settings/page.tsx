"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, type UpdateUserSchema } from "@/schemas/user";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shea/icon";
import { ToggleSwitch } from "@/components/shea/ToggleSwitch/ToggleSwitch";
import { PageHeader } from "@/components/shea/PageHeader/PageHeader";
import { SettingsList } from "@/components/feature/SettingsList/SettingsList";
import { SettingsListItem } from "@/components/feature/SettingsListItem/SettingslistItem";
import { ConfirmModal } from "@/components/shea/ConfirmModal/ConfirmModal";
import { Loading } from "@/components/shea/Loading/Loading";
import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import { useBestDango, useDangos } from "@/hooks/useDangos";
import { useUserStore } from "@/store/user.store";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import { userRepository } from "@/repositories/user.repository";
import { UpdateUserForm } from "@/components/feature/UpdateUserForm/UpdateUserForm";
import { UpdateUserModal } from "@/components/feature/UpdateUserModal/UpdateUserModal";
import { ShareModal } from "@/components/feature/ShareModal/ShareModal";
import { Dango } from "@/types/dango";

export default function Settings() {
  const router = useRouter();
  // モーダル
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUpdateBestDangoModal, setShowUpdateBestDangoModal] = useState(false);

  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [selectedBestDangoId, setSelectedBestDangoId] = useState<number | null>(null);

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const deleteAccount = useUserStore((state) => state.deleteAccount);
  const updateUser = useUserStore((state) => state.updateUser);
  
  const { bestDango, isLoadingBestDango, mutateBestDango } = useBestDango();
  const { dangos, isLoadingDangos} = useDangos();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    try {
      updateUser(data);
      setShowUpdateUserModal(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  }

  if (isLoadingBestDango) return <Loading />;

  // ログアウト
  const handleLogout = async () => {
    await logout();
    router.push("/top");
  }

  // アカウント削除
  const handleDeleteAccount = async () => {
    await deleteAccount();
    router.push("/top");
  }

  // ユーザー情報更新
  const handleUpdateUser = async () => {
    try {
      await userRepository.updateUser({
        email: user?.email ?? "",
        name: user?.name ?? "",
      });
      setShowUpdateUserModal(false);
    } catch (error) {
      console.error(error);
      alert("ユーザー情報の更新に失敗しました");
    }
  };

  // 共有モーダルを開く
  const handleShowShareModal = async () => {
    if (isLoadingBestDango) return <Loading />;
    if (!bestDango) return;
    setShowShareModal(true);
  }

  // ベスト団子変更モーダル
  const handleShowUpdateBestDangoModal = async () => {
    if (isLoadingDangos) return <Loading />;
    if (!dangos) return;
    setShowUpdateBestDangoModal(true);
  }

  // ベスト団子選択
  const handleSelectBestDango = async (dangoId: number) => {
    setSelectedBestDangoId(dangoId);
  }

  // ベスト団子更新
  const handleUpdateBestDango = async () => {
    try {
      await userRepository.updateBestDango({
        dangoId: selectedBestDangoId ?? 0,
      });
      mutateBestDango();
      setShowUpdateBestDangoModal(false);
      console.log("ベスト団子を更新しました");
      setSelectedBestDangoId(null);
    } catch (error) {
      console.error(error);
    }
  }

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
                <p className="text-xs font-medium">
                  マイベストどろ団子
                </p>
                <p>
                  お気に入りどろ団子を
                  <br />
                  飾りましょう！
                </p>
              </div>
              {/* ボタン */}
              <button 
                className="bg-accent rounded-full py-2 blockw-[180px]"
                onClick={handleShowUpdateBestDangoModal}
              >
                <span className="text-white text-xs">どろ団子を切り替える</span>
              </button>
            </div>
            <div className="w-30 h-30 flex items-center justify-center">
              <Muddy 
                face="normal"
                scale="scale-[0.6]"
                {...bestDango ? (({ id: _id, ...rest }) => rest)(bestDango) : { headSkin: "", bodySkin: "", baseSkin: "", damageLevel: "1", growthStage: "1" }}
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
              onClick={() => {setShowUpdateUserModal(true)}}
            />

            {/* 地域設定 */}
            <SettingsListItem
              icon={<Icons.prefecture className="w-6 h-6" strokeWidth={1.2} />}
              title="地域設定"
              onClick={() => setShowAreaModal(true)}
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

          {/* 共有モーダル */}
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            bestDango={bestDango ? (({ id: _id, ...rest }) => rest)(bestDango) : undefined}
          />

          {/* ベスト団子変更モーダル */}
          <UpdateUserModal
            isOpen={showUpdateBestDangoModal}
            onClose={() => setShowUpdateBestDangoModal(false)}
            title="どの団子にする"
          >
            {dangos && dangos.length === 0 ? (
              <p className="text-lg text-center">まだどろだんごがありません</p>
            ) : (
              <>
                <ul className="grid grid-cols-3 gap-y-4 gap-x-3 overflow-y-auto">
                  {dangos && dangos.map((dango) => (
                      <li 
                        key={dango.id}
                        className={cn(
                          "flex justify-center items-center max-h-25",
                          selectedBestDangoId === dango.id && "bg-white rounded-xs"
                        )}
                        onClick={() => handleSelectBestDango(dango.id)}
                      >
                        <Muddy
                          face="normal"
                          scale="scale-[0.35]"
                          {...dango}
                        />
                      </li>
                    ))}
                </ul>
                <button 
                  className="h-15 w-full relative"
                  onClick={handleUpdateBestDango}
                >
                  <span className="text-white flex justify-center items-center bg-accent w-full rounded-sm py-4 relative z-20">このどろ団子に決めた！</span>
                  <span className="absolute bottom-0 right-0 w-full h-14 bg-accent-dark rounded-sm z-10" />
                </button>
              </>
            )}
          </UpdateUserModal>
          {/* ログアウトモーダル */}
          <ConfirmModal
            dango={bestDango ? (({ id: _id, ...rest}) => rest)(bestDango) as Omit<Dango, "id"> : {
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
            }}
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

          {/* アカウント削除モーダル */}
          <ConfirmModal
            dango={bestDango ? (({ id: _id, ...rest}) => rest)(bestDango) as Omit<Dango, "id"> : {
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
            }}
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

          {/* ユーザー情報変更モーダル */}
          <UpdateUserModal
            isOpen={showUpdateUserModal}
            onClose={() => setShowUpdateUserModal(false)}
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
            onClose={() => setShowAreaModal(false)}
            title="地域設定"
            buttonProps={{
              label: "地域を設定する",
              onClick: () => setShowAreaModal(false),
              disabled: !selectedAreaId,
              variant: "accent",
              shadow: true,
              py: "py-4",
            }}
          >
            <p>テスト</p>
          {/* <ComboBox
            items={areas || []}
            selectedId={selectedAreaId}
            onSelect={(area) =>
              setSelectedAreaId(area.id)
            }
            getItemLabel={(area) => area.name}
            getItemKey={(area) => area.id}
            searchPlaceholder="都道府県名で検索..."
            emptyMessage="該当する都道府県が見つかりません"
          /> */}
          </SelectModal>
        </div>
      </main>
    </div>
  );
}