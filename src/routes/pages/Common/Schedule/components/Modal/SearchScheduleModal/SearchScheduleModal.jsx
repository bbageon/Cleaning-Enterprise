import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';

import { SearchToolBar } from '../SearchToolBar/SearchToolBar';

import './SearchScheduleModal.css';

export const SearchScheduleModal = ({
    currentStartDate,
    currentEndDate,
    selectDate,
    selectMonth,
    selectSearchDay,
    customDayPropGetter,
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
        <div
            className="search-schedule-modal"
        >
            <div className="start-schedule">
                <span>시작일</span>
                <Calendar
                    backgroundColor={'#fff'}
                    localizer={localizer}
                    startAccessor='start'
                    endAccessor='end'
                    tooltipAccessor='renderable'
                    views={['month']}
                    culture='ko'
                    formats={formats}
                    onSelectSlot={(e) => selectSearchDay(e, 'start')}
                    date={currentStartDate}
                    onNavigate={(e) => selectDate(e, 'start')}
                    dayPropGetter={customDayPropGetter}
                    components={{
                        toolbar: (props) =>
                            <SearchToolBar
                                {...props}
                                selectMonth={selectMonth}
                                type='start'
                            />
                    }}
                    selectable
                />
            </div>
            <div className="end-schedule">
                <span>종료일</span>
                <Calendar
                    backgroundColor={'#fff'}
                    localizer={localizer}
                    startAccessor='start'
                    endAccessor='end'
                    tooltipAccessor='renderable'
                    views={['month']}
                    culture='ko'
                    formats={formats}
                    onSelectSlot={(e) => selectSearchDay(e, 'end')}
                    date={currentEndDate}
                    onNavigate={(e) => selectDate(e, 'end')}
                    dayPropGetter={customDayPropGetter}
                    components={{
                        toolbar: (props) =>
                            <SearchToolBar
                                {...props}
                                selectMonth={selectMonth}
                                type='start'
                            />
                    }}
                    selectable
                />
            </div>
        </div>
    )
}