import { useState } from 'react';
import { getDate, getTimeFormat } from '../../../../../../../api/API';
import './SearchResultList.css';

export const SearchResultList = ({
    results,
    searchResultOriginal,

    handleSelectRequest,
}) => {
    const [selectedKey, setSelectedKey] = useState(-1);

    return (
        <div className="search-result-list">
            {
                results?.map((result, idx) => {
                    const { date, requests } = result;
                    const search_date = date.split('-');
                    return (
                        <div className="search-result" key={idx}>
                            <div className="search-result-title">
                                {`
                                    ${search_date[0]}년 
                                    ${search_date[1]}월 
                                    ${search_date[2]}일
                                `}
                            </div>
                            {
                                requests?.map((request, idx) => {
                                    const { request_date, clean_address, clean_address_detail, service, total_price, request_status } = request;
                                    const time = new Date(request_date);

                                    return (
                                        <div
                                            className={`search-result-info ${selectedKey === idx && 'selected-search-result'}`}
                                            onClick={() => {
                                                handleSelectRequest(request)
                                                setSelectedKey(idx);
                                            }}
                                        >
                                            <div className="result-time">
                                                {time.getHours()}:{String(time.getMinutes()).padStart(2, '0')}
                                            </div>
                                            <div className="result-info">
                                                <div className="result-address">
                                                    {clean_address} {clean_address_detail}
                                                </div>
                                                <div className="result-service-info">
                                                    <span className={`
                                                        request ${request_status === 'DONE' ? 'complete' : 'schedule'}
                                                    `}>
                                                        {request_status === 'DONE' ? '정산완료' : '정산예정'}
                                                    </span>
                                                    [서비스 총 {service.length}개] 총 {total_price?.toLocaleString()}원
                                                </div>
                                                <div className="result-service-list">
                                                    {
                                                        service?.map(s => (
                                                            <span>
                                                                {s.service_name}
                                                            </span>
                                                        ))
                                                    }
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