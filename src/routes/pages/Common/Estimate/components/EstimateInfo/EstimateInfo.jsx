import './EstimateInfo.css';

const EstimateInfo = ({

}) => {
    /* ===== VARIABLES ===== */
    const dummyImage = [
        {
            image: 'asdf',
        },
        {
            image: 'asd',
        },
        {
            image: 'as',
        },
        {
            image: 'a',
        },
    ];

    /* ===== STATE ===== */


    /* ===== RENDER ===== */
    return (
        <div className='estimate-item-container'>

            {/* 고객 정보 */}
            <div className='estimate-info'>
                <span className='bold large'>고객 정보</span>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>이름</span>
                    <span className='estimate-info-content'>김건우</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>청소요청 날짜</span>
                    <span className='estimate-info-content'>2024-11-04 21:59</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>시작 및 종료 날짜</span>
                    <span className='estimate-info-content'>2024-11-05 16:00 - 2024-11-05 18:00</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>주소</span>
                    <span className='estimate-info-content'>경상남도 양산시 물금읍 범구로 14</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>상세주소</span>
                    <span className='estimate-info-content'>101동 1302호</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>연락처</span>
                    <span className='estimate-info-content'>010-6558-4405</span>
                </div>
            </div>

            {/* 요청 정보 */}
            <div className='estimate-info'>
                <div className='estimate-request-title'>
                    <span className='bold large'>요청 정보</span>
                    <span className='bold large'>유효기간: 3시간</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>시작 및 종료 날짜</span>
                    <span className='estimate-info-content'>2024-11-05 16:00 - 2024-11-05 18:00</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>카테고리</span>
                    <span className='estimate-info-content'>주거청소</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>선택지1</span>
                    <span className='estimate-info-content'>ㅂㅈㄷ</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>선택지2</span>
                    <span className='estimate-info-content'>ㅁㄴㅇ</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>선택지3</span>
                    <span className='estimate-info-content'>ㄴㅇㄹ</span>
                </div>
                <div className='estimate-info-box'>
                    <span className='estimate-info-title'>요청사항</span>
                    <span className='estimate-info-content'>집에 조금 냄새도 나고 찌든 때가 있어서 청소를 요청하려고 합니다... 구석구석 잘 닦아주시면 감사하겠습니다.</span>
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

export default EstimateInfo;