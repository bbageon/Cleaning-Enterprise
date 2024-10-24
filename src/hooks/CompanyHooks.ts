import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [Company] Query key 생성
 * --
 */
export const companyQueryKeys = createQueryKeys('company', {
    getCompany: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getCompanies: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [Company] 청소업체 전체 조회
 * --
 */
export const useGetCompanies = () => {
    return useQuery({
        queryKey: companyQueryKeys.getCompanies().queryKey,
        queryFn: () => API.getCompany(),
    });
};

/**
 * [Company] 청소업체 단일 조회
 * --
 */
export const useGetCompany = (company_id: number) => {
    return useQuery({
        queryKey: companyQueryKeys.getCompany(company_id).queryKey,
        queryFn: () => API.getOneCompany(company_id),
        enabled: !!company_id,
    });
};

/**
 * [Company] 청소업체 생성
 * --
 */
export const useCreateCompany = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postCompany(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 생성 완료: ', data);

            queryClient.invalidateQueries(companyQueryKeys.getCompanies());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Company] 청소업체 정보 수정
 * --
 */
export const useUpdateCompany = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ company_id, body }: { company_id: number, body: any }) => {
            const response = await API.putCompany(company_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 정보 수정 완료: ', data);

            queryClient.invalidateQueries(companyQueryKeys.getCompanies());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Company] 청소업체 삭제
 * --
 */
export const useDeleteCompany = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (company_id: number) => {
            const response = await API.deleteCompany(company_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 삭제 완료: ', data)

            queryClient.invalidateQueries(companyQueryKeys.getCompanies());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};