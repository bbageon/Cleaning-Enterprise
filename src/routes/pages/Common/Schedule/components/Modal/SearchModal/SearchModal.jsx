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
    searchResultOriginal,

    isSearchResult,

    handleSelectRequest,

    // 검색 관련
    showSearchModal,
    currentStartDate,
    currentEndDate,

    selectDate,
    selectMonth,
    selectSearchDay,

    customDayPropGetter,
    toggleSearchModal,

    search,
    prevDaySearch,
    nextDaySearch,
}) => {
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    return (
        <>
            <CalendarToolBar
                date={searchDate}
                isSearchResult={isSearchResult}

                // 검색 관련
                showSearchModal={showSearchModal}
                currentStartDate={currentStartDate}
                currentEndDate={currentEndDate}

                selectDate={selectDate}
                selectMonth={selectMonth}
                selectSearchDay={selectSearchDay}

                customDayPropGetter={customDayPropGetter}
                toggleSearchModal={toggleSearchModal}
                search={search}
            />
            <div className="search-modal">
                <div className="modal-header">
                    <div className="search-date">
                        <button
                            onClick={prevDaySearch}
                        >
                            {'<'}
                        </button>
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
                        <button
                            onClick={nextDaySearch}
                        >
                            {'>'}
                        </button>
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
                    searchResultOriginal={searchResultOriginal}

                    handleSelectRequest={handleSelectRequest}
                />
            </div >
        </>
    )
}