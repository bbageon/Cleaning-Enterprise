import React from "react";
import './RequestList.css';

export const RequestList = ({
    requestList,
}) => {
    return (
        <div className="request-list">
            {
                requestList?.map((request, idx) => {
                    const { date, requests } = request;
                    return (
                        <div className="request-wrap" key={idx}>
                            <div className="request-date">
                                {date}
                            </div>
                            <div className="request-elements">
                                {
                                    requests.map(req => (
                                        req.element
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}