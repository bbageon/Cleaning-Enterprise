import { useEffect, useState } from "react";
import EstimatePresenter from "./EstimatePresenter";
import { useGetRequestEstimates } from "../../../../hooks/RequestEstimateHooks";
import { EstimateInfo } from "./components/EstimateInfo/EstimateInfo";
import { useCreateEstimateServiceList, useGetEstimateServiceLists } from "../../../../hooks/EstimateServiceListHooks";

const EstimateContainer = () => {

    /* ===== VARIABLES ===== */
    /* ===== STATE ===== */
    // 답변 전 견적서
    const [beforeReply, setBeforeReply] = useState([]);
    // 답변 완료 견적서
    const [completeReply, setCompleteReply] = useState([]);
    // 선택된 견적서
    const [selectedEstimate, setSelectedEstimate] = useState(null);
    // 견적서 서비스 목록
    const [filteredEstimateServiceList, setFilteredEstimateServiceList] = useState([]);

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

    /* ===== MUTATE ===== */
    // 서비스 생성
    const { mutate: createEstimateService } = useCreateEstimateServiceList();

    /* ===== QUERY ===== */
    const { data: estimatesRes, isLoading: estimatesLoading, isError: estimatesError } = useGetRequestEstimates();
    const estimates = estimatesRes?.data || [];

    const { data: estimateServiceListRes, isLoading: estimateServiceListLoading, isError: estimateServiceListError } = useGetEstimateServiceLists();
    const estimateServiceList = estimateServiceListRes?.data || [];

    const isLoading = estimatesLoading || estimateServiceListLoading;

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (!isLoading && estimates?.length) {
            setBeforeReply(estimates.filter(estimate => estimate.estimate_status === 'ANSWER_WAITING'));
            setCompleteReply(estimates.filter(estimate => estimate.estimate_status === 'ANSWER_COMPLETE'));
        }
    }, [isLoading, estimates]);

    useEffect(() => {
        if (!isLoading && estimateServiceList?.length) {
            setFilteredEstimateServiceList(
                estimateServiceList
                    .filter(service => service.estimate_id === selectedEstimate?.estimate_id)
            );
        }
    }, [isLoading, estimateServiceList, selectedEstimate]);

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
                    />
                ),
            })),
        }));
    }, [beforeReply, completeReply]);

    /* ===== FUNCTION ===== */
    // 견적서 서비스 리스트 생성
    const handleCreateEstimateService = () => {
        createEstimateService({
            estimate_id: selectedEstimate.estimate_id,
            company_id: 1,
            service_name: serviceInfos.serviceName,
            category: serviceInfos.serviceCategory,
            price_per_meter: serviceInfos.serviceUnit === 'AREA' ? Number(serviceInfos.servicePrice) : 0,
            price_per_time: serviceInfos.serviceUnit === 'TIME' ? Number(serviceInfos.servicePrice) : 0,
            service_default_price: Number(serviceInfos.servicePrice),
            service_content: serviceInfos.serviceInfo,
        });
    };

    // 견적서 서비스 리스트 생성

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

            // 견적서 서비스 리스트 생성
            handleCreateEstimateService={handleCreateEstimateService}

            // 견적서 클릭 핸들러
            selectedEstimate={selectedEstimate}

            // 견적서 서비스 리스트
            estimateServiceList={filteredEstimateServiceList}
        />
    );
};

export default EstimateContainer;