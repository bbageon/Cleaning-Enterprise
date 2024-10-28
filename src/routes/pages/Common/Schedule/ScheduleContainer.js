import { useEffect, useState } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import SchedulePresenter from "./SchedulePresenter";
import { ScheduleInfo } from "./components";
import API, { getTimeFormat } from "../../../../api/API";

const ScheduleContainer = () => {
    const { navigate } = useCustomContext();
    const [beforeAccept, setBeforeAccept] = useState([
        {
            request_date: 172990409,
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: 172990409,
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: 172990409,
            quantity: 2,
            total_price: 45000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
    ]);
    const [cleaning, setCleaning] = useState([
        {
            request_date: 12949503,
            quantity: 2,
            total_price: 60000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: 12949503,
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: 12949503,
            quantity: 2,
            total_price: 48000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
    ]);
    const [cleanDone, setCleanDone] = useState([
        {
            request_date: 123484357,
            quantity: 2,
            total_price: 60000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: 123484357,
            quantity: 2,
            total_price: 50000,
            clean_address: '부산 사상구 주례로 47',
            clean_address_detail: '상세주소',
        },
        {
            request_date: 123484357,
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
                type: 'beforeAccept',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '수락전'
                        }
                    })
                },
            },
            {
                title: '진행중',
                type: 'cleaning',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '진행중'
                        }
                    })
                },
            },
            {
                title: '청소 완료',
                type: 'cleanDone',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '청소 완료'
                        }
                    })
                },
            },
        ],
        current_tab: '수락전',
    });

    const getScheduleInfos = (type) => {
        switch (type) {
            case 'beforeAccept':
                return beforeAccept;
            case 'cleaning':
                return cleaning;
            case 'cleanDone':
                return cleanDone;
            default:
                return [];
        }
    };

    useEffect(() => {
        setTabs((prev) => ({
            ...prev,
            tabs: prev.tabs.map((tab) => ({
                ...tab,
                children: (
                    <ScheduleInfo
                        scheduleInfos={getScheduleInfos(tab.type)}
                        type={tab.type}
                    />
                ),
            })),
        }));
    }, [beforeAccept, cleaning, cleanDone]);

    const onSelected = async (e) => {
        const date = getTimeFormat(e.slots[0]);

        // 시간에 맞는 청소요청 정보 가져오기
        const result = await API.getDateRequestClean(date);

        setBeforeAccept(result.data.beforeAccept);
        setCleaning(result.data.cleaning);
        setCleanDone(result.data.cleanDone);
    }

    return (
        <SchedulePresenter
            onSelected={onSelected}

            tabList={tabList}
        />
    )
}

export default ScheduleContainer;