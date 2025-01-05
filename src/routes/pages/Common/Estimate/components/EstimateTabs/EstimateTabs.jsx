import { useState } from 'react';
import './EstimateTabs.css';
import { useDeleteEstimateServiceList } from '../../../../../../hooks/EstimateServiceListHooks';
import formatPrice from '../../../../../../utils/priceUtils';

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
    estimate,
    estimateServiceList,
    estimateStatus,
}) => {

    /* ===== VARIABLES ===== */
    const totalPrice = estimateServiceList?.reduce((sum, service) => {
        const servicePrice = service.price_per_meter === 0 ? service.price_per_time : service.price_per_meter;
        return sum + (servicePrice * estimate.quantity);
    }, 0);

    /* ===== MUTATE ===== */
    const { mutate: deleteEstimateService } = useDeleteEstimateServiceList();

    /* ===== FUNCTION ===== */
    const handleDeleteService = (estimate_service_list_id) => {
        // 낙관적 업데이트로 삭제 처리
        deleteEstimateService(estimate_service_list_id);
    };

    /* ===== RENDER ===== */
    return (
        <div className='estimate-content-container'>

            {/* 타이틀 */}
            <div className='estimate-content-top'>
                <span className='bold large'>{title}</span>
                <button
                    className='download'
                    onClick={onClick}
                >다운로드</button>
            </div>
            {
                title === '서비스 목록' ? (
                    // 서비스 목록
                    <>
                        <div className='estimate-content-list'>
                            {
                                estimateServiceList?.map((service, index) => (
                                    <div
                                        key={index}
                                        className='estimate-content'
                                    >
                                        <span>{service.service_name}</span>
                                        <div>
                                            <span>
                                                + {formatPrice(service.price_per_meter === 0 ? service.price_per_time : service.price_per_meter)} x {estimate.quantity} = {formatPrice((service.price_per_meter === 0 ? service.price_per_time : service.price_per_meter) * estimate.quantity)} 원
                                            </span>
                                            {
                                                estimateStatus === 'ANSWER_COMPLETE' ? (
                                                    null
                                                ) : (
                                                    <button
                                                        className='estimate-delete'
                                                        onClick={() => handleDeleteService(service.estimate_service_list_id)}
                                                    >X</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div
                            className='estimate-content'
                            style={{
                                paddingTop: '1rem',
                                paddingBottom: '0.5rem',
                            }}
                        >
                            <span className='bold large'>총 금액</span>
                            <span className='bold large'>{formatPrice(totalPrice)}원</span>
                        </div>
                    </>
                ) : (
                    // 견적서 내용
                    <>
                        <div className='estimate-content-list'>
                            <div className='estimate-content'>
                                <span>서비스 항목 {estimateServiceList?.length}건</span>
                                <span>+ {formatPrice(totalPrice)}원</span>
                            </div>
                            <div className='estimate-content'>
                                <span>출장비</span>
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
                            <span className='bold large'>{formatPrice(totalPrice + 2500)}원</span>
                        </div>
                    </>
                )
            }
        </div>
    );
};

const EstimateTabs = ({
    estimate,
    estimateServiceList,
    estimateStatus,
}) => {

    console.log(estimateStatus);

    /* ===== STATE ===== */
    const [activeTab, setActiveTab] = useState(0);

    /* ===== VARIABLES ===== */
    const tabs = [
        {
            label: '견적서 내용',
            content:
                // 견적서 내용
                <EstimateContent
                    title='최종 견적서'
                    estimateServiceList={estimateServiceList}
                    estimate={estimate}
                />,
        },
        {
            label: '서비스 목록',
            content:
                // 서비스 목록
                <EstimateContent
                    title='서비스 목록'
                    estimateServiceList={estimateServiceList}
                    estimateStatus={estimateStatus}
                    estimate={estimate}
                />,
        },
    ];


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
            {estimateStatus === 'ANSWER_COMPLETE' ? null : (
                <div className='estimate-service-button'>
                    <button
                        style={{
                            backgroundColor: '#1E90FF'
                        }}
                    >
                        견적서 전송
                    </button>
                    {/* <button
                    style={{
                        backgroundColor: '#87CEEB'
                    }}
                >
                    견적서 저장
                </button> */}
                </div>
            )}
        </div>
    );
};

export default EstimateTabs;