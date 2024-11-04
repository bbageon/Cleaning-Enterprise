import { useEffect, useState } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import { ScheduleInfo } from "./components";
import API, { getTimeFormat, getToday } from "../../../../api/API";
import MainPresenter from "./MainPresenter";

const MainContainer = () => {
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


    const [events, setEvents] = useState([
        // {
        //     title:
        //         <div className='calculate complete'>
        //             <div className='sub-text'>540,000원</div>
        //             <div className='main-text'>
        //                 <span>정산완료</span>
        //                 <span>12건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-23T13:45:00-05:00'),
        //     end: new Date('2024-10-23T14:00:00-05:00')
        // },
        // {
        //     title:
        //         <div className='calculate schedule'>
        //             <div className='sub-text'>240,000원</div>
        //             <div className='main-text'>
        //                 <span>정산예정</span>
        //                 <span>7건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-23T13:45:00-05:00'),
        //     end: new Date('2024-10-23T14:00:00-05:00')
        // },
        // {
        //     title:
        //         <div className='calculate complete'>
        //             <div className='sub-text'>540,000원</div>
        //             <div className='main-text'>
        //                 <span>정산완료</span>
        //                 <span>12건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-05T13:45:00-05:00'),
        //     end: new Date('2024-10-05T14:00:00-05:00')
        // },
        // {
        //     title:
        //         <div className='calculate schedule'>
        //             <div className='sub-text'>240,000원</div>
        //             <div className='main-text'>
        //                 <span>정산예정</span>
        //                 <span>7건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-05T13:45:00-05:00'),
        //     end: new Date('2024-10-05T14:00:00-05:00')
        // },
        // {
        //     title:
        //         <div className='calculate complete'>
        //             <div className='sub-text'>540,000원</div>
        //             <div className='main-text'>
        //                 <span>정산완료</span>
        //                 <span>12건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-01T13:45:00-05:00'),
        //     end: new Date('2024-10-01T14:00:00-05:00')
        // },
        // {
        //     title:
        //         <div className='calculate schedule'>
        //             <div className='sub-text'>240,000원</div>
        //             <div className='main-text'>
        //                 <span>정산예정</span>
        //                 <span>7건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-01T13:45:00-05:00'),
        //     end: new Date('2024-10-01T14:00:00-05:00')
        // },
        // {
        //     title:
        //         <div className='calculate schedule'>
        //             <div className='sub-text'>240,000원</div>
        //             <div className='main-text'>
        //                 <span>정산예정</span>
        //                 <span>7건</span>
        //             </div>
        //         </div>,
        //     start: new Date('2024-10-27T13:45:00-05:00'),
        //     end: new Date('2024-10-27T14:00:00-05:00')
        // },
    ]);

    const [eventDatas, setEventDatas] = useState([])

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
        (
            async () => {
                try {
                    const today = getToday();
                    const result = await API.getYearRequestClean(today);

                    if (result.status === 500) {
                        throw new Error(`[getYearRequestClean] API Error`);
                    }

                    setEventDatas(result.data);
                } catch (e) {
                    console.log(`[MainContainer][useEffect Mount] Error : ${e.message}`);
                }
            }
        )()
    }, []);

    useEffect(() => {
        eventDatas.forEach(data => {
            const { start_clean_date, end_clean_date, request_status, count, total_price_sum } = data;
            setEvents(prev => {
                return [
                    ...prev,
                    {
                        title: <div className={`calculate ${request_status === 'DONE' ? 'complete' : 'schedule'}`}>
                            <div className='sub-text'>{parseInt(total_price_sum).toLocaleString()}원</div>
                            <div className='main-text'>
                                <span>{request_status === 'DONE' ? '정산완료' : '정산예정'}</span>
                                <span>{parseInt(count).toLocaleString()}건</span>
                            </div>
                        </div>,
                        start: new Date(start_clean_date * 1000),
                        end: new Date(end_clean_date ? end_clean_date * 1000 : start_clean_date * 1000),
                    }
                ]
            })
        });
    }, [eventDatas]);

    useEffect(() => {
        console.log('useEffect => events');
        console.log(events)
    }, [events]);

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
        try {
            const date = getTimeFormat(e.slots[0]);

            // 시간에 맞는 청소요청 정보 가져오기
            const result = await API.getDateRequestClean(date);

            if (result.status === 500) {
                throw new Error(`[getDateRequestClean] API Error`);
            }

            setBeforeAccept(result.data.beforeAccept);
            setCleaning(result.data.cleaning);
            setCleanDone(result.data.cleanDone);
        } catch (e) {
            console.log(`[MainContainer][onSelected] Error : ${e.message}`);
        }
    }

    return (
        <MainPresenter
            events={events}
            onSelected={onSelected}

            tabList={tabList}
        />
    )
}

export default MainContainer;