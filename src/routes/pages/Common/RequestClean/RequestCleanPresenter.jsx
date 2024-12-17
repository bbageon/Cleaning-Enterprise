import './RequestClean.css';
import { ImageModal, MainLayout } from '../../../../components';
import RequestList from './components/RequestList/RequestList';

const RequestCleanPresenter = ({
    tabList,

    beforeAccept,

    setBeforeAccept,
    setCleaning,

    activeCardId,

    isModalOpen,
    selectedImage,
    handleOpenImageModal,
    handleCloseImageModal,

}) => {

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

                handleOpenImageModal={handleOpenImageModal}
            />
            <ImageModal
                isOpen={isModalOpen}
                onClose={handleCloseImageModal}
                imageUrl={selectedImage}
            />
        </MainLayout>
    );
};

export default RequestCleanPresenter;