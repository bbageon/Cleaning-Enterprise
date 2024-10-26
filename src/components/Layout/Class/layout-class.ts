import React from "react";

export class CTab {
    // 사이드바 타이틀
    title: string = '';

    // 탭 클릭 시 동작하는 콜백함수
    onClick: object = () => { };

    // 탭의 본문 내용
    children: React.ReactNode;
}

export class CSidebarTab {
    tabs: Array<CTab> = [new CTab()];
    current_tab: string = '';
}
