import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { MainLayout } from '../../../../components';
import { CalendarToolBar } from './components/CalendarToolBar';

import './Schedule.css';

const SchedulePresenter = ({
    onSelected,

    tabList,
}) => {
    const events = [
        {
            title:
                <div className='calculate complete'>
                    <div className='sub-text'>540,000원</div>
                    <div className='main-text'>
                        <span>정산완료</span>
                        <span>12건</span>
                    </div>
                </div>,
            start: new Date('2024-10-23T13:45:00-05:00'),
            end: new Date('2024-10-23T14:00:00-05:00')
        },
        {
            title:
                <div className='calculate schedule'>
                    <div className='sub-text'>240,000원</div>
                    <div className='main-text'>
                        <span>정산예정</span>
                        <span>7건</span>
                    </div>
                </div>,
            start: new Date('2024-10-23T13:45:00-05:00'),
            end: new Date('2024-10-23T14:00:00-05:00')
        },
        {
            title:
                <div className='calculate complete'>
                    <div className='sub-text'>540,000원</div>
                    <div className='main-text'>
                        <span>정산완료</span>
                        <span>12건</span>
                    </div>
                </div>,
            start: new Date('2024-10-05T13:45:00-05:00'),
            end: new Date('2024-10-05T14:00:00-05:00')
        },
        {
            title:
                <div className='calculate schedule'>
                    <div className='sub-text'>240,000원</div>
                    <div className='main-text'>
                        <span>정산예정</span>
                        <span>7건</span>
                    </div>
                </div>,
            start: new Date('2024-10-05T13:45:00-05:00'),
            end: new Date('2024-10-05T14:00:00-05:00')
        },
        {
            title:
                <div className='calculate complete'>
                    <div className='sub-text'>540,000원</div>
                    <div className='main-text'>
                        <span>정산완료</span>
                        <span>12건</span>
                    </div>
                </div>,
            start: new Date('2024-10-01T13:45:00-05:00'),
            end: new Date('2024-10-01T14:00:00-05:00')
        },
        {
            title:
                <div className='calculate schedule'>
                    <div className='sub-text'>240,000원</div>
                    <div className='main-text'>
                        <span>정산예정</span>
                        <span>7건</span>
                    </div>
                </div>,
            start: new Date('2024-10-01T13:45:00-05:00'),
            end: new Date('2024-10-01T14:00:00-05:00')
        },
        {
            title:
                <div className='calculate schedule'>
                    <div className='sub-text'>240,000원</div>
                    <div className='main-text'>
                        <span>정산예정</span>
                        <span>7건</span>
                    </div>
                </div>,
            start: new Date('2024-10-27T13:45:00-05:00'),
            end: new Date('2024-10-27T14:00:00-05:00')
        },
    ];

    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    return (
        <MainLayout
            page='일정 관리'
            title='요청 목록'
            tabList={tabList}
        >
            <Calendar
                backgroundColor={'#fff'}
                localizer={localizer}
                startAccessor='start'
                endAccessor='end'
                tooltipAccessor='renderable'
                events={events}
                draggableAccessor={(event) => true}
                views={['month']}
                onSelectSlot={onSelected}
                components={{
                    toolbar: CalendarToolBar
                }}
                selectable
            />
        </MainLayout>
    )
}

export default SchedulePresenter;