import './CalendarToolBar.css';

export const CalendarToolBar = ({
    date,
    onNavigate,
    changeMonth,
}) => {

    const navigate = (action) => {
        onNavigate(action);

        const newDate = new Date(date);
        if (action === 'TODAY') {
            newDate.setFullYear(new Date().getFullYear());
            newDate.setMonth(new Date().getMonth());
        } else if (action === 'PREV') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (action === 'NEXT') {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        changeMonth(newDate.getFullYear(), newDate.getMonth() + 1);

    }

    return (
        <div className="custom-rbc-toolbar">
            <div className="left-side">
                <span className="rbc-btn-group">
                    <button type="button" onClick={navigate.bind(null, 'TODAY')}>
                        Today
                    </button>
                    <button type="button" onClick={navigate.bind(null, 'PREV')}>
                        {'<'}
                    </button>
                    <button type="button" onClick={navigate.bind(null, 'NEXT')}>
                        {'>'}
                    </button>
                </span>
                <span className="rbc-toolbar-label">
                    {`${date.getFullYear()}.${date.getMonth() + 1}`}
                </span>
            </div>
            <div className="right-side">
                <div className="btn-group">
                    <button type="button">
                        <span>시작일</span>
                        <span>날짜 추가</span>
                    </button>
                    <button type="button">
                        <span>종료일</span>
                        <span>날짜 추가</span>
                    </button>
                    <button type="button">
                        <span>검색</span>
                    </button>
                </div>
            </div>
        </div>
    )
}