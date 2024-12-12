import './Breadcrumb.style.css';
import styled from 'styled-components';

const Item = styled.li.attrs(() => ({}))`
  & {
    font-size: ${(props) => props.size}px;
  }

  &:not(:last-child)::after {
    content: '${(props) => props.separator}';
    padding: 0px ${(props) => props.padding}px;
    ${(props) => props.separatorStyle}
  }

  &.clickable {
    cursor: pointer;
  }
`;

const Breadcrumb = ({
    items = [],
    style = {},
    itemStyle = {},
    separator = '|',
    padding = 16,
    size = 16,
    activeKey,
    activeColor,
    separatorStyle = {},
}) => {
    /* ===== Route ===== */
    /* ===== Props ===== */
    /* ===== State ===== */
    /* ===== Hooks ===== */
    /* ===== Function ===== */
    const BreadcrumbItem = ({ item, style }) => {
        return (
            <Item
                separator={separator}
                padding={padding}
                className={`breadcrumb_item ${item.onClick ? 'clickable' : ''}`}
                onClick={item.onClick ? item.onClick : () => { }}
                style={{
                    ...style,
                    ...(activeKey &&
                        activeKey === item.key && {
                        color: activeColor ?? 'var(--black-color)',
                    }),
                }}
                separatorStyle={separatorStyle}
                size={size}
            >
                {item.title}
            </Item>
        );
    };

    /* ===== Variable ===== */
    /* ===== Hooks ===== */
    /* ===== Render ===== */
    return (
        <ul className="breadcrumb_layout" style={{ ...style }}>
            {items.map((_item, _index) => (
                <BreadcrumbItem
                    item={_item}
                    key={`breadcrumb_${_index}`}
                    style={{ ...itemStyle }}
                    size={size}
                />
            ))}
        </ul>
    );
};

export default Breadcrumb;