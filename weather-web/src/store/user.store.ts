import { create } from "zustand";
import { persist } from "zustand/middleware";

import { userRepository } from "@/repositories/user.repository";
import { authRepository } from "@/repositories/auth.repository";
import type { User } from "@/types/user";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth";
import { cookieManager } from "@/lib/cookies";

interface UserState {
  // state
  user: User | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  // actions
  fetchUser: () => Promise<void>;
  refreshUser: () => Promise<void>;
  login: (data: LoginRequest ) => Promise<void>;
  registerUser: (data: RegisterRequest ) => Promise<void>;
  updateUser: (data: Pick<User, "email" | "name">) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  clearError: () => void;
  deleteAccount: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // initail state
      user: null,
      isInitialized: false,
      isLoading: false,
      error: null,
      
      // actions 
      fetchUser: async () => {
        if (get().user) return;

        if (!cookieManager.getToken()) {
          set({ isInitialized: true, isLoading: false });
          return;
        }

        set({ isLoading: true, error: null});
        try {
          const user = await userRepository.getMe();
          set({ user, isInitialized: true, isLoading: false});
        } catch (error) {
          console.error('Failed to fetch user:', error);
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isInitialized: true,
            isLoading: false,
          });
        }
      },

      refreshUser: async () => {
        try {
          const user = await userRepository.getMe();
          set({ user, isLoading: false});
        } catch (error) {
          console.error('Failed to refresh user:', error);
        }
      },

      setUser: (user: User) => set({user}),

      login: async (data: LoginRequest) => {
        set({isLoading: true, error: null});

        try {
          const res = await authRepository.login(data);
          if (res.token) {
            cookieManager.setToken(res.token);
          }
          const user = await userRepository.getMe();
          set({user, isInitialized: true, isLoading: false});
        } catch (error) {
          console.error('Failed to login:', error); 
          cookieManager.removeToken();
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isInitialized: true,
            isLoading: false,
          });
        }
      },

      registerUser: async (data: RegisterRequest) => {
        set({isLoading: true, error:null});
        try {
          const res = await authRepository.register(data);
          if (res.token) {
            cookieManager.setToken(res.token);
          }
          const user = await userRepository.getMe();
          set({user, isInitialized: true, isLoading: false});
        } catch (error) {
          console.error('Failed to sign in:', error); 
          cookieManager.removeToken();
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isInitialized: true,
            isLoading: false,
          });
        }
      },

      updateUser: async (data: Pick<User, 'email' | 'name'>) => {
        set({isLoading: true, error:null});
        try {
          const res = await userRepository.updateUser(data);
          if (res.success) {
            set({user: { ...get().user, ...data } as User, isInitialized: true, isLoading: false});
          }
        } catch (error) {
          console.error('Failed to update user:', error);
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isInitialized: true,
            isLoading: false,
          });
        }
      },

      logout: async () => {
        set({isLoading: true,});
        try {
          await authRepository.logout();
        } catch (error) {
          console.error('Failed to logout:', error);
        } finally {
          cookieManager.removeToken();
          set({ 
            user: null, 
            isInitialized: true, 
            isLoading: false,
            error: null 
          });
        }
      },

      clearError: () => {set({error: null});},

      deleteAccount: async () => {
        try {
          await authRepository.deleteAccount();
          cookieManager.removeToken();
          set({user: null});
        } catch (error) {
          console.error('Failed to delete account:', error);
        }
      },
    }),
    { name: 'user-storage'}
  )
);