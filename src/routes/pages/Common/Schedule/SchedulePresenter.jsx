import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { MainLayout } from '../../../../components';

import './Schedule.css';

const SchedulePresenter = ({

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
                    <div className='sub-text'>540,000원</div>
                    <div className='main-text'>
                        <span>정산완료</span>
                        <span>12건</span>
                    </div>
                </div>,
            start: new Date('2024-10-23T13:45:00-05:00'),
            end: new Date('2024-10-23T14:00:00-05:00')
        },
    ];

    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    return (
        <MainLayout>
            <Calendar
                backgroundColor={'#fff'}
                localizer={localizer}
                startAccessor='start'
                endAccessor='end'
                // components={{
                //     toolbar: () => (<></>)
                // }}
                events={events}
                draggableAccessor={(event) => true}
                views={['month']}
            />
        </MainLayout>
    )
}

export default SchedulePresenter;