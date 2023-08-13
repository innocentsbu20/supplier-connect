import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            login: (user) => set({
                user,
            }),
            logout: () => set({
                user: null,
            }),
            register: () => set({


            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    ))

export default useUserStore;