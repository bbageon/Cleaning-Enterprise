import { Divider, Layout } from 'antd';
const { Content } = Layout;

const AdminContent = ({
    id = '',
    title = '',
    maxWidth = '100%',
    height = null,
    minHeight = null,
    maxHeight = null,
    style = {},
    children,
    className = '',
    backgroundColor = 'none',
    layout = false,
    padding = 20,
    fullWidth = false,
    borderRadius = 0,
    onClick = () => { },
}) => {

    /* ===== RENDER ===== */
    const view = (
        <Content
            id={id}
            className={className}
            style={{
                width: '100%',
                maxWidth: fullWidth ? '100%' : maxWidth,
                margin: '0 auto',
                background: backgroundColor,
                padding,
                ...(borderRadius && { borderRadius }),
                ...(minHeight && { minHeight }),
                ...(maxHeight && { maxHeight }),
                ...(height && { height }),
                ...style,
            }}
            onClick={onClick}
        >
            {title && <Divider orientation='center'>{title}</Divider>}
            {children}
        </Content>
    );
    return layout ? <Layout>{view}</Layout> : view;
};

export default AdminContent;