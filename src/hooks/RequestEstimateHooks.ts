import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [RequestEstimate] Query key 생성
 * --
 */
export const requestEstimateQueryKeys = createQueryKeys('requestEstimate', {
    getRequestEstimate: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getRequestEstimates: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [RequestEstimate] 견적서 전체 조회
 * --
 */
export const useGetRequestEstimates = () => {
    return useQuery({
        queryKey: requestEstimateQueryKeys.getRequestEstimates().queryKey,
        queryFn: () => API.getRequestEstimate(),
    });
};

/**
 * [RequestEstimate] 견적서 단일 조회
 * --
 */
export const useGetRequestEstimate = (request_estimate_id: number) => {
    return useQuery({
        queryKey: requestEstimateQueryKeys.getRequestEstimate(request_estimate_id).queryKey,
        queryFn: () => API.getOneRequestEstimate(request_estimate_id),
        enabled: !!request_estimate_id,
    });
};

/**
 * [RequestEstimate] 고객 견적서 조회
 * --
 */
export const useGetUserRequestEstimate = (user_id: number) => {
    return useQuery({
        queryKey: requestEstimateQueryKeys.getRequestEstimate(user_id).queryKey,
        queryFn: () => API.getUserRequestEstimate(user_id),
        enabled: !!user_id,
    });
};

/**
 * [RequestEstimate] 견적서 생성
 * --
 */
export const useCreateRequestEstimate = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postRequestEstimate(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('견적서 요청 생성 완료: ', data);

            queryClient.invalidateQueries(requestEstimateQueryKeys.getRequestEstimates());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('견적서 요청 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestEstimate] 견적서 수정
 * --
 */
export const useUpdateRequestEstimate = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ request_estimate_id, body }: { request_estimate_id: number, body: any }) => {
            const response = await API.putRequestEstimate(request_estimate_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('견적서 요청 수정 완료: ', data);

            queryClient.invalidateQueries(requestEstimateQueryKeys.getRequestEstimates());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('견적서 요청 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestEstimate] 견적서 삭제
 * --
 */
export const useDeleteRequestEstimate = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request_estimate_id: number) => {
            const response = await API.deleteRequestEstimate(request_estimate_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('견적서 요청 삭제 완료: ', data)

            queryClient.invalidateQueries(requestEstimateQueryKeys.getRequestEstimates());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('견적서 요청 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};