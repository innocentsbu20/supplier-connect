import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            users: [
                {
                    username: 'minnieT',
                    type: 'Supplier',
                    password: 'pass1@test',
                    name: 'Thabiso',
                    surname: 'Sikhahlane',
                    id: 1234567891011,
                    email: 'minniet@test.com',
                    contact: '0123456789',
                }
            ],
            loginResponse: null,
            registerResponse: null,
            login: (user) => {
                const existingUser = get().users.filter(usr => usr.username === user.username && usr.password === user.password)

                if (existingUser.length) {
                    get().loginResponse = {
                        ...user,
                        isLogged: true,
                        isSuccsess: true,
                        messgae: ""
                    }
                    set({
                        ...get(),
                        user,
                    })
                } else {
                    get().loginResponse = {
                        isLogged: false,
                        isSuccsess: false,
                        message: "User Does Not Exist"
                    }
                    set({
                        ...get()
                    })
                }
                return get().loginResponse
            },
            logout: () => set({
                users: [
                    {
                        username: 'minnieT',
                        type: 'Supplier',
                        password: 'pass1@test',
                        name: 'Thabiso',
                        surname: 'Sikhahlane',
                        id: 1234567891011,
                        email: 'minniet@test.com',
                        contact: '0123456789',
                    }
                ],
                user: null,
                loginResponse: null,
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
                return get().loginResponse
            }
        }),
        {
            name: 'user-storage',
        }
    ))

export default useUserStore;