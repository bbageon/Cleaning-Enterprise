import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [Cart] Query Key 생성
 * --
 */
export const cartQueryKeys = createQueryKeys('cart', {
    getCart: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getCarts: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [Cart] 장바구니 전체 조회
 * --
 */
export const useGetCarts = () => {
    return useQuery({
        queryKey: cartQueryKeys.getCarts().queryKey,
        queryFn: () => API.getCart(),
    });
};

/**
 * [Cart] 장바구니 단일 조회
 * --
 */
export const useGetOneCart = (cart_id: number) => {
    return useQuery({
        queryKey: cartQueryKeys.getCart(cart_id).queryKey,
        queryFn: () => API.getOneCart(cart_id),
        enabled: !!cart_id,
    });
};

/**
 * [Cart] 고객 장바구니 조회
 * --
 */
export const useGetUserCart = (user_id: number) => {
    return useQuery({
        queryKey: cartQueryKeys.getCart(user_id).queryKey,
        queryFn: () => API.getUserCart(user_id),
        enabled: !!user_id,
    });
};

/**
 * [Cart] 장바구니 생성
 * --
 */
export const useCreateCart = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postCart(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('장바구니 생성 완료: ', data);

            queryClient.invalidateQueries(cartQueryKeys.getCarts());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('장바구니 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Cart] 장바구니 수정
 * --
 */
export const useUpdateUser = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ cart_id, body }: { cart_id: number, body: any }) => {
            const response = await API.putCart(cart_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('장바구니 정보 수정 완료: ', data);

            queryClient.invalidateQueries(cartQueryKeys.getCarts());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('장바구니 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Cart] 장바구니 삭제
 * --
 */
export const useDeleteCart = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (cart_id: number) => {
            const response = await API.deleteCart(cart_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('장바구니 삭제 완료: ', data)

            queryClient.invalidateQueries(cartQueryKeys.getCarts());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('장바구니 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};