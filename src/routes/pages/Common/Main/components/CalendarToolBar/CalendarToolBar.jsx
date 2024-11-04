import './CalendarToolBar.css';

export const CalendarToolBar = ({
    date,
}) => {

    return (
        <div className="rbc-toolbar">
            <span className="rbc-toolbar-label">
                {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
            </span>
        </div>
    )
}