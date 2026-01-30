// stores/userStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: number;
	email: string;
	name: string;
	point: number;
	prefecture: { id: number; name: string; } | null;
	icon: string | null;
}

interface UserState {
  // State
  user: User | null;
  isLoading: boolean;
  error: any;

  // Actions
  setUser: (user: User) => void;
  updatePoints: (points: number) => void;
  incrementPoints: (amount: number) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        isLoading: false,
        error: null,

        // Actions
        setUser: (user) => set({ user, error: null }),
        
        updatePoints: (points) =>
          set((state) => ({
            user: state.user ? { ...state.user, point: points } : null,
          })),
        
        incrementPoints: (amount) =>
          set((state) => ({
            user: state.user
              ? { ...state.user, point: state.user.point + amount }
              : null,
          })),
        
        clearUser: () => set({ user: null, error: null }),
        
        setLoading: (isLoading) => set({ isLoading }),
        
        setError: (error) => set({ error }),
      }),
      {
        name: 'user-storage', // localStorage key
        partialize: (state) => ({ user: state.user }), // userのみ永続化
      }
    ),
    { name: 'UserStore' } // DevTools名
  )
);

// セレクター（パフォーマンス最適化）
export const useUserPoints = () => useUserStore((state) => state.user?.point ?? 0);
export const useUserProfile = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => ({
  setUser: state.setUser,
  updatePoints: state.updatePoints,
  incrementPoints: state.incrementPoints,
  clearUser: state.clearUser,
}));