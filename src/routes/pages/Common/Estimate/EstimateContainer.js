import { useEffect, useState } from "react";
import EstimatePresenter from "./EstimatePresenter";
import { useCreateService } from "../../../../hooks/ServiceHooks";
import { useGetRequestEstimates } from "../../../../hooks/RequestEstimateHooks";
import { EstimateInfo } from "./components/EstimateInfo/EstimateInfo";

const EstimateContainer = () => {

    /* ===== VARIABLES ===== */
    /* ===== STATE ===== */
    // 답변 전 견적서
    const [beforeReply, setBeforeReply] = useState([]);
    // 답변 완료 견적서
    const [completeReply, setCompleteReply] = useState([]);
    // 선택된 견적서
    const [selectedEstimate, setSelectedEstimate] = useState(null);

    // 탭
    const [tabList, setTabs] = useState({
        tabs: [
            {
                title: '답변 전',
                type: 'beforeReply',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '답변 전',
                        };
                    });
                },
            },
            {
                title: '답변 완료',
                type: 'completeReply',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '답변 완료'
                        };
                    });
                },
            },
        ],
        current_tab: '답변 전',
    });

    // 서비스 추가
    const [serviceInfos, setServiceInfos] = useState({
        serviceName: '',
        serviceCategory: '',
        servicePrice: 0,
        serviceUnit: '',
        serviceInfo: '',
    });
    /* ===== STORE ===== */

    /* ===== MUTATE ===== */
    // 서비스 생성
    const { mutate: createService } = useCreateService();

    /* ===== QUERY ===== */
    const { data: estimatesRes, isLoading: estimatesLoading, isError: estimatesError } = useGetRequestEstimates();
    const estimates = estimatesRes?.data || [];

    const isLoading = estimatesLoading;

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (!isLoading && estimates?.length) {
            setBeforeReply(estimates.filter(estimate => estimate.estimate_status === 'ANSWER_WAITING'));
            setCompleteReply(estimates.filter(estimate => estimate.estimate_status === 'ANSWER_COMPLETE'));
        }
    }, [isLoading, estimates]);

    useEffect(() => {
        setTabs((prev) => ({
            ...prev,
            tabs: prev.tabs.map((tab) => ({
                ...tab,
                children: (
                    <EstimateInfo
                        estimateInfos={getEstimateInfos(tab.type)}
                        type={tab.type}
                        onCardClick={handleEstimateClick}
                        selectedId={selectedEstimate?.estimate_id}
                    />
                ),
            })),
        }));
    }, [beforeReply, completeReply]);

    /* ===== FUNCTION ===== */
    // 서비스 생성
    const handleCreateService = () => {
        createService({
            company_id: 1,
            service_name: serviceInfos.serviceName,
            service_content: serviceInfos.serviceInfo,
            service_category: serviceInfos.serviceCategory,
            service_image: 'test',
            price_per_meter: serviceInfos.serviceUnit === 'AREA' ? Number(serviceInfos.servicePrice) : 0,
            price_per_time: serviceInfos.serviceUnit === 'TIME' ? Number(serviceInfos.servicePrice) : 0,
            service_default_price: Number(serviceInfos.servicePrice),
        });
    };

    // 탭 카테고리 구분
    const getEstimateInfos = (type) => {
        switch (type) {
            case 'beforeReply':
                return beforeReply;
            case 'completeReply':
                return completeReply;
            default:
                return [];
        }
    };

    // 견적서 클릭 업데이트
    const handleEstimateClick = (estimate) => {
        setSelectedEstimate(estimate);
    };

    /* ===== RENDER ===== */
    return (
        <EstimatePresenter
            isLoading={isLoading}

            // 탭
            tabList={tabList}

            // 서비스 설명
            serviceInfos={serviceInfos}
            setServiceInfos={setServiceInfos}

            // 서비스 생성
            handleCreateService={handleCreateService}

            // 견적서 클릭 핸들러
            selectedEstimate={selectedEstimate}
        />
    );
};

export default EstimateContainer;