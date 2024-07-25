import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

const useProductStore = create(devtools(
    persist(
        (set, get) => ({
            products: [],
            categories: [],
            setCategories: (categories) => set((state) => {
                return ({
                    ...state,
                    categories
                })
            }),
            setProducts: (products) => set((state) => {
                return ({
                    ...state,
                    products
                })
            }),
            getCategories: () => get().categories,
            getProducts: () => get().products,
            addToPromo: (product) => set((state) => {
                state.products[product.index].isSpecial = true;
                return ({
                    ...state,
                    products: state.products,
                })
            }),
            getItemsOnPromo: () => get().products.filter((pro) => pro.isSpecial === true),
            removeFromPromo: (product) => set((state) => {
                state.products[product.index].isSpecial = false;
                return ({
                    ...state,
                    products: state.products
                })
            }),
        }),
        {
            name: 'product-storage',
        })))

export default useProductStore;