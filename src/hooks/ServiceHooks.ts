import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [Service] Query key 생성
 * --
 */
export const serviceQueryKeys = createQueryKeys('service', {
    getService: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getServices: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [Service] 서비스 전체 조회
 * --
 */
export const useGetServices = () => {
    return useQuery({
        queryKey: serviceQueryKeys.getServices().queryKey,
        queryFn: () => API.getService(),
    });
};

/**
 * [Service] 서비스 단일 조회
 * --
 */
export const useGetOneService = (service_id: number) => {
    return useQuery({
        queryKey: serviceQueryKeys.getService(service_id).queryKey,
        queryFn: () => API.getOneService(service_id),
        enabled: !!service_id,
    });
};

/**
 * [Service] 청소업체 서비스 조회
 * --
 */
export const useGetCompanyService = (company_id: number) => {
    return useQuery({
        queryKey: serviceQueryKeys.getService(company_id).queryKey,
        queryFn: () => API.getCompanyService(company_id),
        enabled: !!company_id,
    });
};

/**
 * [Service] 서비스 생성
 * --
 */
export const useCreateService = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postService(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('서비스 생성 완료: ', data);

            queryClient.invalidateQueries(serviceQueryKeys.getServices());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('서비스 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Service] 서비스 수정
 * --
 */
export const useUpdateService = (onSuccess?: (data: any) => void, onError?: (error: any) => void ) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ service_id, body }: { service_id: Number, body: any}) => {
            const response = await API.putService(service_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('서비스 수정 완료: ', data);

            queryClient.invalidateQueries(serviceQueryKeys.getServices());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('서비스 수정 실패: ', error);
        },
    });
};

/**
 * [Service] 서비스 삭제
 * --
 */
export const useDeleteService = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (service_id: number) => {
            const response = await API.deleteService(service_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('서비스 삭제 완료: ', data);

            queryClient.invalidateQueries(serviceQueryKeys.getServices());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('서비스 삭제 실패: ', error);
        },
    });
};