import './MainContent.css';

const MainContent = ({
    children,
    gap,
    border,
    flexDirection,
    padding,
}) => {
    return (
        <div
            className='main-content-container'
            style={{
                flexDirection: flexDirection == 'row' ? 'row' : 'column',
                padding: padding,
                gap: `${gap}px`,
                borderBottom: border ? border : 'none',
            }}
        >
            {children}
        </div>
    );
};

export default MainContent;