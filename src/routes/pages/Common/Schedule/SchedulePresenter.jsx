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
    isSearchResult,
    setIsSearchResult,

    searchDate,
}) => {
    // moment.locale('ko-KR');
    // const localizer = momentLocalizer(moment);



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
                                setIsSearchResult={setIsSearchResult}
                            /> :
                            <ScheduleCalendar
                                events={events}
                                onSelected={onSelected}

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
                            />

                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default SchedulePresenter;