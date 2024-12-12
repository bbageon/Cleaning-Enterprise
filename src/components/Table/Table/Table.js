import { useRef, useState, useEffect } from 'react';
import './Table.style.css';
import { Checkbox, Empty } from 'antd';

/**
 * NOTE: 체크박스를 사용할 경우 data 객체안에 key값은 필수 입니다.
 * --
 */
const Table = ({
    data = [],
    columns = [],
    isChecked = false,
    onRow,
    minHeight = 400,
    minWidth = 900,
    footer = [],
    empty,
    layoutStyle = {},
    headerStyle = {},
    bordered = true,
    hovered = true,
    checkedAll = false,
    checkedList = [],
    onChecked,
    onCheckedAll,
}) => {
    /* ===== STATE ===== */
    const [theadHeight, setTheadHeight] = useState(0);
    const theadRef = useRef(null);

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (theadRef.current) {
            setTheadHeight(theadRef.current.clientHeight);
        }
    }, [columns, isChecked]);

    /**
     * 전체 선택
     * --
     */
    useEffect(() => {
        if (isChecked && onChecked) {
            if (checkedAll) {
                onChecked(checkedAll, data, 'all');
            } else {
                onChecked(checkedAll, [], 'all');
            }
        }
    }, [isChecked, checkedAll]);

    /* ===== RENDER ===== */
    return (
        <div style={{ minHeight: minHeight, overflow: 'auto', ...layoutStyle }}>
            <table
                className={`table_layout ${bordered ? 'bordered' : ''} ${hovered ? 'hovered' : ''
                    }`}
                style={{ minWidth: minWidth }}
            >
                <colgroup>
                    {isChecked && <col style={{ width: 30 }} className="table_col" />}
                    {columns.map((_item, _index) => (
                        <col
                            key={`col-${_index}`}
                            style={{ width: _item.width ?? 150 }}
                            className="table_col"
                        />
                    ))}
                </colgroup>
                <thead className="table_head" ref={theadRef} style={{ ...headerStyle }}>
                    <tr>
                        {isChecked && (
                            <th className="table_head_th">
                                <Checkbox
                                    checked={checkedAll}
                                    onChange={() =>
                                        onCheckedAll && onCheckedAll({ type: 'TOGGLE' })
                                    }
                                />
                            </th>
                        )}
                        {columns.map((_item, _index) => (
                            <th
                                key={`thead_${_item.key}`}
                                className="table_head_th"
                                style={{ ...headerStyle }}
                            >
                                {_item.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table_body">
                    {data.length ? (
                        data.map((_item, _index) => (
                            <tr
                                style={{ cursor: onRow ? 'pointer' : 'default' }}
                                key={`body_${_index}`}
                                onClick={(e) => {
                                    if (e.target.tagName.toLowerCase() !== 'input') {
                                        onRow && onRow(_item);
                                    }
                                }}
                            >
                                {isChecked && (
                                    <td className="table_body_td">
                                        <div
                                            style={{ display: 'inline-block' }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={checkedList.some((c) => c.key === _item.key)}
                                                onChange={(e) => onChecked(e.target.checked, _item)}
                                            />
                                        </div>
                                    </td>
                                )}
                                {columns.map((_subitem, _subindex) => (
                                    <td
                                        colSpan={_subitem.col ?? 1}
                                        rowSpan={_subitem.row ?? 1}
                                        className="table_body_td"
                                        key={`${_subitem.key}_${_index}_${_subindex}`}
                                        style={{
                                            textAlign: _subitem.align ?? 'center',
                                            ..._subitem.style,
                                        }}
                                    >
                                        {_subitem.render ? (
                                            _subitem.render(_item[_subitem.key], _item)
                                        ) : typeof _item[_subitem.key] === 'object' ? (
                                            <div
                                                style={{ display: 'inline-block' }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {_item[_subitem.key]}
                                            </div>
                                        ) : (
                                            `${_item[_subitem.key]}`
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <td
                            colSpan={isChecked ? columns.length + 1 : columns.length}
                            style={{ padding: 0 }}
                        >
                            <div
                                className="table_empty"
                                style={{
                                    height: minHeight - theadHeight,
                                }}
                            >
                                {empty ? empty : <Empty />}
                            </div>
                        </td>
                    )}
                </tbody>
                <tfoot className="table_foot">
                    {footer &&
                        footer.map((_item, _index) => (
                            <tr key={`tfoot_${_index}`}>
                                <td colSpan={_item.col ?? 1} rowSpan={_item.row ?? 1}>
                                    {_item.title}
                                </td>
                                {_item.data.map((_subitem, _subindex) => (
                                    <td key={`tfoot_item_${_subindex}`}>{_subitem}</td>
                                ))}
                            </tr>
                        ))}
                </tfoot>
            </table>
        </div>
    );
};

export default Table;