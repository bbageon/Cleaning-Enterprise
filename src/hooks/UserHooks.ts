import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [User] Query key 생성
 * --
 */
export const userQueryKeys = createQueryKeys('user', {
    getUser: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getUsers: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [User] 고객 전체 조회
 * --
 */
export const useGetUsers = () => {
    return useQuery({
        queryKey: userQueryKeys.getUsers().queryKey,
        queryFn: () => API.getUser(),
    });
};

/**
 * [User] 고객 단일 조회
 * --
 */
export const useGetUser = (user_id: number) => {
    return useQuery({
        queryKey: userQueryKeys.getUser(user_id).queryKey,
        queryFn: () => API.getOneUser(user_id),
        enabled: !!user_id,
    });
};

/**
 * [User] 프로필 정보 조회
 * --
 */
export const useGetProfile = (user_id: number) => {
    return useQuery({
        queryKey: userQueryKeys.getUser(user_id).queryKey,
        queryFn: () => API.getProfile(user_id),
        enabled: !!user_id,
    });
};

/**
 * [User] 고객 생성
 * --
 */
export const useCreateUser = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postUser(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('고객 생성 완료: ', data);

            queryClient.invalidateQueries(userQueryKeys.getUsers());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('고객 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [User] 고객 정보 수정
 * --
 */
export const useUpdateUser = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ user_id, body }: { user_id: number, body: any }) => {
            const response = await API.putUser(user_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('고객 정보 수정 완료: ', data);

            queryClient.invalidateQueries(userQueryKeys.getUsers());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('고객 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [User] 고객 삭제
 * --
 */
export const useDeleteUser = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user_id: number) => {
            const response = await API.deleteUser(user_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('고객 삭제 완료: ', data)

            queryClient.invalidateQueries(userQueryKeys.getUsers());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('고객 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};