import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [RequestClean] Query key 생성
 * --
 */
export const requestCleanQueryKeys = createQueryKeys('requestClean', {
    getRequestClean: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getRequestCleans: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [RequestClean] 청소요청 전체 조회
 * --
 */
export const useGetRequestCleans = () => {
    return useQuery({
        queryKey: requestCleanQueryKeys.getRequestCleans().queryKey,
        queryFn: () => API.getRequestClean(),
    });
};

/**
 * [RequestClean] 청소요청 단일 조회
 * --
 */
export const useGetOneRequestClean = (request_clean_id: number) => {
    return useQuery({
        queryKey: requestCleanQueryKeys.getRequestClean(request_clean_id).queryKey,
        queryFn: () => API.getOneRequestClean(request_clean_id),
        enabled: !!request_clean_id,
    });
};

/**
 * [RequestClean] 고객 청소요청 조회
 * --
 */
export const useGetUserRequestClean = (user_id: number) => {
    return useQuery({
        queryKey: requestCleanQueryKeys.getRequestClean(user_id).queryKey,
        queryFn: () => API.getUserRequestClean(user_id),
        enabled: !!user_id,
    });
};

/**
 * [RequestClean] 청소업체 청소요청 조회
 * --
 */
export const useGetCompanyRequestClean = (company_id: number) => {
    return useQuery({
        queryKey: requestCleanQueryKeys.getRequestClean(company_id).queryKey,
        queryFn: () => API.getCompanyRequestClean(company_id),
        enabled: !!company_id,
    });
};

/**
 * [RequestClean] 청소요청 생성
 * --
 */
export const useCreateRequestClean = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postRequestClean(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 생성 완료: ', data);

            queryClient.invalidateQueries(requestCleanQueryKeys.getRequestCleans());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestClean] 청소요청 정보 수정
 * --
 */
export const useUpdateRequestClean = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ request_clean_id, body }: { request_clean_id: number, body: any }) => {
            const response = await API.putRequestClean(request_clean_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 정보 수정 완료: ', data);

            queryClient.invalidateQueries(requestCleanQueryKeys.getRequestCleans());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestClean] 청소요청 삭제
 * --
 */
export const useDeleteRequestClean = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request_clean_id: number) => {
            const response = await API.deleteRequestClean(request_clean_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 삭제 완료: ', data)

            queryClient.invalidateQueries(requestCleanQueryKeys.getRequestCleans());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};