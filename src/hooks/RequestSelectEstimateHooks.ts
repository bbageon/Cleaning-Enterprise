import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [RequestSelectEstimate] Query Key 생성
 * --
 */
export const requestSelectEstimateQueryKeys = createQueryKeys('requestSelectEstimate', {
    getRequestSelectEstimate: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getRequestSelectEstimates: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [RequestSelectEstimate] 견적서 선택 전체 조회
 * --
 */
// export const useGetRequestSelectEstimates = () => {
//     return useQuery({
//         queryKey: requestSelectEstimateQueryKeys.getRequestSelectEstimates().queryKey,
//         queryFn: () => API.getRequestSelectEstimate(),
//     });
// };

/**
 * [RequestSelectEstimate] 견적서 선택 단일 조회
 * --
 */
// export const useGetOneRequestSelectEstimate = (select_estimate_id: number) => {
//     return useQuery({
//         queryKey: requestSelectEstimateQueryKeys.getRequestSelectEstimate(select_estimate_id).queryKey,
//         queryFn: () => API.getOneRequestSelectEstimate(select_estimate_id),
//         enabled: !!select_estimate_id,
//     });
// };

/**
 * [RequestSelectEstimate] 청소업체 견적서 선택 조회
 * --
 */
// export const useGetUserRequestSelectEstimate = (company_id: number) => {
//     return useQuery({
//         queryKey: requestSelectEstimateQueryKeys.getRequestSelectEstimate(company_id).queryKey,
//         queryFn: () => API.getUserRequestSelectEstimate(company_id),
//         enabled: !!company_id,
//     });
// };

/**
 * [RequestSelectEstimate] 견적서 선택 생성
 * --
 */
// export const useCreateRequestSelectEstimate = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (body: any) => {
//             const response = await API.postRequestSelectEstimate(body);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             console.log('견적서 선택 생성 완료: ', data);

//             queryClient.invalidateQueries(requestSelectEstimateQueryKeys.getRequestSelectEstimates());

//             if (onSuccess) {
//                 onSuccess(data);
//             }
//         },
//         onError: (error) => {
//             console.error('견적서 선택 생성 실패: ', error);
//         },
//     });
// };

/**
 * [RequestSelectEstimate] 견적서 선택 수정
 * --
 */
// export const useUpdateRequestSelectEstimate = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
//     const questClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ select_estimate_id, body }: { select_estimate_id: Number, body: any }) => {
//             const response = await API.putRequestSelectEstimate(select_estimate_id, body);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             console.log('견적서 선택 수정 완료: ', data);

//             questClient.invalidateQueries(requestSelectEstimateQueryKeys.getRequestSelectEstimates());

//             if (onSuccess) {
//                 onSuccess(data);
//             }
//         },
//         onError: (error) => {
//             console.error('견적서 선택 수정 실패: ', error);
//         },
//     });
// };

/**
 * [RequestSelectEstimate] 견적서 선택 삭제
 * --
 */
// export const useDeleteRequestSelectEstimate = (onSuccess?: (data: any) => void, onError?: (error: any) => void ) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (select_estimate_id: number) => {
//             const response = await API.deleteRequestSelectEstimate(select_estimate_id);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             console.log('견적서 선택 삭제 완료: ', data);

//             queryClient.invalidateQueries(requestSelectEstimateQueryKeys.getRequestSelectEstimates());

//             if (onSuccess) {
//                 onSuccess(data);
//             }
//         },
//         onError: (error) => {
//             console.error('견적서 선택 삭제 실패: ', error);
//         },
//     });
// };
