import { RadioButton, Textarea } from '../../../../../../components';
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
 * Input
 */
const EstimateServiceInput = ({
    label,
    placeholder,
    value,
    defaultValue,
    id,
    onChange,
}) => {
    return (
        <div className='estimate-service-form'>
            <span className='small'>{label}</span>
            <input
                id={id}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    );
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
    // EstimateServiceInput

    // EstimateDropdown
    selectedCategory,
    setSelectedCategory,

    // RadioButton
    selectedUnit,
    setSelectedUnit,

}) => {

    /* ===== VARIABLES ===== */
    const categories = Object.entries(ServiceCategory);

    /* ===== FUNCTION ===== */
    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue) {
            setSelectedCategory(parseInt(selectedValue, 10));
        } else {
            setSelectedCategory(null);
        }
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
                <EstimateServiceInput
                    label={'서비스 이름'}
                />

                {/* 카테고리 */}
                <EstimateDropdown
                    label={'카테고리'}
                    placeholder={'카테고리를 선택해 주세요.'}

                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}

                    categories={categories}

                    onChange={handleCategoryChange}
                />

                {/* 최소 가격 */}
                <EstimateServiceInput
                    label={'최소 가격'}
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
                        selected={selectedUnit}
                        setSelected={setSelectedUnit}
                        buttonWidth={'30px'}
                        buttonHeight={'30px'}
                    />
                </div>

                {/* 서비스 설명 */}
                <div className='estimate-service-form'>
                    <span className='small'>서비스 설명</span>
                    <Textarea
                        isCheckLength={false}
                        height={'75px'}
                    />
                </div>
            </div>
        </div>
    );
};

export default EstimateService;