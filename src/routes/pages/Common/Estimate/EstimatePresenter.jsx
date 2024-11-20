import './Estimate.css';
import { MainLayout } from '../../../../components';
import EstimateService from './components/EstimateService/EstimateService';
import EstimateTabs from './components/EstimateTabs/EstimateTabs';
import EstimateContent from './components/EstimateContent/EstimateContent';

const EstimatePresenter = ({
    isLoading,

    // 탭
    tabList,

    // 서비스 설명
    serviceInfos,
    setServiceInfos,

    // 서비스 생성
    handleCreateService,

    // 선택된 견적서
    selectedEstimate,
}) => {

    if (isLoading) return null;

    /* ===== RENDER ===== */
    return (
        <MainLayout
            page={'견적서 요청 관리'}
            tabList={tabList}
            className='overflow'
            isShowHeader={false}
            isRight={true}
            isFull={true}
        >
            {
                selectedEstimate &&
                <div className='estimate-container column'>
                    <EstimateContent
                        estimate={selectedEstimate}
                    />
                    <div className='estimate-container row'>
                        <EstimateTabs

                        />
                        <EstimateService
                            // 서비스 설명
                            serviceInfos={serviceInfos}
                            setServiceInfos={setServiceInfos}

                            // 서비스 생성
                            handleCreateService={handleCreateService}
                        />
                    </div>
                </div>
            }
        </MainLayout>
    );
};

export default EstimatePresenter;