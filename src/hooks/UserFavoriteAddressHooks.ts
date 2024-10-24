import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [UserFavoriteAddress] Query key 생성
 * --
 */
export const userFavoriteAddressQueryKeys = createQueryKeys('userFavoriteAddress', {
    getUserFavoriteAddress: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getUserFavoriteAddresses: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [UserFavoriteAddress] 고객 즐겨찾기 전체 조회
 * --
 */
// export const useGetUserFavoriteAddresses = () => {
//     return useQuery({
//         queryKey: userFavoriteAddressQueryKeys.getUserFavoriteAddresses().queryKey,
//         queryFn: () => API.getUserFavoriteAddress(),
//     });
// };

/**
 * [UserFavoriteAddress] 고객 즐겨찾기 단일 조회
 * --
 */
// export const useGetUserOneFavoriteAddress = (favorite_id: number) => {
//     return useQuery({
//         queryKey: userFavoriteAddressQueryKeys.getUserFavoriteAddress(favorite_id).queryKey,
//         queryFn: () => API.getUserOneFavoriteAddress(favorite_id),
//         enabled: !!favorite_id,
//     });
// };

/**
 * [UserFavoriteAddress] 고객 즐겨찾기 조회
 * --
 */
// export const useGetOneUserFavoriteAddress = (userId: number) => {
//     return useQuery({
//         queryKey: userFavoriteAddressQueryKeys.getUserFavoriteAddress(userId).queryKey,
//         queryFn: () => API.getOneUserFavoriteAddress(userId),
//         enabled: !!userId,
//     });
// };

/**
 * [UserFavoriteAddress] 고객 즐겨찾기 생성
 * --
 */
// export const useCreateUserFavoriteAddress = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (body: any) => {
//             const response = await API.postUserFavoriteAddress(body);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             console.log('고객 즐겨찾기 생성 완료: ', data);

//             queryClient.invalidateQueries(userFavoriteAddressQueryKeys.getUserFavoriteAddresses());

//             if (onSuccess) {
//                 onSuccess(data);
//             }
//         },
//         onError: (error) => {
//             console.error('고객 즐겨찾기 생성 실패: ', error);

//             if (onError) {
//                 onError(error);
//             }
//         },
//     });
// };

/**
 * [UserFavoriteAddress] 고객 즐겨찾기 수정
 * --
 */
// export const useUpdateUserFavoriteAddress = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
//     const queryClient = useQueryClient();
    
//     return useMutation({
//         mutationFn: async ({ userId, body }: { userId: number, body: any }) => {
//             const response = await API.putUserFavoriteAddress(userId, body);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             console.log('고객 즐겨찾기 수정 완료: ', data);

//             queryClient.invalidateQueries(userFavoriteAddressQueryKeys.getUserFavoriteAddresses());

//             if (onSuccess) {
//                 onSuccess(data);
//             }
//         },
//         onError: (error) => {
//             console.error('고객 즐겨찾기 수정 실패: ', error);

//             if (onError) {
//                 onError(error);
//             }
//         },
//     });
// };

// /**
//  * [UserFavoriteAddress] 고객 즐겨찾기 삭제
//  * --
//  */
// export const useDeleteUserFavoriteAddress = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (favorite_id: number) => {
//             const response = await API.deleteUser(favorite_id);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             console.log('고객 즐겨찾기 삭제 완료: ', data)

//             queryClient.invalidateQueries(userFavoriteAddressQueryKeys.getUserFavoriteAddresses());

//             if (onSuccess) {
//                 onSuccess(data);
//             }
//         },
//         onError: (error) => {
//             console.error('고객 즐겨찾기 삭제 실패: ', error);

//             if (onError) {
//                 onError(error);
//             }
//         }
//     });
// };