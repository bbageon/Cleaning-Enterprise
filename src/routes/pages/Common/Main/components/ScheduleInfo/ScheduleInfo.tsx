import { CScheduleInfo } from '../../../Schedule/Class/schedule-class';
import './ScheduleInfo.css';

interface ScheduleInfoProps {
    scheduleInfos: Array<CScheduleInfo>;
    type: string;
}

/**
 * 
 * @param type: 'beforeAccept', 'cleaning', 'cleanDone'
 * @returns 
 */
export const ScheduleInfo: React.FC<ScheduleInfoProps> = ({
    scheduleInfos,
    type = 'beforeAccept',
}) => {
    
    return (
        <>
            {
                scheduleInfos?.map(scheduleInfo => {
                    const { request_date, quantity, total_price, request_status, clean_address, clean_address_detail } = scheduleInfo;
                    return (
                        <div className="schedule-info">
                            <div className="date">
                                {
                                    new Date(request_date * 1000).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                }
                            </div>
                            <div className="info">
                                <div className="menu-info">
                                    <span>메뉴{quantity}개</span>
                                    <span>{total_price?.toLocaleString()}원</span>
                                    {type === 'beforeAccept' &&
                                        <span>수락전</span>}
                                    {type === 'cleaning' &&
                                        <span>진행중</span>}
                                    {type === 'cleanDone' &&
                                        <span>청소 완료</span>}
                                </div>
                                <div className="sub-menu-info">
                                    메뉴 1 / 메뉴 2 / 메뉴 3
                                </div>
                                <div className="address-info">
                                    {clean_address} {clean_address_detail}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}