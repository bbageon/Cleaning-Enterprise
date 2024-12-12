import React, { useRef, useState, useEffect } from 'react';
import './ExpandableContainer.style.css';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const ExpandableContainer = ({
    maxWidth = '100%',
    padding = 0,
    backgroundColor = '#FFFFFF',
    maxRows = 5,
    children = null,
    style = {},
    isExpand = false,
    borderRadius = 0,
    expandButton,
    expandButtonStyle = {},
    position = 'right',
}) => {
    /* ===== VARIABLES ===== */
    const childrenRows = React.Children.count(children);

    /* ===== STATE ===== */
    const expandRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(isExpand);
    const [maxHeight, setMaxHeight] = useState(null);

    /* ===== FUNCTION ===== */
    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (expandRef.current) {
            const allChildren = expandRef.current.children;
            let totalHeight = 0;

            Array.from(allChildren).forEach((child, index) => {
                if (index < maxRows) {
                    totalHeight += child.offsetHeight;
                }
            });
            setMaxHeight(totalHeight);
        }
    }, [children, maxRows]);

    /* ===== RENDER ===== */
    return (
        <>
            <div
                className="expandable-layout"
                style={{
                    maxWidth: maxWidth,
                    padding: padding,
                    background: backgroundColor,
                    borderRadius: borderRadius,
                    ...style,
                }}
            >
                <div
                    ref={expandRef}
                    className="expandable-content"
                    style={{
                        maxHeight: isExpanded ? '100%' : maxHeight,
                    }}
                >
                    {children}
                </div>
            </div>

            {childrenRows > maxRows && (
                <button
                    className="expand_button"
                    aria-expanded={isExpanded}
                    style={{
                        ...expandButtonStyle,
                        float: position,
                    }}
                    onClick={() => handleToggleExpanded()}
                >
                    {expandButton ? (
                        expandButton
                    ) : (
                        <>
                            상세검색 {isExpanded ? '접기' : '펼치기'}
                            <span>{isExpanded ? <UpOutlined /> : <DownOutlined />}</span>
                        </>
                    )}
                </button>
            )}
        </>
    );
};

export default ExpandableContainer;