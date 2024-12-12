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
export const useCreateEstimateServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
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
export const useUpdateEstimateServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
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
 * [EstimateServiceList] 견적서 서비스 목록 삭제
 * --
 */
export const useDeleteEstimateServiceList = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (estimate_service_list_id: number) => {
            const response = await API.deleteEstimateServiceList(estimate_service_list_id);
            return response.data;
        },

        // 낙관적 업데이트(Optimistic Updates)
        onMutate: async (estimate_service_list_id: number) => {
            // 기존 데이터 캐시 저장
            const previousData = queryClient.getQueryData(estimateServiceListQueryKeys.getEstimateServiceLists().queryKey);

            // 캐시 업데이트: 삭제된 항목을 제외한 데이터만 유지
            queryClient.setQueryData(estimateServiceListQueryKeys.getEstimateServiceLists().queryKey, (oldData: any) => {
                if (!oldData?.data) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.filter((item: any) => item.estimate_service_list_id !== estimate_service_list_id),
                };
            });

            // 기존 데이터 반환 (에러 발싱 시 롤백용)
            return { previousData };
        },

        onSuccess: (data) => {
            // console.log('견적서 서비스 목록 삭제 완료: ', data);

            queryClient.invalidateQueries(estimateServiceListQueryKeys.getEstimateServiceLists());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error, variables, context) => {
            // console.error('견적서 서비스 목록 삭제 실패: ', error);

            // 이전 캐시 데이터로 롤백
            if (context?.previousData) {
                queryClient.setQueryData(estimateServiceListQueryKeys.getEstimateServiceLists().queryKey, context.previousData);
            }

            if (onError) {
                onError(error);
            }
        },
        onSettled: () => {
            // 모든 작업 완료 후 캐시를 무효화하여 서버와 동기화
            queryClient.invalidateQueries(estimateServiceListQueryKeys.getEstimateServiceLists());
        },
    });
};