import './SearchToolBar.css';

export const SearchToolBar = ({
    date,
    onNavigate,
    selectMonth,
    type,
}) => {
    const navigate = (action) => {
        onNavigate(action);

        const newDate = new Date(date);
        if (action === 'PREV') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (action === 'NEXT') {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        
        selectMonth(newDate.getMonth(), type);
    }

    return (
        <div className="search-toolbar">
            <button type="button" onClick={navigate.bind(null, 'PREV')}>
                {'<'}
            </button>
            <span className="rbc-toolbar-label">
                {`${date.getFullYear()}.${date.getMonth() + 1}`}
            </span>
            <button type="button" onClick={navigate.bind(null, 'NEXT')}>
                {'>'}
            </button>
        </div>
    )
}