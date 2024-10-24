import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [CompanyCategory] Query key 생성
 * --
 */
export const companyCategoryQueryKeys = createQueryKeys('companyCategory', {
    getCompanyCategory: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getCompanyCategories: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [CompanyCategory] 청소업체 카테고리 전체 조회
 * --
 */
export const useGetCompanyCategories = () => {
    return useQuery({
        queryKey: companyCategoryQueryKeys.getCompanyCategories().queryKey,
        queryFn: () => API.getCompanyCategory(),
    });
};

/**
 * [CompanyCategory] 청소업체 카테고리 단일 조회
 * --
 */
export const useGetCompanyCategory = (category_id: number) => {
    return useQuery({
        queryKey: companyCategoryQueryKeys.getCompanyCategory(category_id).queryKey,
        queryFn: () => API.getOneCompanyCategory(category_id),
        enabled: !!category_id,
    });
};

/**
 * [CompanyCategory] 청소업체 카테고리 생성
 * --
 */
export const useCreateCompanyCategory = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient(); // invalidateQueries를 위해 선언

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postCompanyCategory(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 카테고리 생성 완료: ', data);

            queryClient.invalidateQueries(companyCategoryQueryKeys.getCompanyCategories());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 카테고리 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [CompanyCategory] 청소업체 카테고리 정보 수정
 * --
 */
export const useUpdateCompanyCategory = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ category_id, body }: { category_id: number, body: any }) => {
            const response = await API.putCompanyCategory(category_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 카테고리 정보 수정 완료: ', data);

            queryClient.invalidateQueries(companyCategoryQueryKeys.getCompanyCategories());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 카테고리 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [CompanyCategory] 청소업체 카테고리 삭제
 * --
 */
export const useDeleteCompanyCategory = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (category_id: number) => {
            const response = await API.deleteCompanyCategory(category_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 카테고리 삭제 완료: ', data)

            queryClient.invalidateQueries(companyCategoryQueryKeys.getCompanyCategories());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 카테고리 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};