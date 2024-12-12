import { Row } from 'antd'

const Container = ({
    justify = 'start', // ['center', 'start', 'end']
    gutter = [0, 0],
    style = {},
    padding = null,
    children,
}) => {

    /* ===== RENDER ===== */
    return (
        <Row
            justify={justify}
            style={{
                ...style,
                ...(padding && { padding })
            }}
            gutter={gutter}
        >
            {children}
        </Row>
    );
};

export default Container;