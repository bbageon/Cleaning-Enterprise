import './RequestClean.css';
import { MainLayout } from '../../../../components';
import RequestList from './components/RequestList/RequestList';

const RequestCleanPresenter = ({
    isLoading,
    // 탭
    tabList,

    beforeAccept,

    setBeforeAccept,
    setCleaning,

    activeCardId,

}) => {

    /* ===== FUNCTION ===== */
    if (isLoading) {
        return null;
    }

    /* ===== RENDER ===== */
    return (
        <MainLayout
            page={'청소 요청 목록'}
            tabList={tabList}
            className='overflow'
            isShowHeader={false}
            isRight={true}
            isFull={true}
        >
            <RequestList
                activeCardId={activeCardId}

                beforeAccept={beforeAccept}
                
                setBeforeAccept={setBeforeAccept}
                setCleaning={setCleaning}
            />
        </MainLayout>
    );
};

export default RequestCleanPresenter;