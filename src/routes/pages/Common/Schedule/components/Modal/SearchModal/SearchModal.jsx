import { CalendarToolBar } from '../../Calendar/CalendarToolBar';
import { SearchResultList } from '../SearchResultList';
import { SearchToolBar } from '../SearchToolBar/SearchToolBar';
import './SearchModal.css';

export const SearchModal = ({
    searchDate,
    selectedStartDate,
    selectedEndDate,

    setIsSearchResult,

    scheduleTicket,
    completeTicket,
    searchResult,
}) => {
    const testList = [
        {
            date: '2024년 10월 4일',
            requests: [
                {
                    time: '13:22',
                    address: '경상남도 양산시 물금읍 범구로 14, 101동 4101호',
                    service_count: 3,
                    total_service_price: 20000,
                    status: 'DONE',
                    services: [
                        '김재모의 슈퍼 청소',
                        '김재모의 닦기',
                        '김재모의 세척'
                    ]
                },
            ]
        },
        {
            date: '2024년 10월 5일',
            requests: [
                {
                    time: '13:22',
                    address: '경상남도 양산시 물금읍 범구로 14, 101동 4101호',
                    service_count: 3,
                    total_service_price: 20000,
                    status: 'CALCELED',
                    services: [
                        '김재모의 슈퍼 청소',
                        '김재모의 닦기',
                        '김재모의 세척'
                    ]
                },
                {
                    time: '13:22',
                    address: '경상남도 양산시 물금읍 범구로 14, 101동 4101호',
                    service_count: 3,
                    total_service_price: 20000,
                    status: 'PAY_WAITING',
                    services: [
                        '김재모의 슈퍼 청소',
                        '김재모의 닦기',
                        '김재모의 세척'
                    ]
                },
            ]
        },
    ]

    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    return (
        <>
            <CalendarToolBar
                date={searchDate}
            />
            <div className="search-modal">
                <div className="modal-header">
                    <div className="search-date">
                        <button>{'<'}</button>
                        {/* <div className="date">2024년 10월 4일</div> */}
                        {
                            selectedEndDate === -1 ?
                                <div className="date">
                                    {`
                                        ${startDate.getFullYear()}년 
                                        ${startDate.getMonth() + 1}월 
                                        ${startDate.getDate()}일
                                    `}
                                </div> :
                                <div className="date">
                                    {`
                                        ${startDate.getFullYear()}년 
                                        ${startDate.getMonth() + 1}월 
                                        ${startDate.getDate()}일
                                    `}
                                    ~
                                    {`
                                        ${endDate.getFullYear()}년 
                                        ${endDate.getMonth() + 1}월 
                                        ${endDate.getDate()}일
                                    `}
                                </div>
                        }
                        <button>{'>'}</button>
                    </div>
                    <div
                        className="search-close"
                        onClick={() => setIsSearchResult(false)}
                    >
                        X
                    </div>
                </div>
                <div className="schedule-ticket">
                    <div className={`calculate schedule`}>
                        <div className="calculate-text">
                            <div className='main-text'>
                                <span>정산예정</span>
                                <span>
                                    <span>{scheduleTicket.count}</span>건
                                </span>
                            </div>
                            <div className='sub-text'>{scheduleTicket.total_price.toLocaleString()}원</div>
                        </div>
                    </div>
                    <div className={`calculate complete`}>
                        <div className="calculate-text">
                            <div className='main-text'>
                                <span>정산완료</span>
                                <span>
                                    <span>{completeTicket.count}</span>건
                                </span>
                            </div>
                            <div className='sub-text'>{completeTicket.total_price.toLocaleString()}원</div>
                        </div>
                    </div>
                </div>
                <SearchResultList
                    results={searchResult}
                />
            </div >
        </>
    )
}