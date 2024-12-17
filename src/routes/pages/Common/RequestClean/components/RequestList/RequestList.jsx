import './RequestList.css';
import RequestCard from '../RequestCard/RequestCard';

const RequestList = ({
    activeCardId,

    beforeAccept,

    handleOpenImageModal,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='request-list-container'>
            <div className='request-list-wrap'>
                {
                    beforeAccept.map((request) => (
                        <RequestCard
                            key={request.request_clean_id}
                            isActive={request.request_clean_id === activeCardId}
                            request={request}
                            handleOpenImageModal={handleOpenImageModal}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default RequestList;