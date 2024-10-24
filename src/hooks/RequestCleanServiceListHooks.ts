import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [RequestCleanServiceList] Query Key 생성
 * --
 */
export const requestCleanServiceListQueryKeys = createQueryKeys('requestCleanServiceList', {
    getRequestCleanServiceList: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getRequestCleanServiceLists: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [RequestCleanServiceList] 청소요청 서비스 목록 전체 조회
 * --
 */
export const useGetRequestCleanServiceLists = () => {
    return useQuery({
        queryKey: requestCleanServiceListQueryKeys.getRequestCleanServiceLists().queryKey,
        queryFn: () => API.getRequestCleanServiceList(),
    });
};

/**
 * [RequestCleanServiceList] 청소요청 서비스 목록 단일 조회
 * --
 */
export const useGetOneRequestCleanServiceList = (request_clean_service_list_id: number) => {
    return useQuery({
        queryKey: requestCleanServiceListQueryKeys.getRequestCleanServiceList(request_clean_service_list_id).queryKey,
        queryFn: () => API.getOneRequestCleanServiceList(request_clean_service_list_id),
        enabled: !!request_clean_service_list_id,
    });
};

/**
 * [RequestCleanServiceList] 청소요청의 청소요청 서비스 목록 단일 조회
 * --
 */
export const useGetCleanRequestCleanServiceList = (request_clean_id: number) => {
    return useQuery({
        queryKey: requestCleanServiceListQueryKeys.getRequestCleanServiceList(request_clean_id).queryKey,
        queryFn: () => API.getCleanRequestCleanServiceList(request_clean_id),
        enabled: !!request_clean_id,
    });
};

/**
 * [RequestCleanServiceList] 청소요청 서비스 목록 생성
 * --
 */
export const useCreateRequestCleanServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postRequestCleanServiceList(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 서비스 목록 생성 완료: ', data);

            queryClient.invalidateQueries(requestCleanServiceListQueryKeys.getRequestCleanServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 서비스 목록 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestCleanServiceList] 청소요청 서비스 목록 수정
 * --
 */
export const useUpdateRequestCleanServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( {request_clean_service_list_id, body}: { request_clean_service_list_id: number, body: any}) => {
            const response = await API.putRequestCleanServiceList(request_clean_service_list_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 서비스 목록 수정 완료: ', data);

            queryClient.invalidateQueries(requestCleanServiceListQueryKeys.getRequestCleanServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 서비스 목록 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestCleanServiceList] 청소요청 서비스 목록 삭제 수정
 * --
 */
export const useDeleteRequestCleanServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request_clean_service_list_id: number) => {
            const response = await API.deleteRequestCleanServiceList(request_clean_service_list_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 서비스 목록 삭제 완료: ', data);

            queryClient.invalidateQueries(requestCleanServiceListQueryKeys.getRequestCleanServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 서비스 목록 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};