import { MainLayout } from "../../../../components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const MainPresenter = ({
    events,
    onSelected,

    tabList,
}) => {
    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    return (
        <MainLayout
            page='메인 화면'
            tabList={tabList}
            isShowHeader={false}
            isRight={true}
            isFull={true}
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
                // components={{
                //     toolbar: CalendarToolBar
                // }}
                selectable
            />
        </MainLayout>
    )
}

export default MainPresenter;