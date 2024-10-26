import { CScheduleInfo } from "../../Class/schedule-class";
import './ScheduleInfo.css';

interface ScheduleInfoProps {
    scheduleInfos: Array<CScheduleInfo>;
}

export const ScheduleInfo: React.FC<ScheduleInfoProps> = ({
    scheduleInfos,
}) => {
    console.log(scheduleInfos)
    return (
        <>
            {
                scheduleInfos?.map(scheduleInfo => {
                    const { request_date, quantity, total_price, request_status, clean_address, clean_address_detail } = scheduleInfo;
                    return (
                        <div className="schedule-info">
                            <div className="date">
                                {request_date}
                            </div>
                            <div className="info">
                                <div className="menu-info">
                                    <span>메뉴{quantity}개</span>
                                    <span>{total_price?.toLocaleString()}원</span>
                                    <span>{request_status}</span>
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