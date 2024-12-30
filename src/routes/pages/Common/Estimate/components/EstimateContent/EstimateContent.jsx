import { formatFullDate } from '../../../../../../utils/dateUtils';
import formatPhone from '../../../../../../utils/phoneUtils';

import './EstimateContent.css';


const EstimateContent = ({
    estimate,
}) => {

    console.log(estimate);

    /* ===== VARIABLES ===== */
    const category = {
        1: '이사/입주청소',
        2: '거주/생활청소',
        3: '가전/가구청소',
        4: '전문/특수청소',
        5: '사업장청소',
        6: '건물관리',
    };

    /* ===== RENDER ===== */
    return (
        <div className='estimate-item-container'>

            {/* 고객 정보 */}
            <div className='estimate-info-container'>
                <span
                    className='bold large'
                    style={{
                        width: '100%',
                    }}
                >고객 정보</span>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>이름</span>
                    <span className='estimate-info-content'>{estimate.user.name}</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>이메일</span>
                    <span className='estimate-info-content'>{estimate.user.email}</span>
                </div>
                {/* <div className='estimate-info-box'>
                    <span className='estimate-info-title'>청소요청 날짜</span>
                    <span className='estimate-info-content'>{formatFullDate(estimate.request_date)}</span>
                </div> */}
                {/* <div className='estimate-info-box'>
                    <span className='estimate-info-title'>시작 및 종료 날짜</span>
                    <span className='estimate-info-content'>{formatFullDate(estimate.start_clean_date)} - {formatFullDate(estimate.end_clean_date)}</span>
                </div> */}
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>주소</span>
                    <span className='estimate-info-content'>{estimate.clean_address}</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>상세주소</span>
                    <span className='estimate-info-content'>{estimate.clean_address_detail}</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>연락처</span>
                    <span className='estimate-info-content'>{formatPhone(estimate.user.phone)}</span>
                </div>
            </div>

            {/* 요청 정보 */}
            <div className='estimate-info-container'>
                <div className='estimate-request-title'>
                    <span className='bold large'>요청 정보</span>
                    <span className='bold large'>유효기간: {estimate.request_expiration} 분</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>청소요청 날짜</span>
                    <span className='estimate-info-content'>{formatFullDate(estimate.request_date)}</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>시작 날짜</span>
                    <span className='estimate-info-content'>{formatFullDate(estimate.start_clean_date)}</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>카테고리</span>
                    <span className='estimate-info-content'>{category[estimate.category]}</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>단위</span>
                    <span className='estimate-info-content'>
                        {estimate.unit === 'AREA' ? '평당' : '시간당'}
                    </span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>수량</span>
                    <span className='estimate-info-content'>{estimate.quantity}({estimate.unit === 'AREA' ? '평' : '시간'})</span>
                </div>
                {/* <div className='estimate-info-box'>
                    <span className='estimate-info-title'>선택지3</span>
                    <span className='estimate-info-content'>ㄴㅇㄹ</span>
                </div> */}
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>요청사항</span>
                    <span className='estimate-info-content'>{estimate.requirements}</span>
                </div>

                {/* 요청 사진 */}
                <div className='estimate-image-container'>
                    <div className='estimate-image'>
                        <img />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EstimateContent;