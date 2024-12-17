import { Skeleton } from '../../../../../components';
import { useGetCompanies } from '../../../../../hooks/CompanyHooks';
import CompanyDashboardPresenter from './CompanyDashboardPresenter'
import { useState } from 'react';

const CompanyDashboardContainer = () => {

    /* ===== STATE ===== */
    const [keywordCategory, setKeywordCategory] = useState(null);

    /* ===== QUERY ===== */
    const { data: companiesRes, isLoading: companiesLoading, isError: companiesError } = useGetCompanies();
    const companies = companiesRes?.data || [];

    /* ===== RENDER ===== */

    if (companiesLoading) return <Skeleton />;

    return (
        <CompanyDashboardPresenter
            companies={companies}

            setKeywordCategory={setKeywordCategory}
        />
    );
};

export default CompanyDashboardContainer;