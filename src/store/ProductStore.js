import { create } from 'zustand'
import data from '../constants/Index';

const useProductStore = create((set, get) => ({
    products: data,
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