import { useState } from "react";
import EstimatePresenter from "./EstimatePresenter";

const EstimateContainer = () => {

    /* ===== VARIABLES ===== */
    /* ===== STATE ===== */
    // 카테고리 선택
    const [selectedCategory, setSelectedCategory] = useState('');
    console.log('selectedCategory: ', selectedCategory);

    // 서비스 유형 선택
    const [selectedUnit, setSelectedUnit] = useState('AREA');
    console.log('selectedUnit: ', selectedUnit)
    

    /* ===== STORE ===== */
    /* ===== QUERY ===== */
    

    /* ===== EFFECT ===== */

    /* ===== RENDER ===== */
    return (
        <EstimatePresenter
            // EstimateService - EstimateDropdown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}

            // EstimateService - RadioButton
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
        
        />
    );
};

export default EstimateContainer;