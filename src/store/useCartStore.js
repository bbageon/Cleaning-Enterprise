import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: [],
    totalPrice: 0,

    addToCartStore: (item) => set((state) => {
        const existingService = state.cartItems.find(i => i.service_id === item.service_id);
        const sameCompanyItems = state.cartItems.filter(i => i.company_id === item.company_id);

        if (!existingService) {
            if (sameCompanyItems.length === 0 || sameCompanyItems[0].company_id === item.company_id) {
                return {
                    cartItems: [...state.cartItems, item],
                    totalPrice: state.totalPrice + item.price,
                };
            }
        }
        return state;
    }),

    clearCartStore: () => set(() => ({
        cartItems: [],
        totalPrice: 0,
    })),
}));

export default useCartStore;