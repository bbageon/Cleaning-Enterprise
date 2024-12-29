import { useEffect, useState } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import { ScheduleInfo } from "./components";
import API, { getTimeFormat, getToday } from "../../../../api/API";
import MainPresenter from "./MainPresenter";
import { useGetCompanyRequestClean } from '../../../../hooks/RequestCleanHooks';

const MainContainer = () => {

    /* ===== VARIABLES ===== */
    const companyId = 1;

    /* ===== STATE ===== */
    const [beforeAccept, setBeforeAccept] = useState([]);
    const [cleaning, setCleaning] = useState([]);
    const [cleanDone, setCleanDone] = useState([]);

    const [tabList, setTabs] = useState({
        tabs: [
            {
                title: '수락 전',
                type: 'beforeAccept',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '수락 전'
                        }
                    })
                },
            },
            {
                title: '진행 중',
                type: 'cleaning',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '진행 중'
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
        current_tab: '수락 전',
    });


    const [events, setEvents] = useState([]);

    const [eventDatas, setEventDatas] = useState([])



    /* ===== QUERY ===== */
    const { data: requestCleansRes, isLoading: requestCleansLoading, isError: requestCleansError } = useGetCompanyRequestClean(companyId);
    const requestCleans = requestCleansRes?.data || [];



    /* ===== EFFECT ===== */

    useEffect(() => {
        if (requestCleans?.request_cleans) {
            const fetchServiceList = async () => {
                const requestWithServices = await Promise.all(
                    requestCleans.request_cleans.map(async (request) => {
                        const result = await API.getCleanRequestCleanServiceList(request.request_clean_id);
                        return {
                            ...request,
                            services: result?.data?.request_clean_service_lists || [],
                        };
                    })
                );

                setBeforeAccept(requestWithServices.filter(req => req.request_status === 'WAITING'));
                setCleaning(requestWithServices.filter(req => req.request_status === 'CLEANING'));
                setCleanDone(requestWithServices.filter(req => req.request_status === 'DONE'));
            };

            fetchServiceList();
        }
    }, [requestCleans]);

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



    /* ===== FUNCTION ===== */
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



    /* ===== RENDER ===== */
    return (
        <MainPresenter
            events={events}
            onSelected={onSelected}

            tabList={tabList}
        />
    )
}

export default MainContainer;