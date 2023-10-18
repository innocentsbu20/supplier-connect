import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            registerResponse: null,
            login: (user) =>
                set({
                    ...get(),
                    user,
                })
            ,
            logout: () => set({
                user: null,
                registerResponse: null
            }),
            register: (user) => {

                const existingUser = get().users.filter(usr => usr.id === user.id);
                if (!existingUser) {
                    console.log("user is added ", get())
                    get().users.push(user)
                    get().registerResponse = {
                        isSuccsess: true,
                        message: "user is added successfully"
                    }
                    set({
                        ...get()
                    })
                } else {
                    console.log("user already exist")
                }
                return get()
            }
        }),
        {
            name: 'user-storage',
        }
    ))

export default useUserStore;