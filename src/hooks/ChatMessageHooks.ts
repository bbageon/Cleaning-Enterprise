import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [ChatMessage] Query key 생성
 * --
 */
export const chatMessageQueryKeys = createQueryKeys('chatMessage', {
    getChatMessage: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getChatMessages: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [ChatMessage] 채팅 메시지 전체 조회
 * --
 */
export const useGetChatMessages = () => {
    return useQuery({
        queryKey: chatMessageQueryKeys.getChatMessages().queryKey,
        queryFn: () => API.getChatMessage(),
    });
};

/**
 * [ChatMessage] 채팅 메시지 단일 조회
 * --
 */
export const useGetChatOneMessage = (message_id: number) => {
    return useQuery({
        queryKey: chatMessageQueryKeys.getChatMessage(message_id).queryKey,
        queryFn: () => API.getChatOneMessage(message_id),
        enabled: !!message_id,
    });
};

/**
 * [ChatMessage] 채팅방 메시지 조회
 * --
 */
export const useGetOneChatMessage = (room_id: number) => {
    return useQuery({
        queryKey: chatMessageQueryKeys.getChatMessage(room_id).queryKey,
        queryFn: () => API.getOneChatMessage(room_id),
        enabled: !!room_id,
    });
};

/**
 * [ChatMessage] 채팅 메시지 생성
 * --
 */
export const useCreateChatMessage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient(); // invalidateQueries를 위해 선언

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postChatMessage(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅 메시지 생성 완료: ', data);

            queryClient.invalidateQueries(chatMessageQueryKeys.getChatMessages());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('채팅 메시지 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [ChatMessage] 채팅 메시지 수정
 * --
 */
export const useUpdateChatMessage = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ message_id, body }: { message_id: number, body: any }) => {
            const response = await API.putChatMessage(message_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅 메시지 정보 수정 완료: ', data);

            queryClient.invalidateQueries(chatMessageQueryKeys.getChatMessages());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('채팅 메시지 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [ChatMessage] 채팅 메시지 삭제
 * --
 */
export const useDeleteChatMessage = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (message_id: number) => {
            const response = await API.deleteChatMessage(message_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅 메시지 삭제 완료: ', data)

            queryClient.invalidateQueries(chatMessageQueryKeys.getChatMessages());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('채팅 메시지 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};