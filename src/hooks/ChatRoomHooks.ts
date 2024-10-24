import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";

/**
 * [ChatRoom] Query key 생성
 * --
 */
export const chatRoomQueryKeys = createQueryKeys('chatRoom', {
    getChatRoom: (idx: number, params?: { [key: string]: string | number }) => [
        idx,
        params,
    ],
    getChatRooms: (params?: { [key: string]: string | number }) => [
        params,
    ],
});

/**
 * [ChatRoom] 채팅방 전체 조회
 * --
 */
export const useGetChatRooms = () => {
    return useQuery({
        queryKey: chatRoomQueryKeys.getChatRooms().queryKey,
        queryFn: () => API.getChatRoom(),
    });
};

/**
 * [ChatRoom] 채팅방 단일 조회
 * --
 */
export const useGetOneChatRoom = (room_id: number) => {
    return useQuery({
        queryKey: chatRoomQueryKeys.getChatRoom(room_id).queryKey,
        queryFn: () => API.getOneChatRoom(room_id),
        enabled: !!room_id,
    });
};

/**
 * [ChatRoom] 고객 채팅방 조회
 * --
 */
export const useGetUserChatRoom = (user_id: number) => {
    return useQuery({
        queryKey: chatRoomQueryKeys.getChatRoom(user_id).queryKey,
        queryFn: () => API.getUserChatRoom(user_id),
        enabled: !!user_id,
    });
};

/**
 * [ChatRoom] 청소업체 채팅방 조회
 * --
 */
export const useGetCompanyChatRoom = (company_id: number) => {
    return useQuery({
        queryKey: chatRoomQueryKeys.getChatRoom(company_id).queryKey,
        queryFn: () => API.getCompanyChatRoom(company_id),
        enabled: !!company_id,
    });
};

/**
 * [ChatRoom] 채팅방 생성
 * --
 */
export const useCreateChatRoom = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: any) => {
            const response = await API.postChatRoom(body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅방 생성 완료: ', data);

            queryClient.invalidateQueries(chatRoomQueryKeys.getChatRooms());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('채팅방 생성 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [ChatRoom] 채팅방 수정
 * --
 */
export const useUpdateChatRoom = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ room_id, body }: { room_id: number, body: any }) => {
            const response = await API.putChatRoom(room_id, body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅방 정보 수정 완료: ', data);

            queryClient.invalidateQueries(chatRoomQueryKeys.getChatRooms());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('채팅방 정보 수정 실패: ', error);

            if (onError) {
                onError(error);
            }
        },
    });
};

/**
 * [ChatRoom] 채팅방 삭제
 * --
 */
export const useDeleteChatRoom = (onSuccess?: (data: any) => void, onError?: (error:any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (room_id: number) => {
            const response = await API.deleteChatRoom(room_id);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅방 삭제 완료: ', data)

            queryClient.invalidateQueries(chatRoomQueryKeys.getChatRooms());

            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('채팅방 삭제 실패: ', error);

            if (onError) {
                onError(error);
            }
        }
    });
};