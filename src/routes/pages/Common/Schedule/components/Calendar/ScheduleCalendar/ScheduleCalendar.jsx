import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';

import { CalendarToolBar } from '../CalendarToolBar';
import { SearchScheduleModal } from '../../Modal/SearchScheduleModal';

export const ScheduleCalendar = ({
    events,
    onSelected,

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
}) => {
    const locales = {
        'ko': ko,
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    const formats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'E', culture), // 'E'는 한 글자 요일 ('월', '화' 등)
    };

    return (
        <div className='schedule-calendar'>
            <Calendar
                backgroundColor={'#fff'}
                localizer={localizer}
                startAccessor='start'
                endAccessor='end'
                tooltipAccessor='renderable'
                events={events}
                draggableAccessor={(event) => true}
                views={['month']}
                culture='ko'
                formats={formats}
                onSelectSlot={onSelected}
                components={{
                    toolbar: (props) =>
                        <CalendarToolBar
                            {...props}
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
                        />
                }}
                selectable
            />
        </div>
    )
}