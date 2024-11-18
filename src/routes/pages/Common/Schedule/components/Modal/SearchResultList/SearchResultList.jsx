import './SearchResultList.css';

export const SearchResultList = ({
    results,
}) => {
    return (
        <div className="search-result-list">
            {
                results?.map(result => {
                    const { date, requests } = result;
                    return (
                        <div className="search-result">
                            <div className="search-result-title">
                                {date}
                            </div>
                            {
                                requests?.map(request => {
                                    const { time, address, service_count, total_service_price, status, services } = request;
                                    return (
                                        <div className='search-result-info'>
                                            <div className="result-time">
                                                {time}
                                            </div>
                                            <div className="result-info">
                                                <div className="result-address">
                                                    {address}
                                                </div>
                                                <div className="result-service-info">
                                                    <span className={`
                                                        request ${status === 'DONE' ? 'complete' : 'schedule'}
                                                    `}>
                                                        {status === 'DONE' ? '정산완료' : '정산예정'}
                                                    </span>
                                                    [서비스 총 {service_count}개] 총 {total_service_price.toLocaleString()}원
                                                </div>
                                                <div className="result-service-list">
                                                    {services?.map(service => (
                                                        <span>
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}