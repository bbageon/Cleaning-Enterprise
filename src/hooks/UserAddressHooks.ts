import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [User Address] Query Key 생성
 * --
 */
export const userAddressQueryKeys = createQueryKeys('userAddress', {
    getUserAddress: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getUserAddresses: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [User Address] 고객 주소 전체 조회
 * --
 */
export const useGetUserAddresses = () => {
    return useQuery({
        queryKey: userAddressQueryKeys.getUserAddresses().queryKey,
        queryFn: () => API.getUserAddresses(),
    });
};

/**
 * [User Address] 고객 주소 단일 조회
 * --
 */
export const useGetOneUserAddress = (user_address_id: number) => {
    return useQuery({
        queryKey: userAddressQueryKeys.getUserAddress(user_address_id).queryKey,
        queryFn: () => API.getOneUserAddress(user_address_id),
        enabled: !!user_address_id,
    });
};

/**
 * [User Address] 고객 주소 조회
 * --
 */
export const useGetUserAddress = (userId: number) => {
    return useQuery({
        queryKey: userAddressQueryKeys.getUserAddress(userId).queryKey,
        queryFn: () => API.getUserAddress(userId),
        enabled: !!userId,
    });
};

/**
 * [User Address] 고객 주소 생성
 * --
 */
export const useCreateUserAddress = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postUserAddress(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('고객 주소 생성 완료: ', data);

            queryClient.invalidateQueries(userAddressQueryKeys.getUserAddresses());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('고객 주소 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [User Address] 고객 주소 수정
 * --
 */
export const useUpdateUserAddress = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ user_address_id, body}: {user_address_id: number, body: any}) => {
            const response = await API.putUserAddress(user_address_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('고객 주소 수정 완료: ', data);

            queryClient.invalidateQueries(userAddressQueryKeys.getUserAddresses());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('고객 주소 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [User Address] 고객 주소 삭제
 * --
 */
export const useDeleteUserAddress = (onSuccess?: (data:any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user_address_id: number) => {
            const response = await API.deleteUserAddress(user_address_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('고객 주소 삭제 완료: ', data);

            queryClient.invalidateQueries(userAddressQueryKeys.getUserAddresses());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('고객 주소 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    })
}