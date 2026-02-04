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
import { Loading } from "@/components/shea/Loading/Loading";
import { SelectModal } from "@/components/shea/SelectModal/SelectModal";
import { ComboBox } from "@/components/shea/ComboBox/ComboBox";
import { useBestDango, useDangos } from "@/hooks/useDangos";
import { useUserStore } from "@/store/user.store";
import { useAreas } from "@/hooks/useAreas";
import { Muddy } from "@/components/shea/Muddy/Muddy";
import type { User } from "@/types/user";

export default function Settings() {
  const router = useRouter();
  const [showSelectBestDangoModal, setShowSelectBestDangoModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [shouldFetchAreas, setShouldFetchAreas] = useState(false);

  // ここから変更点
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const deleteAccount = useUserStore((state) => state.deleteAccount);
  
  const { bestDango, isLoadingBestDango } = useBestDango();

  if (isLoadingBestDango) return <Loading />;

  const handleLogout = async () => {
    await logout();
    router.push("/top");
  }

  const handleDeleteAccount = async () => {
    await deleteAccount();
    router.push("/top");
  }

  const handleShowSelectBestDangoModal = () => {
    const {dangos,isLoadingDangos} = useDangos();
    if (isLoadingDangos) return <Loading />;
    setShowSelectBestDangoModal(true);
  }


  // SWRで都道府県リストを取得（遅延ロード）
  // const { data: prefecturesData, isLoading: isPrefecturesLoading } =
    // useGet<PrefecturesResponse>(
    //   shouldFetchPrefectures ? "/api/v1/prefectures" : null
    // );

  // const prefectures = prefecturesData || [];

  // // モーダルを開いたときに都道府県リストを取得（遅延ロード）
  // const handleOpenPrefectureModal = () => {
  //   setShowPrefectureModal(true);
  //   // setSelectedPrefectureId(user?.prefecture?.id ?? null);
  //   setShouldFetchPrefectures(true);
  // };

  // // 地域変更の確定処理
  // const handleConfirmPrefecture = async () => {
  //   if (!selectedPrefectureId) {
  //     alert("地域を選択してください");
  //     return;
  //   }

  //   try {
  //     await updatePrefecture({ prefecture_id: Number(selectedPrefectureId) });

  //     const selectedPrefecture = prefectures.find(
  //       (p) => p.id === selectedPrefectureId
  //     );
  //     if (user && selectedPrefecture) {
  //       // SWRのキャッシュを更新（楽観的更新）
  //       mutateUser(
  //         {
  //           ...user,
  //           prefecture: {
  //             id: selectedPrefecture.id,
  //             name: selectedPrefecture.name,
  //           },
  //         },
  //         false
  //       );
  //     }
  //     setShowPrefectureModal(false);
  //   } catch (error) {
  //     console.error(error);
  //     alert("地域の更新に失敗しました");
  //     mutateUser();
  //   }
  // };

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
            <Muddy 
              face="normal"
              scale="scale-[0.6]"
              {...bestDango ? (({ id: _id, ...rest }) => rest)(bestDango) : { headSkin: "", bodySkin: "", baseSkin: "", damageLevel: "1", growthStage: "1" }}
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
              onClick={() => {
                /* プロフィール編集 */
              }}
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
          <ConfirmModal
            dango={bestDango ? (({ id: _id, ...rest }) => rest)(bestDango) : { headSkin: "", bodySkin: "", baseSkin: "", damageLevel: "1", growthStage: "1" }}
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
            dango={bestDango ? (({ id: _id, ...rest }) => rest)(bestDango) : { headSkin: "", bodySkin: "", baseSkin: "", damageLevel: "1", growthStage: "1" }}
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