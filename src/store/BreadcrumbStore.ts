import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Breadcrumb = {
    title: string;
    onClick?: () => void;
};

type BreadcrumbState = {
    breadcrumb: Breadcrumb[];
    actions: {
        push: (path: Breadcrumb[]) => void;
    };
};

const useBreadcrumbStore = create<BreadcrumbState>()(
    immer((set, get) => ({
        breadcrumb: [
            {
                title: '홈',
            },
        ],
        actions: {
            push: (path: Breadcrumb[]) => {
                set(() => ({
                    breadcrumb: path,
                }));
            },
        },
    }))
);

export const useBreadcrumbAction = () =>
    useBreadcrumbStore((store) => store.actions);
export const useBreadcrumbStack = () =>
    useBreadcrumbStore((store) => store.breadcrumb);
export const useBreadcrumbState = () => useBreadcrumbStore.getState();
