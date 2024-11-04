import './MainSidebar.css';

const MainSidebar = ({
    tabList,
    className = '',
}) => {
    const { tabs, current_tab } = tabList;

    return (

        <div className={`main-sidebar ${className}`}>
            <div className="tabs">
                {
                    tabs?.map(tab => {
                        const { title, onClick } = tab;
                        return (
                            <div
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
                    tabs?.map(tab => {
                        const { title, children } = tab;
                        return (
                            <div
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