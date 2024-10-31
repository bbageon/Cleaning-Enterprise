import './MainSidebar.css';

const MainSidebar = ({
    tabList,
}) => {
    const { tabs, current_tab } = tabList;

    return (

        <div className="main-sidebar">
            <div className="tabs">
                {
                    tabs?.map((tab, index) => {
                        const { title, onClick } = tab;
                        return (
                            <div
                                key={index}
                                className={`tab ${title === current_tab ? 'select' : ''}`}
                                onClick={onClick}
                            >
                                {title}
                            </div>
                        )
                    })
                }
            </div>
            <div className="contents">
                {
                    tabs?.map((tab, index) => {
                        const { title, children } = tab;
                        return (
                            <div
                                key={index}
                                className={`tab ${title === current_tab ? 'visible' : 'invisible'}`}
                            >
                                {children}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainSidebar;