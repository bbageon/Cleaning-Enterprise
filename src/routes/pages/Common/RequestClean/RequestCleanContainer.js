import { useEffect, useRef, useState } from "react";
import RequestCleanPresenter from "./RequestCleanPresenter";
import { useGetCompanyRequestClean } from "../../../../hooks/RequestCleanHooks";
import { RequestInfo } from "./components/RequestInfo/RequestInfo";
import { API } from "../../../../api";

const RequestCleanContainer = () => {

    /* ===== VARIABLES ===== */
    const companyId = 4;

    /* ===== STATE ===== */
    const [beforeAccept, setBeforeAccept] = useState([]);
    const [cleaning, setCleaning] = useState([]);
    const [cleanDone, setCleanDone] = useState([]);

    const [activeCardId, setActiveCardId] = useState(null);

    const [tabList, setTabs] = useState({
        tabs: [
            {
                title: '수락 전',
                type: 'beforeAccept',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '수락 전'
                        }
                    })
                },
            },
            {
                title: '진행 중',
                type: 'cleaning',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '진행 중'
                        }
                    })
                },
            },
            {
                title: '청소 완료',
                type: 'cleanDone',
                onClick: () => {
                    setTabs(prev => {
                        return {
                            ...prev,
                            current_tab: '청소 완료'
                        }
                    })
                },
            },
        ],
        current_tab: '수락 전',
    });

    /* ===== QUERY ===== */
    // 청소업체 청소요청 조회
    const { data: requestCleansRes, isLoading: requestCleansLoading, isError: requestCleansError } = useGetCompanyRequestClean(companyId);
    const requestCleans = requestCleansRes?.data || [];

    const isLoading = requestCleansLoading;

    /* ===== OBSERVER ===== */
    const observer = useRef(null);

    useEffect(() => {
        if (!requestCleans?.request_cleans) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCardId(Number(entry.target.getAttribute('data-id')));
                    }
                });
            },
            { threshold: 1 }
        );

        const cards = document.querySelectorAll('.request-clean-card-container');
        cards.forEach((card) => observer.current.observe(card));

        return () => {
            cards.forEach((card) => observer.current.unobserve(card));
        };
    });
    
    /* ===== EFFECT ===== */
    useEffect(() => {
        if (requestCleans?.request_cleans) {
            const fetchServiceList = async () => {
                const requestWithServices = await Promise.all(
                    requestCleans.request_cleans.map(async (request) => {
                        const result = await API.getCleanRequestCleanServiceList(request.request_clean_id);
                        return {
                            ...request,
                            services: result?.data?.request_clean_service_lists || [],
                        };
                    })
                );

                setBeforeAccept(requestWithServices.filter(req => req.request_status === 'WAITING'));
                setCleaning(requestWithServices.filter(req => req.request_status === 'CLEANING'));
                setCleanDone(requestWithServices.filter(req => req.request_status === 'DONE'));
            };

            fetchServiceList();
        }
    }, [requestCleans]);

    useEffect(() => {
        setTabs((prev) => ({
            ...prev,
            tabs: prev.tabs.map((tab) => ({
                ...tab,
                children: (
                    <RequestInfo
                        requestInfos={getRequestInfos(tab.type)}
                        type={tab.type}
                        activeCardId={activeCardId}
                    />
                )
            }))
        }))
    }, [activeCardId, beforeAccept, cleaning, cleanDone]);

    /* ===== FUNCTION ===== */
    const getRequestInfos = (type) => {
        switch (type) {
            case 'beforeAccept':
                return beforeAccept;
            case 'cleaning':
                return cleaning;
            case 'cleanDone':
                return cleanDone;
            default:
                return [];
        }
    };

    /* ===== RENDER ===== */
    return (
        <RequestCleanPresenter
            isLoading={isLoading}
            tabList={tabList}
            activeCardId={activeCardId}

            beforeAccept={beforeAccept}

            setBeforeAccept={setBeforeAccept}
            setCleaning={setCleaning}
        />
    );
};

export default RequestCleanContainer;