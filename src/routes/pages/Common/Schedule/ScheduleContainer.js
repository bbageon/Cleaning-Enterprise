import { useEffect, useState } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import SchedulePresenter from "./SchedulePresenter";
import { ScheduleInfo } from "./components";
import API, { getDate, getTimeFormat, getToday } from "../../../../api/API";

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

    const [events, setEvents] = useState([]);
    const [eventDatas, setEventDatas] = useState([]);

    const [requestList, setRequestList] = useState([
        {
            date: '11월 4일',
            requests: [
                {
                    element:
                        <div className={`calculate complete`}>
                            <div className="calculate-text">
                                <div className='main-text'>
                                    <span>정산완료</span>
                                    <span>
                                        <span>2</span>건
                                    </span>
                                </div>
                                <div className='sub-text'>100,000원</div>
                            </div>
                        </div>
                    // <div className={`calculate ${request_status === 'DONE' ? 'complete' : 'schedule'}`}>
                    //     <div className="calculate-text">
                    //         <div className='main-text'>
                    //             <span>{request_status === 'DONE' ? '정산완료' : '정산예정'}</span>
                    //             <span>{parseInt(count).toLocaleString()}건</span>
                    //         </div>
                    //         <div className='sub-text'>{parseInt(total_price_sum).toLocaleString()}원</div>
                    //     </div>
                    // </div>
                },
                {
                    element:
                        <div className={`calculate schedule`}>
                            <div className="calculate-text">
                                <div className='main-text'>
                                    <span>정산예정</span>
                                    <span>
                                        <span>2</span>건
                                    </span>
                                </div>
                                <div className='sub-text'>100,000원</div>
                            </div>
                        </div>
                },
            ]
        },
        {
            date: '11월 6일',
            requests: []
        },
        {
            date: '11월 13일',
            requests: [
                {
                    element:
                        <div className={`calculate schedule`}>
                            <div className="calculate-text">
                                <div className='main-text'>
                                    <span>정산예정</span>
                                    <span>
                                        <span>2</span>건
                                    </span>
                                </div>
                                <div className='sub-text'>100,000원</div>
                            </div>
                        </div>
                },
            ]
        },
        {
            date: '11월 23일',
            requests: [
                {
                    element:
                        <div className={`calculate schedule`}>
                            <div className="calculate-text">
                                <div className='main-text'>
                                    <span>정산예정</span>
                                    <span>
                                        <span>2</span>건
                                    </span>
                                </div>
                                <div className='sub-text'>100,000원</div>
                            </div>
                        </div>
                },
            ]
        },
        {
            date: '11월 26일',
            requests: [
                {
                    element:
                        <div className={`calculate schedule`}>
                            <div className="calculate-text">
                                <div className='main-text'>
                                    <span>정산예정</span>
                                    <span>
                                        <span>2</span>건
                                    </span>
                                </div>
                                <div className='sub-text'>100,000원</div>
                            </div>
                        </div>
                },
            ]
        },
    ]);
    const [requestListDatas, setRequestListDatas] = useState([]);

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

                    const sidebarToday = new Date();
                    changeMonth(sidebarToday.getFullYear(), sidebarToday.getMonth() + 1);
                } catch (e) {
                    console.log(`[MainContainer][useEffect Mount] Error : ${e.message}`);
                }
            }
        )()
    }, []);

    useEffect(() => {
        eventDatas.forEach(data => {
            console.log(data)
            const { start_clean_date, end_clean_date, request_status, count, total_price_sum } = data;

            setEvents(prev => {
                return [
                    ...prev,
                    {

                        title: <div className={`calculate ${request_status === 'DONE' ? 'complete' : 'schedule'}`}>
                            <div className="calculate-text">
                                <div className='main-text'>
                                    <span>{request_status === 'DONE' ? '정산완료' : '정산예정'}</span>
                                    <span>{parseInt(count).toLocaleString()}건</span>
                                </div>
                                <div className='sub-text'>{parseInt(total_price_sum).toLocaleString()}원</div>
                            </div>
                        </div>,
                        start: new Date(start_clean_date),
                        end: new Date(end_clean_date ? end_clean_date : start_clean_date),
                    }
                ]
            })
        });
    }, [eventDatas]);

    useEffect(() => {
        const request_data = {};

        requestListDatas.forEach(data => {
            const { start_clean_date, request_status, count, total_price_sum } = data;

            // 날짜 포맷팅 (예: 'MM월 DD일' 형식)
            const current_date = new Date(start_clean_date);
            const formattedDate = `${current_date.getMonth() + 1}월 ${current_date.getDate()}일`;

            // 날짜가 존재하지 않으면 배열 초기화
            if (!request_data[formattedDate]) {
                request_data[formattedDate] = [];
            }

            // 각 날짜에 해당하는 요청 요소 추가
            request_data[formattedDate].push({
                element: (
                    <div className={`calculate ${request_status === 'DONE' ? 'complete' : 'schedule'}`}>
                        <div className="calculate-text">
                            <div className='main-text'>
                                <span>{request_status === 'DONE' ? '정산완료' : '정산예정'}</span>
                                <span>
                                    <span>{parseInt(count).toLocaleString()}</span>
                                    건
                                </span>
                            </div>
                            <div className='sub-text'>{parseInt(total_price_sum).toLocaleString()}원</div>
                        </div>
                    </div>
                )
            });
        });

        // request_data 객체를 requestList 배열 형식으로 변환
        const formattedRequestList = Object.keys(request_data).map(date => ({
            date,
            requests: request_data[date]
        }));

        setRequestList(formattedRequestList);
    }, [requestListDatas]);

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

    const last_day_each_date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const changeMonth = async (year, month) => {
        try {
            const firstDate = getTimeFormat(`${year}.${month}.01`);
            const lastDate = getTimeFormat(`${year}.${month}.${last_day_each_date[month - 1]}`);

            const result = await API.getPeriodRequestClean(firstDate, lastDate);

            if (result.status === 500) {
                throw new Error(`[getPeriodRequestClean] API Error`);
            }

            console.log(result.data);
            setRequestListDatas(result.data);
        } catch (e) {
            console.log(`[ScheduleContainer][changeMonth] Error : ${e.message}`);
        }

    }

    return (
        <SchedulePresenter
            onSelected={onSelected}

            tabList={tabList}

            events={events}

            requestList={requestList}
            changeMonth={changeMonth}
        />
    )
}

export default ScheduleContainer;