import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [RequestCleanImage] Query key 생성
 * --
 */
export const requestCleanImageQueryKeys = createQueryKeys('requestCleanImage', {
    getRequestCleanImage: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getRequestCleanImages: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [RequestCleanImage] 청소요청 이미지 전체 조회
 * --
 */
export const useGetRequestCleanImages = () => {
    return useQuery({
        queryKey: requestCleanImageQueryKeys.getRequestCleanImages().queryKey,
        queryFn: () => API.getRequestCleanImage(),
    });
};

/**
 * [RequestCleanImage] 청소요청 이미지 단일 조회
 * --
 */
export const useGetOneRequestCleanImage = (request_clean_image_id: number) => {
    return useQuery({
        queryKey: requestCleanImageQueryKeys.getRequestCleanImage(request_clean_image_id).queryKey,
        queryFn: () => API.getOneRequestCleanImage(request_clean_image_id),
        enabled: !!request_clean_image_id,
    });
};

/**
 * [RequestCleanImage] 단일 청소요청 이미지 조회
 * --
 */
export const useGetCompanyRequestCleanImage = (request_clean_id: number) => {
    return useQuery({
        queryKey: requestCleanImageQueryKeys.getRequestCleanImage(request_clean_id).queryKey,
        queryFn: () => API.getEachRequestCleanImage(request_clean_id),
        enabled: !!request_clean_id,
    });
};

/**
 * [RequestCleanImage] 청소요청 이미지 생성
 * --
 */
export const useCreateRequestCleanImage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postRequestCleanImage(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 이미지 생성 완료: ', data);

            queryClient.invalidateQueries(requestCleanImageQueryKeys.getRequestCleanImages());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 이미지 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestCleanImage] 청소요청 이미지 정보 수정
 * --
 */
export const useUpdateRequestCleanImage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ request_clean_id, body }: { request_clean_id: number, body: any }) => {
            const response = await API.putRequestCleanImage(request_clean_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 이미지 정보 수정 완료: ', data);

            queryClient.invalidateQueries(requestCleanImageQueryKeys.getRequestCleanImages());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 이미지 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [RequestCleanImage] 청소요청 이미지 삭제
 * --
 */
export const useDeleteRequestCleanImage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request_clean_id: number) => {
            const response = await API.deleteRequestCleanImage(request_clean_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소요청 이미지 삭제 완료: ', data)

            queryClient.invalidateQueries(requestCleanImageQueryKeys.getRequestCleanImages());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소요청 이미지 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};