import { useState } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import SchedulePresenter from "./SchedulePresenter";
import { ScheduleInfo } from "./components";
import { getTimeFormat } from "../../../../api/API";

const ScheduleContainer = () => {
    const { navigate } = useCustomContext();
    const [beforeAccept, setBeforeAccept] = useState([
        {
            request_date: '13:33',
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: '13:33',
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: '13:33',
            quantity: 2,
            total_price: 45000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
    ]);
    const [cleaning, setCleaning] = useState([
        {
            request_date: '14:33',
            quantity: 2,
            total_price: 60000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: '15:25',
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: '13:33',
            quantity: 2,
            total_price: 48000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
    ]);
    const [cleanDone, setCleanDone] = useState([
        {
            request_date: '11:33',
            quantity: 2,
            total_price: 60000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: '12:25',
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: '13:33',
            quantity: 2,
            total_price: 48000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
    ]);

    const [tabList, setTabs] = useState({
        tabs: [
            {
                title: '수락전',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '수락전'
                        }
                    })
                },
                children: <ScheduleInfo
                    scheduleInfos={beforeAccept}
                    type='beforeAccept'
                />,
            },
            {
                title: '진행중',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '진행중'
                        }
                    })
                },
                children: <ScheduleInfo
                    scheduleInfos={cleaning}
                    type='cleaning'
                />,
            },
            {
                title: '청소 완료',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '청소 완료'
                        }
                    })
                },
                children: <ScheduleInfo
                    scheduleInfos={cleanDone}
                    type='cleanDone'
                />,
            },
        ],
        current_tab: '수락전',
    })

    const onSelected = (e) => {
        const time = getTimeFormat(e.slots[0]);

        // 시간에 맞는 청소요청 정보 가져오기
    }

    return (
        <SchedulePresenter
            onSelected={onSelected}

            tabList={tabList}
        />
    )
}

export default ScheduleContainer;