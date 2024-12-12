import './Statistic.style.css';

const Statistic = ({
    title = '',
    value,
    prefix,
    suffix,
    style = {},
    titleStyle = {},
    valueStyle = { color: '#1C6BFF' },
    prefixStyle = {},
    suffixStyle = {},
    direction = 'column',
    align = 'left',
}) => {

    /* ===== RENDER ===== */
    return (
        <div
            className='statistic-layout'
            style={{ flexDirection: direction, textAlign: align, ...style }}
        >
            <h4 className='statistic-title' style={{ ...titleStyle }}>
                {title}
            </h4>
            <div
                className="statistic-value"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: direction === 'column' ? 0 : 4,
                }}
            >
                {prefix && <span style={{ ...prefixStyle }}>{prefix}</span>}
                <p style={{ ...valueStyle }}>{value}</p>
                {suffix && <span style={{ ...suffixStyle }}>{suffix}</span>}
            </div>
        </div>
    );
};

export default Statistic;