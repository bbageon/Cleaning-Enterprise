const SchedulePresenter = ({
    moveSchedule,
}) => {
    return (
        <div
            className="schedule-container"
            onClick={moveSchedule}
        >
            일정관리 페이지
        </div>
    )
}

export default SchedulePresenter;