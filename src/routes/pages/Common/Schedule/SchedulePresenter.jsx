import { MainLayout } from '../../../../components';
import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';

import { CalendarToolBar } from './components/Calendar/CalendarToolBar';

import { ScheduleSidebar } from './components/Calendar/ScheduleSidebar';
import { SearchScheduleModal } from './components/Modal/SearchScheduleModal';
import { ScheduleCalendar } from './components/Calendar/ScheduleCalendar';
import { SearchModal } from './components/Modal/SearchModal';

import './Schedule.css';

const SchedulePresenter = ({
    onSelected,

    tabList,

    events,

    requestList,
    changeMonth,

    showSearchModal,

    currentStartDate,
    currentEndDate,
    selectDate,
    selectMonth,
    selectSearchDay,

    customDayPropGetter,
    toggleSearchModal,

    search,
    prevDaySearch,
    nextDaySearch,
    isSearchResult,
    setIsSearchResult,

    searchDate,
    selectedStartDate,
    selectedEndDate,
    scheduleTicket,
    completeTicket,
    searchResult,
    searchResultOriginal,
    assignedEmployees,
    nonAssignedEmployees,

    // 사이드바 관련
    isSelectRequest,
    selectedRequest,
    handleSelectRequest,

    // 직원 반영 관련 함수
    handleUnAssignEmployee,
    handleAssignEmployee,
    handleAssign,
    handleCancelAssign,

    showAssignmentEmployee,
    setShowAssignmentEmployee,
}) => {
    return (
        <MainLayout
            page='일정 관리'
            title='요청 목록'
            tabList={tabList}
            isShowHeader={false}
            CustomSidebar={
                <ScheduleSidebar
                    requestList={requestList}
                    isSearchResult={isSearchResult}
                    assignedEmployees={assignedEmployees}
                    nonAssignedEmployees={nonAssignedEmployees}

                    isSelectRequest={isSelectRequest}
                    selectedRequest={selectedRequest}

                    handleUnAssignEmployee={handleUnAssignEmployee}
                    handleAssignEmployee={handleAssignEmployee}
                    handleAssign={handleAssign}
                    handleCancelAssign={handleCancelAssign}

                    showAssignmentEmployee={showAssignmentEmployee}
                    setShowAssignmentEmployee={setShowAssignmentEmployee}
                />
            }
            articleStyle={{ width: 'calc(100% - 15% - 15%)' }}
        >
            <div className="schedule-container">
                <div className="schedule-wrap">
                    {
                        isSearchResult ?
                            <SearchModal
                                searchDate={searchDate}
                                selectedStartDate={selectedStartDate}
                                selectedEndDate={selectedEndDate}

                                setIsSearchResult={setIsSearchResult}

                                scheduleTicket={scheduleTicket}
                                completeTicket={completeTicket}
                                searchResult={searchResult}
                                searchResultOriginal={searchResultOriginal}

                                isSearchResult={isSearchResult}

                                handleSelectRequest={handleSelectRequest}

                                // 검색 관련
                                showSearchModal={showSearchModal}
                                currentStartDate={currentStartDate}
                                currentEndDate={currentEndDate}

                                selectDate={selectDate}
                                selectMonth={selectMonth}
                                selectSearchDay={selectSearchDay}

                                customDayPropGetter={customDayPropGetter}
                                toggleSearchModal={toggleSearchModal}

                                search={search}
                                prevDaySearch={prevDaySearch}
                                nextDaySearch={nextDaySearch}
                            /> :
                            <ScheduleCalendar
                                events={events}
                                onSelected={onSelected}

                                changeMonth={changeMonth}

                                // 검색 관련
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
                            />

                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default SchedulePresenter;