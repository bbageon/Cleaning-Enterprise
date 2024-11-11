import './RequestList.css';
import RequestCard from '../RequestCard/RequestCard';
import { MainContent } from '../../../../../../components';

const RequestList = ({
    activeCardId,

    beforeAccept,

    setBeforeAccept,
    setCleaning,
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

                            setBeforeAccept={setBeforeAccept}
                            setCleaning={setCleaning}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default RequestList;