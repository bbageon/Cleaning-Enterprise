import './MainSidebar.css';

const MainSidebar = ({
    tabList,
}) => {
    const { tabs, current_tab } = tabList;

    console.log(tabs)

    return (

        <div className="main-sidebar">
            <div className="tabs">
                {
                    tabs?.map(tab => {
                        const { title, onClick } = tab;
                        console.log(title);
                        console.log(current_tab);
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