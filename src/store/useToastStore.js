import { create } from 'zustand';

const useToastStore = create((set) => ({
    message: '',
    isVisible: false,

    showToast: (message) => set({ message, isVisible: true }),
    hideToast: () => set({ message: '', isVisible: false }),
}));

export default useToastStore;