import { create } from 'zustand';

const useModalStore = create((set) => ({
    isModalOpen: false,
    content: {
        title: '',
        message: '',
    },
    onConfirm: null,
    buttonType: 'single',

    openModal: (title, message, onConfirm = null, buttonType = 'single') => set({
        isModalOpen: true,
        content: { title, message },
        onConfirm,
        buttonType,
    }),
    closeModal: () => set({
        isModalOpen: false,
        content: { title: '', message: '' },
        onConfirm: null,
        buttonType: 'single',
    }),
}));

export default useModalStore;