import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [Employee] Query Key 생성
 * --
 */
export const employeeQueryKeys = createQueryKeys('employee', {
    getEmployee: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getEmployees: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [Employee] 직원 전체 조회
 * --
 */
export const useGetEmployees = () => {
    return useQuery({
        queryKey: employeeQueryKeys.getEmployees().queryKey,
        queryFn: () => API.getEmployee(),
    });
};

/**
 * [Employee] 직원 단일 조회
 * --
 */
export const useGetOneEmployee = (employee_id: number) => {
    return useQuery({
        queryKey: employeeQueryKeys.getEmployee(employee_id).queryKey,
        queryFn: () => API.getOneEmployee(employee_id),
        enabled: !!employee_id,
    });
};

/**
 * [Employee] 청소업체 직원 조회
 * --
 */
export const useGetCompanyEmployee = (company_id: number) => {
    return useQuery({
        queryKey: employeeQueryKeys.getEmployee(company_id).queryKey,
        queryFn: () => API.getCompanyEmployee(company_id),
        enabled: !!company_id,
    })
}

/**
 * [Employee] 직원 생성
 * --
 */
export const useCreateEmployee = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postEmployee(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('직원 생성 완료: ', data);

            queryClient.invalidateQueries(employeeQueryKeys.getEmployees());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('직원 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Employee] 직원 수정
 * --
 */
export const useUpdateUser = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ employee_id, body }: { employee_id: number, body: any }) => {
            const response = await API.putEmployee(employee_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('직원 정보 수정 완료: ', data);

            queryClient.invalidateQueries(employeeQueryKeys.getEmployees());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('직원 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [Employee] 직원 삭제
 * --
 */
export const useDeleteEmployee = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (employee_id: number) => {
            const response = await API.deleteEmployee(employee_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('직원 삭제 완료: ', data)

            queryClient.invalidateQueries(employeeQueryKeys.getEmployees());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('직원 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};