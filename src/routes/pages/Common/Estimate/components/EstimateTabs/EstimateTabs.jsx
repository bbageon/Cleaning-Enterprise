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
                borderBottom: isActive ? '2.5px solid #000000' : '',
                fontWeight: isActive ? '600' : '',
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
                    className='download'
                    onClick={onClick}
                >다운로드</button>
            </div>

            <div className='estimate-content-list'>
                <div className='estimate-content'>
                    <span>김제모의 슈퍼 쓸기</span>
                    <span>+ 2,500원</span>
                </div>
                <div className='estimate-content'>
                    <span>김제모의 슈퍼 쓸기</span>
                    <span>+ 2,500원</span>
                </div>
                <div className='estimate-content'>
                    <span>김제모의 슈퍼 쓸기</span>
                    <span>+ 2,500원</span>
                </div>
            </div>

            <div
                className='estimate-content'
                style={{
                    paddingTop: '1rem',
                    paddingBottom: '0.5rem',
                }}    
            >
                <span className='bold large'>총 금액</span>
                <span className='bold large'>10,000원</span>
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

            {/* 탭 */}
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

            {/* 탭 내용 표시 */}
            {tabs[activeTab].content}

            {/* 서비스 버튼 */}
            <div className='estimate-service-button'>
                <button
                    style={{
                        backgroundColor: '#1E90FF'
                    }}
                >
                    견적서 전송
                </button>
                <button
                    style={{
                        backgroundColor: '#87CEEB'
                    }}
                >
                    견적서 저장
                </button>
            </div>
        </div>
    );
};

export default EstimateTabs;