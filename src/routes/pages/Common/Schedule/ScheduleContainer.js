import { useCustomContext } from "../../../../context/CustomContext";
import SchedulePresenter from "./SchedulePresenter"

const ScheduleContainer = () => {
    const { navigate } = useCustomContext();

    const moveSchedule = () => {
        navigate(`/`);
    }

    return (
        <SchedulePresenter
            moveSchedule={moveSchedule}
        />
    )
}

export default ScheduleContainer;