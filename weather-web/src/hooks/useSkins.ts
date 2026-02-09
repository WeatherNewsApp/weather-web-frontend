import useSWR from "swr";
import { skinRepository } from "@/repositories/skin.repository";

export const useSkinsHead = () => {
  // アタマのスキンを取得
  const { data, isLoading, mutate } = useSWR(
    "/api/v1/skins?category=head",
    skinRepository.getSkinsHead,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 60秒間は重複リクエストを防ぐ
    }
  );

  return {
    skinsHead: data,
    isLoadingHead: isLoading,
    mutateHead: mutate,
  };
};

export const useSkinsBody = () => {
  // カラダのスキンを取得
  const { data, isLoading, mutate } = useSWR(
    "/api/v1/skins?category=body",
    skinRepository.getSkinsBody,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    skinsBody: data,
    isLoadingBody: isLoading,
    mutateBody: mutate,
  };
};

export const useSkinsBase = () => {
  // 土台のスキンを取得
  const { data, isLoading, mutate } = useSWR(
    "/api/v1/skins?category=base",
    skinRepository.getSkinsBase,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    skinsBase: data,
    isLoadingBase: isLoading,
    mutateBase: mutate,
  };
};

export const useOwnedSkinsHead = (shouldFetch: boolean = true) => {
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/v1/skins?category=head&scope=owned" : null,
    skinRepository.getOwnedSkinsHead,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    ownedSkinsHead: data,
    isLoadingOwnedSkinsHead: isLoading,
    mutateOwnedSkinsHead: mutate,
  };
};

export const useOwnedSkinsBody = (shouldFetch: boolean = true) => {
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/v1/skins?category=body&scope=owned" : null,
    skinRepository.getOwnedSkinsBody,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    ownedSkinsBody: data,
    isLoadingOwnedSkinsBody: isLoading,
    mutateOwnedSkinsBody: mutate,
  };
};

export const useOwnedSkinsBase = (shouldFetch: boolean = true) => {
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/v1/skins?category=base&scope=owned" : null,
    skinRepository.getOwnedSkinsBase,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    ownedSkinsBase: data,
    isLoadingOwnedSkinsBase: isLoading,
    mutateOwnedSkinsBase: mutate,
  };
};
