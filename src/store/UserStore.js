import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

const useUserStore = create(devtools(
    persist(
        (set, get) => ({
            user: null,
            login: (user) =>
                set({
                    ...get(),
                    user,
                })
            ,
            logout: () => set({
                user: null
            }),
        }),
        {
            name: 'user-storage',
        }
    )))

export default useUserStore;