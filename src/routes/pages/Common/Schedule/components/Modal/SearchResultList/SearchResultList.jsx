import './SearchResultList.css';

export const SearchResultList = ({
    results,
}) => {
    return (
        <div className="search-result-list">
            {
                results?.map(result => {
                    const { time, address, service_count, total_service_price, services } = result;
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
}