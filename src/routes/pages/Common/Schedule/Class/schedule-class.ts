import React from "react";

export class CScheduleInfo {
    // 요청 날짜
    request_date: number = 0;

    // 메뉴 개수
    quantity: number = 0;

    // 총 금액
    total_price: number = 0;

    // 요청 상태
    request_status: string = '결제 완료';

    // 요청 주소
    clean_address: string = '부산 사상구 주례로 47';

    // 요청 상세 주소
    clean_address_detail: string = '상세주소';
}

export class CChatRoomInfo {
    // 채팅방 이름
    chat_room_name: string = '';

    // 서브 이름
    sub_name: string = '';

    // 최신 채팅 날짜
    updated_at: number = 172356432;

    // 채팅 상태
    status: string = '';

    // 읽지 않은 메시지 수
    not_read_count: number = 0;
}