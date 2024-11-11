import './Estimate.css';
import { MainLayout } from '../../../../components';
import EstimateInfo from './components/EstimateInfo/EstimateInfo';
import EstimateService from './components/EstimateService/EstimateService';
import EstimateTabs from './components/EstimateTabs/EstimateTabs';

const EstimatePresenter = ({
    // EstimateService - EstimateDropdown
    selectedCategory,
    setSelectedCategory,

    // EstimateService - RadioButton
    selectedUnit,
    setSelectedUnit,
}) => {
    return (
        <MainLayout
            page={'견적서 요청 관리'}
            className='overflow'
            isShowHeader={false}
            isRight={true}
            isFull={true}
        >
            <div className='estimate-container column'>
                <EstimateInfo

                />
                <div className='estimate-container row'>
                    <EstimateTabs

                    />
                    <EstimateService
                        // EstimateService - EstimateDropdown
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}

                        // EstimateService - RadioButton
                        selectedUnit={selectedUnit}
                        setSelectedUnit={setSelectedUnit}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default EstimatePresenter;