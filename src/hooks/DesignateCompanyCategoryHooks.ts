import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [DesignateCompanyCategory] Query key 생성
 * --
 */
export const designateCompanyCategoryQueryKeys = createQueryKeys('designateCompanyCategory', {
    getDesignateCompanyCategory: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getDesignateCompanyCategories: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [DesignateCompanyCategory] 청소업체 카테고리 지정 전체 조회
 * --
 */
export const useGetDesignateCompanyCategories = () => {
    return useQuery({
        queryKey: designateCompanyCategoryQueryKeys.getDesignateCompanyCategories().queryKey,
        queryFn: () => API.getDesignateCompanyCategory(),
    });
};

/**
 * [DesignateCompanyCategory] 청소업체 카테고리 지정 단일 조회
 * --
 */
export const useGetOneDesignateCompanyCategory = (designate_id: number) => {
    return useQuery({
        queryKey: designateCompanyCategoryQueryKeys.getDesignateCompanyCategory(designate_id).queryKey,
        queryFn: () => API.getOneDesignateCompanyCategory(designate_id),
        enabled: !!designate_id,
    });
};

/**
 * [DesignateCompanyCategory] 청소업체의 청소업체 카테고리 전체 조회
 * --
 */
export const useGetCompanyDesignateCompanyCategory = (company_id: number) => {
    return useQuery({
        queryKey: designateCompanyCategoryQueryKeys.getDesignateCompanyCategory(company_id).queryKey,
        queryFn: () => API.getCompanyDesignateCompanyCategory(company_id),
        enabled: !!company_id,
    });
};

/**
 * [DesignateCompanyCategory] 청소업체 카테고리의 청소업체 전체 조회
 * --
 */
export const useGetCategoryDesignateCompanyCategory = (company_category_id: number) => {
    return useQuery({
        queryKey: designateCompanyCategoryQueryKeys.getDesignateCompanyCategory(company_category_id).queryKey,
        queryFn: () => API.getCategoryDesignateCompanyCategory(company_category_id),
        enabled: !!company_category_id,
    });
};

/**
 * [DesignateCompanyCategory] 청소업체 카테고리 지정 생성
 * --
 */
export const useCreateDesignateCompanyCategory = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postDesignateCompanyCategory(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 카테고리 지정 생성 완료: ', data);

            queryClient.invalidateQueries(designateCompanyCategoryQueryKeys.getDesignateCompanyCategories());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 카테고리 지정 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [DesignateCompanyCategory] 청소업체 카테고리 지정 정보 수정
 * --
 */
export const useUpdateDesignateCompanyCategory = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ designate_id, body }: { designate_id: number, body: any }) => {
            const response = await API.putDesignateCompanyCategory(designate_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 카테고리 지정 정보 수정 완료: ', data);

            queryClient.invalidateQueries(designateCompanyCategoryQueryKeys.getDesignateCompanyCategories());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 카테고리 지정 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [DesignateCompanyCategory] 청소업체 카테고리 지정 삭제
 * --
 */
export const useDeleteDesignateCompanyCategory = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (designate_id: number) => {
            const response = await API.deleteDesignateCompanyCategory(designate_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('청소업체 카테고리 지정 삭제 완료: ', data)

            queryClient.invalidateQueries(designateCompanyCategoryQueryKeys.getDesignateCompanyCategories());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('청소업체 카테고리 지정 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};