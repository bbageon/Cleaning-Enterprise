import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [EstimateServiceList] Query Key 생성
 * ==
 */
export const estimateServiceListQueryKeys = createQueryKeys('estimateServiceList', {
    getEstimateServiceList: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getEstimateServiceLists: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [EstimateServiceList] 견적서 서비스 목록 전체 조회
 * --
 */
export const useGetEstimateServiceLists = () => {
    return useQuery({
        queryKey: estimateServiceListQueryKeys.getEstimateServiceLists().queryKey,
        queryFn: () => API.getEstimateServiceList(),
    });
};

/**
 * [EstimateServiceList] 견적서 서비스 목록 단일 조회
 * --
 */
export const useGetOneEstimateServiceList = (estimate_service_list_id: number) => {
    return useQuery({
        queryKey: estimateServiceListQueryKeys.getEstimateServiceList(estimate_service_list_id).queryKey,
        queryFn: () => API.getOneEstimateServiceList(estimate_service_list_id),
        enabled: !!estimate_service_list_id,
    });
};

/**
 * [EstimateServiceList] 견적서의 견적서 서비스 목록 단일 조회
 * --
 */
export const useGetEstimateEstimateServiceList = (estimate_id: number) => {
    return useQuery({
        queryKey: estimateServiceListQueryKeys.getEstimateServiceList(estimate_id).queryKey,
        queryFn: () => API.getEstimateEstimateServiceList(estimate_id),
        enabled: !!estimate_id,
    });
};

/**
 * [EstimateServiceList] 청소업체의 견적서 서비스 목록 단일 조회
 * --
 */
export const useGetCompanyEstimateServiceList = (company_id: number) => {
    return useQuery({
        queryKey: estimateServiceListQueryKeys.getEstimateServiceList(company_id).queryKey,
        queryFn: () => API.getCompanyEstimateServiceList(company_id),
        enabled: !!company_id,
    });
};

/**
 * [EstimateServiceList] 견적서 서비스 목록 생성
 * --
 */
export const useCreateRequestCleanServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postEstimateServiceList(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('견적서 서비스 목록 생성 완료: ', data);

            queryClient.invalidateQueries(estimateServiceListQueryKeys.getEstimateServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('견적서 서비스 목록 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [EstimateServiceList] 견적서 서비스 목록 수정
 * --
 */
export const useUpdateRequestCleanServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( {estimate_service_list_id, body}: { estimate_service_list_id: number, body: any}) => {
            const response = await API.putEstimateServiceList(estimate_service_list_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('견적서 서비스 목록 수정 완료: ', data);

            queryClient.invalidateQueries(estimateServiceListQueryKeys.getEstimateServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('견적서 서비스 목록 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [EstimateServiceList] 견적서 서비스 목록 삭제 수정
 * --
 */
export const useDeleteRequestCleanServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (estimate_service_list_id: number) => {
            const response = await API.deleteRequestCleanServiceList(estimate_service_list_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('견적서 서비스 목록 삭제 완료: ', data);

            queryClient.invalidateQueries(estimateServiceListQueryKeys.getEstimateServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('견적서 서비스 목록 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};