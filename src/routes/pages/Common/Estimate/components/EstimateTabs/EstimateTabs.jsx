import { useState } from 'react';
import './EstimateTabs.css';

/**
 * 견적서 탭
 */
const EstimateTab = ({
    label,
    isActive,
    onClick, 
}) => {
    return (
        <button
            className='estimate-button'
            style={{
                borderBottom: isActive ? '2.5px solid #000000' : ''
            }}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

/**
 * 견적서 컨텐츠
 */
const EstimateContent = ({
    title,
    onClick,
}) => {
    return (
        <div className='estimate-content-container'>
            <div className='estimate-content-top'>
                <span className='bold large'>{title}</span>
                <button
                    onClick={onClick}
                >다운로드</button>
            </div>
        </div>
    );
};

const EstimateTabs = ({

}) => {
    /* ===== VARIABLES ===== */
    const tabs = [
        {
            label: '견적서 내용',
            content:
                <EstimateContent
                    title='최종 견적서'
                />,
        },
        {
            label: '서비스 목록',
            content:
                <EstimateContent
                    title='서비스 목록'
                />,
        },
    ];

    /* ===== STATE ===== */
    const [activeTab, setActiveTab] = useState(0);


    /* ===== RENDER ===== */
    return (
        <div className='estimate-item-container'>
            <div className='estimate-tabs-button-container'>
                {
                    tabs.map((tab, index) => (
                        <EstimateTab
                            key={index}
                            label={tab.label}
                            isActive={activeTab === index}
                            onClick={() => setActiveTab(index)}
                        />
                    ))
                }
            </div>
            {tabs[activeTab].content}
        </div>
    );
};

export default EstimateTabs;