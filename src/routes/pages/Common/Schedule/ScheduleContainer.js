import { useEffect, useState, useRef } from "react";
import { useCustomContext } from "../../../../context/CustomContext";
import SchedulePresenter from "./SchedulePresenter";
import { ScheduleInfo } from "./components";
import moment from "moment";

import API, { getDate, getNextDate, getPrevDate, getTimeFormat, getToday } from "../../../../api/API";
import { cookie, getCookie } from "../../../../util";

const ScheduleContainer = () => {
    const { navigate } = useCustomContext();

    // 달력에 청소요청을 표시하기 위한 state
    const [events, setEvents] = useState([]);


    // 사이드바에 청소요청을 표시하기 위한 state
    const [requestList, setRequestList] = useState([]);

    // 청소요청을 임시로 담아놓기 위한 state
    const [eventDatas, setEventDatas] = useState([]);
    const [requestListDatas, setRequestListDatas] = useState([]);

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
    const toggleSearchModal = (isInitDay = true) => {
        setShowSearchModal(!showSearchModal);
        isInitDay && initSearchDate();
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

    // 검색 시작일, 종료일 초기화
    const initSearchDate = () => {
        setSelectedStartDate(-1);
        setSelectedEndDate(-1);
    }

    // 이전 결과 검색
    const prevDaySearch = () => {
        console.log('prevDaySearch');
        const prevDate = getPrevDate(selectedStartDate);

        search(
            getTimeFormat(
                prevDate
            )
        )

        setSelectedStartDate(prevDate);
        setSelectedEndDate(-1);
    }

    // 다음 결과 검색
    const nextDaySearch = () => {
        console.log('nextDaySearch');
        const nextDate = getNextDate(selectedEndDate === -1 ? selectedStartDate : selectedEndDate)

        search(
            getTimeFormat(
                nextDate
            )
        )

        setSelectedStartDate(nextDate);
        setSelectedEndDate(-1);
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
    const [searchResultOriginal, setSearchResultOriginal] = useState([]);

    // 검색 시 청소요청 결과 선택 여부
    const [isSelectRequest, setIsSelectRequest] = useState(false);
    // 선택한 청소요청
    const [selectedRequest, setSelectedRequest] = useState(null);
    const selectedRequestRef = useRef(null);

    /**
     * 직원 관련
     */
    // 배정 직원 출력 여부 state
    const [showAssignmentEmployee, setShowAssignmentEmployee] = useState(false);

    // 초기 배정 상태 저장을 위한 state
    const [initAssignEmlpoyeeList, setInitAssignEmployeeList] = useState([]);
    const [initNonAssignEmployeeList, setInitNonAssignEmployeeList] = useState([]);

    // 화면 출력을 위한 state
    const [assignedEmployees, setAssignedEmployees] = useState([]);
    const [nonAssignedEmployees, setNonAssignedEmployees] = useState([]);

    // 실제 DB 반영을 위한 state
    const [assignList, setAssignList] = useState([]);
    const [nonAssignList, setNonAssignList] = useState([]);


    // 검색 결과 가져오는 함수
    const search = async (date) => {
        console.log(date)
        if (selectedStartDate === -1) {
            alert('날짜를 선택해주세요');
            return;
        }

        let firstDate;
        let lastDate;

        if (!date) {
            firstDate = getTimeFormat(selectedStartDate);
            lastDate = getTimeFormat(selectedEndDate === -1 ? selectedStartDate : selectedEndDate);
        } else {
            firstDate = lastDate = date;
        }
        // 기간에 해당하는 청소 요청 가져오기
        const result = await API.getSearchPeriodRequestClean(firstDate, lastDate);
        if (result.status !== 200) {
            console.log(`[ScheduleContainer][search][getSearchPeriodRequestClean] Error : ${result.message}`);
            return;
        }

        // 청소요청 데이터 저장
        const searchData = result.data;

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

        // 정산 완료 및 정산 예정 계산
        searchData?.map(data => {
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

        // 검색 결과 전처리
        searchData?.forEach(data => {
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

        // 배정 안된 직원 정보 가져오기
        const id = cookie.getCookie('id');
        const nonAssignmentResult = await API.getCompanyEmployeeNonAssignment(id);
        if (nonAssignmentResult.status !== 200) {
            console.log(`[ScheduleContainer][search][getCompanyEmployee] Error : ${result.message}`);
            return;
        }

        // 배정 직원 정보 저장
        setNonAssignedEmployees(nonAssignmentResult.data);

        setSearchResult(searchResultData);
        setSearchResultOriginal(searchData);

        setIsSearchResult(true);
        setShowSearchModal(false);
    }

    // 검색 결과 청소요청 선택
    const handleSelectRequest = (request) => {
        setSelectedRequest({ ...request });
        selectedRequestRef.current = request;

        setAssignedEmployees(JSON.parse(JSON.stringify(request.assigned_employees)));
        setNonAssignedEmployees(JSON.parse(JSON.stringify(nonAssignedEmployees)));

        setInitAssignEmployeeList(JSON.parse(JSON.stringify(request.assigned_employees)));
        setInitNonAssignEmployeeList(JSON.parse(JSON.stringify(nonAssignedEmployees)));

        setIsSelectRequest(true);
    }

    // 직원 배정 삭제(반영 전) => - 클릭 시
    const handleUnAssignEmployee = (employee) => {
        setAssignedEmployees(assignedEmployees.filter(assign => assign !== employee));

        const non = nonAssignedEmployees.concat(employee);
        setNonAssignedEmployees(non);

        setAssignList(assignList.filter(assign => assign !== employee));
        setNonAssignList(nonAssignList.concat(employee));
    }

    // 직원 배정(반영 전) => + 클릭 시
    const handleAssignEmployee = (employee) => {
        setNonAssignedEmployees(nonAssignedEmployees.filter(assign => assign !== employee));

        const assign = assignedEmployees.concat(employee);
        setAssignedEmployees(assign);
        setNonAssignList(nonAssignList.filter(assign => assign !== employee));
        setAssignList(assignList.concat(employee));
    }

    // 직원 배정 반영
    const handleAssign = () => {
        try {
            const { request_clean_id } = selectedRequest;

            // 직원 배정(request_clean_id, employee_id 이용)
            if (assignList.length) {
                assignList.map(async (employee) => {
                    const { employee_id } = employee;
                    const result = await API.postEmployeeAssignment({
                        request_clean_id,
                        employee_id
                    })
                    if (result.status !== 200) {
                        throw new Error(`[postEmployeeAssignment] Error`);
                    }
                });
            }

            // 배정된 직원 삭제(employee_assignment_id 이용)
            if (nonAssignList.length) {
                nonAssignList.map(async (employee) => {
                    const { employee_id } = employee;
                    const result = await API.deleteAssignmentEmployee(employee_id)
                    if (result.status !== 200) {
                        throw new Error(`[deleteEmployeeAssignment] Error`);
                    }
                })
            }

            selectedRequestRef.current.assigned_employees = assignedEmployees;
            setSearchResult([...searchResult]);

            // 현재 상태를 init에 저장
            setInitAssignEmployeeList(JSON.parse(JSON.stringify(assignedEmployees)));
            setInitNonAssignEmployeeList(JSON.parse(JSON.stringify(nonAssignedEmployees)));

            setAssignList([]);
            setNonAssignList([]);
            setShowAssignmentEmployee(false);
        } catch (e) {
            console.log(`[ScheduleContainer][handleAssign] Error: ${e.messeage}`);
        }
    }

    // 직원 반영 취소
    const handleCancelAssign = () => {
        // assignedEmployees와 nonAssginedEmployees에 init을 반영한다
        setAssignedEmployees(initAssignEmlpoyeeList);
        setNonAssignedEmployees(initNonAssignEmployeeList);

        setShowAssignmentEmployee(false);
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

            // 검색 관련
            search={search}
            prevDaySearch={prevDaySearch}
            nextDaySearch={nextDaySearch}
            isSearchResult={isSearchResult}
            setIsSearchResult={setIsSearchResult}

            searchDate={searchDate}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}

            scheduleTicket={scheduleTicket}
            completeTicket={completeTicket}
            searchResult={searchResult}
            searchResultOriginal={searchResultOriginal}
            assignedEmployees={assignedEmployees}
            nonAssignedEmployees={nonAssignedEmployees}

            // 사이드바 관련
            isSelectRequest={isSelectRequest}
            selectedRequest={selectedRequest}
            handleSelectRequest={handleSelectRequest}

            // 직원 반영 관련 함수
            handleUnAssignEmployee={handleUnAssignEmployee}
            handleAssignEmployee={handleAssignEmployee}
            handleAssign={handleAssign}
            handleCancelAssign={handleCancelAssign}

            showAssignmentEmployee={showAssignmentEmployee}
            setShowAssignmentEmployee={setShowAssignmentEmployee}
        />
    )
}

export default ScheduleContainer;