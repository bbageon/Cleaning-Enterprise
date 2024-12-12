import { Col } from 'antd';

const ColComp = (props) => {

    /* ===== PROPS ===== */
    const {
        x = 12,
        xs = null,
        sm = null,
        md = null,
        lg = null,
        xl = null,
        xxl = null,
        padding = null,
        children,
        style = {},
        alignVertical = null,
    } = props;

    const alignCenterOption = {
        display: 'flex',
        ...(alignVertical && { alignItem: alignVertical }),
    };

    /* ===== RENDER ===== */
    return (
        <Col
            span={x}
            {...props}
            style={{
                ...style,
                ...(alignVertical && alignCenterOption),
                ...(xs && xs),
                ...(sm && sm),
                ...(md && md),
                ...(lg && lg),
                ...(xl && xl),
                ...(xxl && xxl),
                ...(padding && { padding }),
            }}
        >
            {children}
        </Col>
    );
};

export default ColComp;