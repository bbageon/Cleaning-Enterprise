import './RequestInfo.css';
import { CRequestCleanInfo } from '../../class/requestClean-class';

interface RequestInfoProps {
    requestInfos: Array<CRequestCleanInfo>;
    type: string;
    activeCardId: number | null;
}

/**
 * 
 * @param type: 'beforeAccept', 'cleaning', 'cleanDone'
 * @returns 
 */
export const RequestInfo: React.FC<RequestInfoProps> = ({
    requestInfos,
    type = 'beforeAccept',
    activeCardId,
}) => {

    /* ===== RENDER ===== */
    return (
        <>
            {
                requestInfos?.map(requestInfo => {
                    console.log(requestInfo.services)
                    return (
                        <div
                            key={requestInfo.request_clean_id}
                            className={`request-info ${requestInfo.request_clean_id === activeCardId ? 'active' : ''}`}
                        >
                            <div className="date">
                                {
                                    new Date(requestInfo.request_date * 1000).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                }
                            </div>
                            <div className="info">
                                <div className="menu-info">
                                    <span>메뉴 {requestInfo?.services.length}개</span>
                                    <span>{requestInfo.total_price?.toLocaleString()}원</span>
                                    {type === 'beforeAccept' &&
                                        <span>수락 전</span>}
                                    {type === 'cleaning' &&
                                        <span>진행 중</span>}
                                    {type === 'cleanDone' &&
                                        <span>청소 완료</span>}
                                </div>
                                <div className="sub-menu-info">
                                    {
                                        requestInfo.services.map((service: any) => {
                                            return (
                                                <div>{service.service_name}</div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="address-info">
                                    <span>
                                        {requestInfo.clean_address}
                                    </span>
                                    <span>
                                        {requestInfo.clean_address_detail}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}