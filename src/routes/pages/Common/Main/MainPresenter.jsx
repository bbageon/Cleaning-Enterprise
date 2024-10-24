import { MainLayout } from "../../../../components";

const MainPresenter = ({
    moveSchedule,
}) => {
    return (
        <MainLayout>
            <div
                className="main-container"
                onClick={moveSchedule}
            >
                
            </div>
        </MainLayout>
    )
}

export default MainPresenter;