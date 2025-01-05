import './EstimateInfo.css';

export const EstimateInfo = ({
    estimateInfos,
    type = 'beforeReply',
    onCardClick,
}) => {



    /* ===== RENDER ===== */
    return (
        <>
            {
                estimateInfos?.map(estimateInfo => {
                    return (
                        <div
                            key={estimateInfo.estimate_id}
                            className='estimate-info'
                            onClick={() => onCardClick(estimateInfo)}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <div className="date">
                                {
                                    new Date(estimateInfo.created_at * 1000).toLocaleTimeString('ko-KR', {
                                        timeZone: 'Asia/Seoul', // 명시적으로 한국 시간대 설정
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                }
                            </div>
                            <div className="info">
                                <div className="menu-info">
                                    <span>{estimateInfo.user.name} 고객님</span>
                                    {type === 'beforeReply' &&
                                        <span>답변 전</span>}
                                    {type === 'completeReply' &&
                                        <span style={{
                                            color: '#46C872',
                                            border: '1px solid #46C872'
                                        }}>답변 완료</span>}
                                </div>
                                <div className="requirements-info">
                                    <span>
                                        {estimateInfo.clean_address}
                                    </span>
                                    <span>
                                        {estimateInfo.clean_address_detail}
                                    </span>
                                    <span>
                                        {estimateInfo.requirements}
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