import { useUpdateRequestClean } from '../../../../../../hooks/RequestCleanHooks';
import { useGetEachRequestCleanImage } from '../../../../../../hooks/RequestCleanImageHooks';
import { formatFullDate } from '../../../../../../utils/dateUtils';
import './RequestCard.css';

const RequestCard = ({
    isActive,

    request,

    setBeforeAccept,
    setCleaning,

    handleOpenImageModal,

}) => {

    /* ===== QUERY ===== */
    const { data: requestImagesRes, isLoading: requestImagesLoading, isError: requestImagesError } = useGetEachRequestCleanImage(request.request_clean_id);
    const requestImages = requestImagesRes?.data || [];

    /* ===== MUTATE ===== */
    const { mutate: updateRequest } = useUpdateRequestClean(
        (data) => {

        },
        (error) => {

        },
    );

    /* ===== FUNCTION ===== */
    const handleAcceptRequest = () => {
        setBeforeAccept((prev) => prev.filter((item) => item.request_clean_id !== request.request_clean_id));
        setCleaning((prev) => [...prev, request]);

        updateRequest({
            request_clean_id: request.request_clean_id,
            body: {
                request_status: 'CLEANING',
            }
        }, {
            onError: () => {
                setCleaning((prev) => prev.filter((item) => item.request_clean_id !== request.request_clean_id));
                setBeforeAccept((prev) => [...prev, request]);
            }
        });
    };

    const handleRefuseRequest = () => {
        setBeforeAccept((prev) => prev.filter((item) => item.request_clean_id !== request.request_clean_id));

        updateRequest({
            request_clean_id: request.request_clean_id,
            body: {
                request_status: 'CANCELED',
            }
        }, {
            onError: () => {
                setBeforeAccept((prev) => [...prev, request]);
            }
        });
    };


    /* ===== RENDER ===== */
    return (
        <div
            className={`request-clean-card-container ${isActive ? 'active' : ''}`}
            data-id={request.request_clean_id}
        >

            {/* 요청자, 요청번호, 날짜 */}
            <div className='request-clean-title-container'>
                <div className='request-clean-title-info'>
                    <span className='bold'>{request.user.name}</span>
                    <span className='gray1'>요청번호 {request.request_clean_id}</span>
                </div>
                <div>
                    <span className='bold'>{formatFullDate(request?.request_date)}</span>
                </div>
            </div>

            <div className='request-card-container'>
                <div className='request-card-wrap'>
                    <div className='request-card-info-wrap'>

                        {/* 상세 내역 정보 */}
                        <div className='request-card-info-box'>
                            <div className='request-card-info'>
                                <span className='bold'>청소 시작 날짜</span>
                                <span>{formatFullDate(request?.start_clean_date)}</span>
                            </div>
                            <div className='request-card-info'>
                                <span className='bold'>서비스 이름</span>
                                <div className='request-card-service-info'>
                                    {
                                        request.services.map((service, index) => (
                                            <span key={index} >{service.service_name}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='request-card-info'>
                                <span className='bold'>주소</span>
                                <span>{request.clean_address}</span>
                            </div>
                            <div className='request-card-info'>
                                <span className='bold'>상세 주소</span>
                                <span>{request.clean_address_detail}</span>
                            </div>
                            <div className='request-card-info'>
                                <span className='bold'>요구사항</span>
                                {
                                    request.requirements ? (
                                        <span>{request.requirements}</span>
                                    ) : (
                                        <span>추가 요구사항이 없습니다.</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className='request-card-img-container'>
                        <div className='request-card-img-wrap'>
                            {requestImages.map((image, index) => (
                                <div className='request-card-img'>
                                    <img
                                        key={index}
                                        src={image.request_clean_image}
                                        alt='Request Clean Images'
                                        onClick={() => handleOpenImageModal(image.request_clean_image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* 요청 목록 버튼 */}
                <div className='request-card-button-wrap'>
                    <button
                        className='large bold'
                        onClick={handleAcceptRequest}
                    >
                        수락
                    </button>
                    <button
                        className='large bold'
                        onClick={handleRefuseRequest}
                    >
                        거절
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;