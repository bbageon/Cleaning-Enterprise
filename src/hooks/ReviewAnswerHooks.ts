import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [ReviewAnswer] Query Key 생성
 * --
 */
export const reviewAnswerQueryKeys = createQueryKeys('reviewAnswer', {
    getReviewAnswer: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getReviewAnswers: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [ReviewAnswer] 리뷰 답변 전체 조회
 * --
 */
export const useGetReviewAnswers = () => {
    return useQuery({
        queryKey: reviewAnswerQueryKeys.getReviewAnswers().queryKey,
        queryFn: () => API.getReviewAnswer(),
    });
};

/**
 * [ReviewAnswer] 리뷰 답변 단일 조회
 * --
 */
export const useGetOneReviewAnswer = (review_answer_id: number) => {
    return useQuery({
        queryKey: reviewAnswerQueryKeys.getReviewAnswer(review_answer_id).queryKey,
        queryFn: () => API.getOneReviewAnswer(review_answer_id),
        enabled: !!review_answer_id,
    });
};

/**
 * [ReviewAnswer] 리뷰에 대한 리뷰 답변 조회
 * --
 */
export const useGetReviewOneReviewAnswer = (review_id: number) => {
    return useQuery({
        queryKey: reviewAnswerQueryKeys.getReviewAnswer(review_id).queryKey,
        queryFn: () => API.getReviewOneReviewAnswer(review_id),
        enabled: !!review_id,
    });
};

/**
 * [ReviewAnswer] 청소업체 리뷰 답변 조회
 * --
 */
export const useGetCompanyOneReviewAnswer = (company_id: number) => {
    return useQuery({
        queryKey: reviewAnswerQueryKeys.getReviewAnswer(company_id).queryKey,
        queryFn: () => API.getCompanyOneReviewAnswer(company_id),
        enabled: !!company_id,
    });
};

/**
 * [ReviewAnswer] 리뷰 답변 생성
 * --
 */
export const useCreateReviewAnswer = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postReviewAnswer(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('리뷰 답변 생성 완료:', data);

            queryClient.invalidateQueries(reviewAnswerQueryKeys.getReviewAnswers());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.log('리뷰 답변 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [ReviewAnswer] 리뷰 답변 수정
 * --
 */
export const useUpdateReviewAnswer = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ review_answer_id, body }: { review_answer_id: Number, body: any }) => {
            const response = await API.putReviewAnswer(review_answer_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('리뷰 답변 수정 완료:', data);

            queryClient.invalidateQueries(reviewAnswerQueryKeys.getReviewAnswers());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.log('리뷰 답변 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    })
};

/**
 * [ReviewAnswer] 리뷰 답변 삭제
 * --
 */
export const useDeleteReviewAnswer = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (review_answer_id) => {
            const response = await API.deleteReviewAnswer(review_answer_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('리뷰 답변 삭제 완료:', data);

            queryClient.invalidateQueries(reviewAnswerQueryKeys.getReviewAnswers());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.log('리뷰 답변 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    })
}