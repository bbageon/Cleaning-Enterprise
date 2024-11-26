import { useEffect, useState } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import SchedulePresenter from "./SchedulePresenter";
import { ScheduleInfo } from "./components";
import moment from "moment";

import API, { getDate, getTimeFormat, getToday } from "../../../../api/API";
import { getCookie } from "../../../../util";

const ScheduleContainer = () => {
    const { navigate } = useCustomContext();

    /**
     * @deprecated 일정관리 페이지
     */
    // 수락전, 진행중, 청소완료 목록을 보여주기 위한 state
    // const [beforeAccept, setBeforeAccept] = useState([
    //     {
    //         request_date: 172990409,
    //         quantity: 2,
    //         total_price: 50000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    //     {
    //         request_date: 172990409,
    //         quantity: 2,
    //         total_price: 50000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    //     {
    //         request_date: 172990409,
    //         quantity: 2,
    //         total_price: 45000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    // ]);
    // const [cleaning, setCleaning] = useState([
    //     {
    //         request_date: 12949503,
    //         quantity: 2,
    //         total_price: 60000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    //     {
    //         request_date: 12949503,
    //         quantity: 2,
    //         total_price: 50000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    //     {
    //         request_date: 12949503,
    //         quantity: 2,
    //         total_price: 48000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    // ]);
    // const [cleanDone, setCleanDone] = useState([
    //     {
    //         request_date: 123484357,
    //         quantity: 2,
    //         total_price: 60000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    //     {
    //         request_date: 123484357,
    //         quantity: 2,
    //         total_price: 50000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    //     {
    //         request_date: 123484357,
    //         quantity: 2,
    //         total_price: 48000,
    //         clean_address: '부산 사상구 주례로 47',
    //         clean_address_detail: '상세주소',
    //     },
    // ]);

    // const [tabList, setTabs] = useState({
    //     tabs: [
    //         {
    //             title: '수락전',
    //             type: 'beforeAccept',
    //             onClick: () => {
    //                 setTabs(prev => {
    //                     return {
    //                         ...prev,
    //                         current_tab: '수락전'
    //                     }
    //                 })
    //             },
    //         },
    //         {
    //             title: '진행중',
    //             type: 'cleaning',
    //             onClick: () => {
    //                 setTabs(prev => {
    //                     return {
    //                         ...prev,
    //                         current_tab: '진행중'
    //                     }
    //                 })
    //             },
    //         },
    //         {
    //             title: '청소 완료',
    //             type: 'cleanDone',
    //             onClick: () => {
    //                 setTabs(prev => {
    //                     return {
    //                         ...prev,
    //                         current_tab: '청소 완료'
    //                     }
    //                 })
    //             },
    //         },
    //     ],
    //     current_tab: '수락전',
    // });


    // 달력에 청소요청을 표시하기 위한 state
    const [events, setEvents] = useState([]);


    // 사이드바에 청소요청을 표시하기 위한 state
    const [requestList, setRequestList] = useState([
        // {
        //     date: '11월 4일',
        //     requests: [
        //         {
        //             element:
        //                 <div className={`calculate complete`}>
        //                     <div className="calculate-text">
        //                         <div className='main-text'>
        //                             <span>정산완료</span>
        //                             <span>
        //                                 <span>2</span>건
        //                             </span>
        //                         </div>
        //                         <div className='sub-text'>100,000원</div>
        //                     </div>
        //                 </div>
        //             // <div className={`calculate ${request_status === 'DONE' ? 'complete' : 'schedule'}`}>
        //             //     <div className="calculate-text">
        //             //         <div className='main-text'>
        //             //             <span>{request_status === 'DONE' ? '정산완료' : '정산예정'}</span>
        //             //             <span>{parseInt(count).toLocaleString()}건</span>
        //             //         </div>
        //             //         <div className='sub-text'>{parseInt(total_price_sum).toLocaleString()}원</div>
        //             //     </div>
        //             // </div>
        //         },
        //         {
        //             element:
        //                 <div className={`calculate schedule`}>
        //                     <div className="calculate-text">
        //                         <div className='main-text'>
        //                             <span>정산예정</span>
        //                             <span>
        //                                 <span>2</span>건
        //                             </span>
        //                         </div>
        //                         <div className='sub-text'>100,000원</div>
        //                     </div>
        //                 </div>
        //         },
        //     ],
        // },
        // {
        //     date: '11월 6일',
        //     requests: []
        // },
        // {
        //     date: '11월 13일',
        //     requests: [
        //         {
        //             element:
        //                 <div className={`calculate schedule`}>
        //                     <div className="calculate-text">
        //                         <div className='main-text'>
        //                             <span>정산예정</span>
        //                             <span>
        //                                 <span>2</span>건
        //                             </span>
        //                         </div>
        //                         <div className='sub-text'>100,000원</div>
        //                     </div>
        //                 </div>
        //         },
        //     ]
        // },
        // {
        //     date: '11월 23일',
        //     requests: [
        //         {
        //             element:
        //                 <div className={`calculate schedule`}>
        //                     <div className="calculate-text">
        //                         <div className='main-text'>
        //                             <span>정산예정</span>
        //                             <span>
        //                                 <span>2</span>건
        //                             </span>
        //                         </div>
        //                         <div className='sub-text'>100,000원</div>
        //                     </div>
        //                 </div>
        //         },
        //     ]
        // },
        // {
        //     date: '11월 26일',
        //     requests: [
        //         {
        //             element:
        //                 <div className={`calculate schedule`}>
        //                     <div className="calculate-text">
        //                         <div className='main-text'>
        //                             <span>정산예정</span>
        //                             <span>
        //                                 <span>2</span>건
        //                             </span>
        //                         </div>
        //                         <div className='sub-text'>100,000원</div>
        //                     </div>
        //                 </div>
        //         },
        //     ]
        // },
    ]);

    // 청소요청을 임시로 담아놓기 위한 state
    const [eventDatas, setEventDatas] = useState([]);
    const [requestListDatas, setRequestListDatas] = useState([]);


    /**
     * @deprecated 일정관리 페이지
     */
    // 가져온 청소요청이 수락전, 진행중, 청소완료 어디에 포함되는지 판단하는 함수
    // const getScheduleInfos = (type) => {
    //     switch (type) {
    //         case 'beforeAccept':
    //             return beforeAccept;
    //         case 'cleaning':
    //             return cleaning;
    //         case 'cleanDone':
    //             return cleanDone;
    //         default:
    //             return [];
    //     }
    // };

    // 처음 페이지가 로딩되면 달력과 사이드바에 띄울 요청을 가지고 온다.
    useEffect(() => {
        (
            async () => {
                try {
                    // 달력에 띄우는건 오늘 날짜를 기준으로 1년 전까지의 요청만 가져온다.
                    const today = getToday();
                    const result = await API.getYearRequestClean(today);

                    if (result.status === 500) {
                        throw new Error(`[getYearRequestClean] API Error`);
                    }

                    setEventDatas(result.data);

                    // 사이드바에 띄우는건 오늘 날짜에 해당하는 달의 1일 ~ 마지막 날까지의 요청만 가져온다.
                    const sidebarToday = new Date();
                    changeMonth(sidebarToday.getFullYear(), sidebarToday.getMonth() + 1);
                } catch (e) {
                    console.log(`[MainContainer][useEffect Mount] Error : ${e.message}`);
                }
            }
        )()
    }, []);

    // 달력에 띄울 요청을 가지고 왔을 때 이를 실제로 사용자에게 보여주는 state에 담기위한 작업
    useEffect(() => {
        eventDatas.forEach(data => {
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

    // 달력에 띄울 요청을 가지고 왔을 때 이를 실제로 사용자에게 보여주는 state에 담기위한 작업
    useEffect(() => {
        const request_data = {};

        requestListDatas.forEach(data => {
            const { start_clean_date, request_status, request_count, total_price_sum } = data;

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
                                    <span>{parseInt(request_count).toLocaleString()}</span>
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

    /**
     * @deprecated 일정관리 페이지
     */
    // // 수락전, 진행중, 청소완료를 실제로 사용자에게 보여주기 위한 작업
    // useEffect(() => {
    //     setTabs((prev) => ({
    //         ...prev,
    //         tabs: prev.tabs.map((tab) => ({
    //             ...tab,
    //             children: (
    //                 <ScheduleInfo
    //                     scheduleInfos={getScheduleInfos(tab.type)}
    //                     type={tab.type}
    //                 />
    //             ),
    //         })),
    //     }));
    // }, [beforeAccept, cleaning, cleanDone]);

    // 달력 날짜 선택 시 해당 날짜에 대한 청소 요청을 가져온다.
    // const onSelected = async (e) => {
    //     const date = getTimeFormat(e.slots[0]);

    //     // 시간에 맞는 청소요청 정보 가져오기
    //     const result = await API.getDateRequestClean(date);

    //     setBeforeAccept(result.data.beforeAccept);
    //     setCleaning(result.data.cleaning);
    //     setCleanDone(result.data.cleanDone);
    // }


    const last_day_each_date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 1월 ~ 12월까지의 마지막 날을 저장하는 배열

    // 달력을 넘길 시 해당 월의 청소요청 정보를 가져오는 함수
    const changeMonth = async (year, month) => {
        try {
            const firstDate = getTimeFormat(`${year}.${month}.01`);
            const lastDate = getTimeFormat(`${year}.${month}.${last_day_each_date[month - 1]}`);

            const result = await API.getPeriodRequestClean(firstDate, lastDate);

            if (result.status === 500) {
                throw new Error(`[getPeriodRequestClean] API Error`);
            }

            const uniqueData = result.data.filter(
                (item, index, array) =>
                    array.findIndex(i => i.request_status === item.request_status) === index
            );

            setRequestListDatas(uniqueData);

        } catch (e) {
            console.log(`[ScheduleContainer][changeMonth] Error : ${e.message}`);
        }

    }

    /**
     * 날짜 검색 관련
     */
    // 검색창을 띄우기 위한 state
    const [showSearchModal, setShowSearchModal] = useState(false);
    // 달력의 현재 월을 나타내는 state
    const [currentStartMonth, setCurrentStartMonth] = useState(moment().month());
    const [currentEndMonth, setCurrentEndMonth] = useState(moment().month());
    // 달력에서 선택한 시작일, 종료일을 나타내기 위한 state
    const [selectedStartDate, setSelectedStartDate] = useState(-1);
    const [selectedEndDate, setSelectedEndDate] = useState(-1);
    // 달력의 현재 날짜를 나타내기 위한 state (날짜 선택 후 달력이 이동되는 것을 방지)
    const [currentStartDate, setCurrentStartDate] = useState(new Date());
    const [currentEndDate, setCurrentEndDate] = useState(new Date(currentStartDate.getFullYear(), currentStartDate.getMonth() + 1, currentStartDate.getDate()));

    // 검색창을 띄우는 함수
    const toggleSearchModal = () => {
        setShowSearchModal(!showSearchModal);
        setSelectedStartDate(-1);
        setSelectedEndDate(-1);
    }

    /**
     * @params type: 'start' or 'end'
     */
    const selectSearchDay = (day, type) => {
        if (day.start === selectedStartDate) return;

        if (selectedStartDate === -1) {
            if (type === 'end') {
                alert('시작일을 선택해주세요!');
                return;
            }

            if (currentStartMonth !== moment(day.start).month()) return;
        }

        if (type === 'start' && (selectedStartDate === -1 || day.start < selectedStartDate)) setSelectedStartDate(day.start);
        // if (type === 'start') setSelectedStartDate(day.start);
        else setSelectedEndDate(day.start);
    }

    // 해당 월을 벗어난 날짜 숨기기
    const customDayPropGetter = (date) => {
        if (selectedStartDate && moment(date).isSame(selectedStartDate, 'day')) {
            return {
                className: 'selected-start-date', // 특정 CSS 클래스 추가
            };
        }
        else if (selectedEndDate && moment(date).isSame(selectedEndDate, 'day')) {
            return {
                className: 'selected-end-date', // 특정 CSS 클래스 추가
            };
        }
    }

    const selectMonth = (month, type) => {
        if (type === 'start') setCurrentStartMonth(month);
        else if (type === 'end') setCurrentEndMonth(month);
    }

    const selectDate = (date, type) => {
        if (type === 'start') setCurrentStartDate(date);
        else if (type === 'end') setCurrentEndDate(date);
    }

    /**
     * 검색창 관련
     */
    const [isSearchResult, setIsSearchResult] = useState(false);
    const [searchDate, setSearchDate] = useState(new Date());

    // 정산완료, 정산 에정 보여주는 티켓
    const [scheduleTicket, setScheduleTicket] = useState({});
    const [completeTicket, setCompleteTicket] = useState({});

    // 검색 결과를 저장하는 배열
    const [searchResult, setSearchResult] = useState([]);

    /**
     * 직원 관련
     */
    // 화면 출력을 위한 state
    const [assignedEmployeeList, setAssignedEmployeeList] = useState([]);
    const [nonAssignmentEmployeeList, setNonAssignmentEmployeeList] = useState([]);

    // 실제 DB 반영을 위한 state
    const [assignList, setAssignList] = useState([]);
    const [nonAssignList, setNonAssignList] = useState([]);

    // 검색 결과 가져오는 함수
    const search = async () => {
        if (selectedStartDate === -1) {
            alert('날짜를 선택해주세요');
            return;
        }

        const firstDate = getTimeFormat(selectedStartDate);
        const lastDate = getTimeFormat(selectedEndDate === -1 ? selectedStartDate : selectedEndDate);
        // 기간에 해당하는 청소 요청 가져오기
        const result = await API.getSearchPeriodRequestClean(firstDate, lastDate);
        if (result.status !== 200) {
            console.log(`[ScheduleContainer][serach][getSearchPeriodRequestClean] Error : ${result.message}`);
            return;
        }

        const searchData = result.data;
        console.log(searchData);

        // 배정된 직원 정보 가져오기
        const company_id = getCookie('id');
        console.log(company_id);
        const employeeResult = await API.getPeriodCompanyEmployeeAssignment(firstDate, lastDate, company_id);
        if (employeeResult.status !== 200) {
            console.log(`[ScheduleContainer][search][getCompanyEmployee] Error : ${result.message}`);
            return;
        }
        const { assignment_employee, non_assignment_employee } = employeeResult.data;

        // 화면 출력을 위한 setState
        setAssignedEmployeeList(assignment_employee);
        setNonAssignmentEmployeeList(non_assignment_employee);

        // 정산 티켓 
        const processedDates = new Set();
        let scheduleTicketData = {
            count: 0,
            total_price: 0,
        };
        let completeTicketData = {
            count: 0,
            total_price: 0,
        };

        searchData.map(data => {
            const dateKey = new Date(data.request_date * 1000).toISOString().split('T')[0];

            data.request_status === 'DONE' ?
                completeTicketData = {
                    count: completeTicketData.count + (processedDates.has(dateKey) ? 1 : 0),
                    total_price: completeTicketData.total_price + data.total_price,
                }
                :
                scheduleTicketData = {
                    count: scheduleTicketData.count + (processedDates.has(dateKey) ? 1 : 0),
                    total_price: scheduleTicketData.total_price + data.total_price,
                }
            processedDates.add(dateKey);
        })

        setScheduleTicket(scheduleTicketData);
        setCompleteTicket(completeTicketData);

        // 검색 결과
        const searchResultData = [];

        searchData.forEach(data => {
            // request_date를 YYYY-MM-DD 형식으로 변환
            const dateKey = new Date(data.request_date * 1000).toISOString().split('T')[0];

            // searchResultData에서 동일한 dateKey를 가진 항목을 찾음
            const existingEntry = searchResultData.find(entry => entry.date === dateKey);

            if (existingEntry) {
                // 동일한 dateKey가 있는 경우
                const existingRequest = existingEntry.requests.find(
                    request => request.request_clean_id === data.request_clean_id
                );

                if (existingRequest) {
                    // 동일한 request_clean_id가 있는 경우 service 추가
                    if (!existingRequest.service) {
                        existingRequest.service = [];
                    }
                    existingRequest.service.push(data);
                } else {
                    const service = {
                        service_name: data.service_name,
                        service_default_price: 40000,
                    }
                    // 동일한 request_clean_id가 없으면 새로운 요청 추가
                    existingEntry.requests.push({
                        ...data,
                        service: [service]
                    });
                }
            } else {
                // 동일한 dateKey가 없으면 새로운 항목 추가
                searchResultData.push({
                    date: dateKey,
                    requests: [{ ...data, service: [data] }],
                });
            }
        });

        // console.log(searchResultData);
        setSearchResult(searchResultData);

        setIsSearchResult(true);
        setShowSearchModal(false);
    }

    return (
        <SchedulePresenter
            // onSelected={onSelected}

            // tabList={tabList}

            events={events}

            requestList={requestList}
            changeMonth={changeMonth}

            showSearchModal={showSearchModal}

            currentStartDate={currentStartDate}
            currentEndDate={currentEndDate}
            selectDate={selectDate}

            selectMonth={selectMonth}
            selectSearchDay={selectSearchDay}

            customDayPropGetter={customDayPropGetter}
            toggleSearchModal={toggleSearchModal}

            search={search}
            isSearchResult={isSearchResult}
            setIsSearchResult={setIsSearchResult}

            searchDate={searchDate}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}

            scheduleTicket={scheduleTicket}
            completeTicket={completeTicket}
            searchResult={searchResult}
            assignedEmployeeList={assignedEmployeeList}
            nonAssignmentEmployeeList={nonAssignmentEmployeeList}
        />
    )
}

export default ScheduleContainer;