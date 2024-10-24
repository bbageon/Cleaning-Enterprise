import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [ReviewImage] Query Key 생성
 * --
 */
export const reviewImageQueryKeys = createQueryKeys('reviewImage', {
    getReviewImage: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getReviewImages: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [ReviewImage] 리뷰 이미지 전체 조회
 * --
 */
export const useGetReviewImages = () => {
    return useQuery({
        queryKey: reviewImageQueryKeys.getReviewImages().queryKey,
        queryFn: () => API.getReviewImage(),
    });
};

/**
 * [ReviewImage] 리뷰 이미지 단일 조회
 * --
 */
export const useGetOneReviewImage = (review_image_id: number) => {
    return useQuery({
        queryKey: reviewImageQueryKeys.getReviewImage(review_image_id).queryKey,
        queryFn: () => API.getOneReviewImage(review_image_id),
        enabled: !!review_image_id,
    });
};

/**
 * [ReviewImage] 리뷰에 대한 리뷰 이미지 조회
 * --
 */
export const useGetReviewImageAboutReview = (review_id: number) => {
    return useQuery({
        queryKey: reviewImageQueryKeys.getReviewImage(review_id).queryKey,
        queryFn: () => API.getReviewImageAboutReview(review_id),
        enabled: !!review_id,
    });
};

/**
 * [ReviewImage] 리뷰 이미지 생성
 * --
 */
export const useCreateReviewImage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postReviewImage(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('리뷰 이미지 생성 완료: ', data);

            queryClient.invalidateQueries(reviewImageQueryKeys.getReviewImages());

            if (onSuccess) {
                onSuccess(data);
            };
        },
        onError: (error) => {
            console.error('리뷰 이미지 생성 실패: ', error);

            if (onError) {
                onError(error);
            };
        },
    });
};

/**
 * [ReviewImage] 리뷰 이미지 수정
 * --
 */
export const useUpdateReviewImage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ review_image_id, body}: { review_image_id: number, body: any}) => {
            const response = await API.putReviewImage(review_image_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('리뷰 이미지 수정 완료: ', data);

            queryClient.invalidateQueries(reviewImageQueryKeys.getReviewImages());

            if (onSuccess) {
                onSuccess(data);
            };
        },
        onError: (error) => {
            console.error('리뷰 수정 실패: ', error);

            if (onError) {
                onError(error);
            };
        },
    });
};

/**
 * [ReviewImage] 리뷰 이미지 삭제
 * --
 */
export const useDeleteReviewImage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (review_image_id: number) => {
            const response = await API.deleteReviewImage(review_image_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('리뷰 이미지 삭제 완료: ', data);

            queryClient.invalidateQueries(reviewImageQueryKeys.getReviewImages());

            if (onSuccess) {
                onSuccess(data);
            };
        },
        onError: (error) => {
            console.error('리뷰 이미지 삭제 실패: ', error);

            if (onError) {
                onError(error);
            };
        },
    });
};