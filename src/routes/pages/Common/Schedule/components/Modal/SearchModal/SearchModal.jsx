import { CalendarToolBar } from '../../Calendar/CalendarToolBar';
import { SearchResultList } from '../SearchResultList';
import { SearchToolBar } from '../SearchToolBar/SearchToolBar';
import './SearchModal.css';

export const SearchModal = ({
    searchDate,
    setIsSearchResult,
}) => {
    const testList = [
        {
            time: '13:22',
            address: '경상남도 양산시 물금읍 범구로 14, 101동 4101호',
            service_count: 3,
            total_service_price: 20000,
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
            services: [
                '김재모의 슈퍼 청소',
                '김재모의 닦기',
                '김재모의 세척'
            ]
        },
    ]

    return (
        <>
            <CalendarToolBar
                date={searchDate}
            />
            <div className="search-modal">
                <div className="modal-header">
                    <div className="search-date">
                        <button>{'<'}</button>
                        <div className="date">2024년 10월 4일</div>
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
                                    <span>2</span>건
                                </span>
                            </div>
                            <div className='sub-text'>100,000원</div>
                        </div>
                    </div>
                    <div className={`calculate complete`}>
                        <div className="calculate-text">
                            <div className='main-text'>
                                <span>정산완료</span>
                                <span>
                                    <span>2</span>건
                                </span>
                            </div>
                            <div className='sub-text'>100,000원</div>
                        </div>
                    </div>
                </div>
                <SearchResultList
                    results={testList}
                />
            </div >
        </>
    )
}