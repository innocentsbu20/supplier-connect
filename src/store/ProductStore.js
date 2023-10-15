import { create } from 'zustand'

const useProductStore = create((set, get) => ({
    products: [],
    setProducts: (products) => set((state) => {
        return ({
            ...state,
            products
        })
    }),
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
}))

export default useProductStore;