import CompanyDashboardPresenter from './CompanyDashboardPresenter'
import { useState } from 'react';

const CompanyDashboardContainer = () => {

    /* ===== STATE ===== */
    const [keywordCategory, setKeywordCategory] = useState(null);

    /* ===== RENDER ===== */
    return (
        <CompanyDashboardPresenter
            setKeywordCategory={setKeywordCategory}
        />
    );
};

export default CompanyDashboardContainer;