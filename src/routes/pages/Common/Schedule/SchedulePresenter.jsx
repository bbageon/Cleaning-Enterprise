import { MainLayout } from '../../../../components';
import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { CalendarToolBar } from './components/CalendarToolBar';

import './Schedule.css';
import { ScheduleSidebar } from './components/ScheduleSidebar';

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

const SchedulePresenter = ({
    onSelected,

    tabList,

    events,

    requestList,
    changeMonth,
}) => {
    // moment.locale('ko-KR');
    // const localizer = momentLocalizer(moment);

    const formats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'E', culture), // 'E'는 한 글자 요일 ('월', '화' 등)
    };

    return (
        <MainLayout
            page='일정 관리'
            title='요청 목록'
            tabList={tabList}
            isShowHeader={false}
            CustomSidebar={
                <ScheduleSidebar
                    requestList={requestList}
                />
            }
            articleStyle={{ width: 'calc(100% - 15% - 15%)' }}
        >
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
                        toolbar: (props) => <CalendarToolBar {...props} changeMonth={changeMonth} />
                    }}
                    selectable
                />
            </div>
        </MainLayout>
    )
}

export default SchedulePresenter;