import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAdminAuthenticated: false,
      adminUser: null,
      
      setAdminAuthenticated: (isAuthenticated, userData = null) => set({ 
        isAdminAuthenticated: isAuthenticated,
        adminUser: userData
      }),
      
      logout: () => set({ 
        isAdminAuthenticated: false, 
        adminUser: null 
      }),
    }),
    {
      name: 'gamingx-auth-storage',
    }
  )
);
