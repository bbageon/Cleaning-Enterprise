import { RadioButton, Textarea } from '../../../../../../components';
import EstimateInput from '../EstimateInput/EstimateInput';
import './EstimateService.css';

/**
 * 서비스 구분 카테고리
 */
const ServiceCategory = {
    '이사/입주청소': 1,
    '거주/생활청소': 2,
    '가전/가구청소': 3,
    '전문/특수청소': 4,
    '사업장청소': 5,
    '건물관리': 6,
};

/**
 * Dropdown (카테고리)
 */
const EstimateDropdown = ({
    categories,
    selectedCategory,

    label,
    placeholder,
    onChange,
}) => {
    return (
        <div className='estimate-service-form'>
            <span className='small'>{label}</span>
            <select
                value={selectedCategory}
                onChange={onChange}
            >
                <option
                    value={""}
                    disabled={true}
                    hidden={true}
                >{placeholder}</option>
                {
                    categories.map(([key, value]) => (
                        <option key={value} value={value}>
                            {key}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

const EstimateService = ({
    // 서비스 설명
    serviceInfos,
    setServiceInfos,

    // 서비스 생성
    handleCreateEstimateService,
}) => {

    /* ===== VARIABLES ===== */
    const categories = Object.entries(ServiceCategory);

    /* ===== FUNCTION ===== */
    // Input 핸들러
    const handleInputChange = (field) => (e) => {
        const value = field === 'servicePrice' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value;
        setServiceInfos((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Dropdown 핸들러
    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;

        setServiceInfos((prev) => ({
            ...prev,
            serviceCategory: selectedValue ? parseInt(selectedValue, 10) : '',
        }));
    };

    /* ===== RENDER ===== */
    return (
        <div className='estimate-item-container'>
            {/* 타이틀 */}
            <span
                className='bold large'
                style={{ width: '100%', paddingBottom: '1rem' }}
            >서비스 추가</span>

            {/* 폼 */}
            <div className='estimate-service-form-container'>
                {/* 서비스 이름 */}
                <EstimateInput
                    label={'서비스 이름'}
                    placeholder={'서비스 이름을 작성해 주세요.'}
                    setValue={handleInputChange('serviceName')}
                />

                {/* 카테고리 */}
                <EstimateDropdown
                    label={'카테고리'}
                    placeholder={'카테고리를 선택해 주세요.'}

                    selectedCategory={serviceInfos.serviceCategory}
                    onChange={handleCategoryChange}

                    categories={categories}
                />

                {/* 최소 가격 */}
                <EstimateInput
                    label={'최소 가격'}
                    placeholder={'숫자만 입력해 주세요.'}
                    type={'number'}
                    setValue={handleInputChange('servicePrice')}
                />
                <div className='estimate-service-radio-button'>
                    <RadioButton
                        options={
                            [
                                {
                                    id: 'AREA',
                                    name: '평당'
                                },
                                {
                                    id: 'TIME',
                                    name: '시간당'
                                }
                            ]
                        }
                        selected={serviceInfos.serviceUnit}
                        setSelected={(selected) =>
                            setServiceInfos((prev) => ({
                                ...prev,
                                serviceUnit: selected,
                            }))
                        }
                        buttonWidth={'30px'}
                        buttonHeight={'30px'}
                    />
                </div>

                {/* 서비스 설명 */}
                <div className='estimate-service-form'>
                    <span className='small'>서비스 설명</span>
                    <Textarea
                        onChange={handleInputChange('serviceInfo')}
                        value={serviceInfos.serviceInfo}
                        maxLength={500}
                        fontSize={'0.9rem'}
                        height={'100px'}
                    />
                </div>

                {/* 서비스 버튼 */}
                <div className='estimate-service-button'>
                    <button
                        style={{
                            backgroundColor: '#1E90FF'
                        }}
                        onClick={handleCreateEstimateService}
                    >
                        서비스 추가
                    </button>
                    {/* <button
                        style={{
                            backgroundColor: '#87CEEB'
                        }}
                    >
                        서비스 불러오기
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default EstimateService;