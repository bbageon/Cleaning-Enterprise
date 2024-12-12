import { useState } from 'react';
import UserDashboardPresenter from './UserDashboardPresenter'

const UserDashboardContainer = () => {
    /* ===== STATE ===== */
    const [keywordCategory, setKeywordCategory] = useState(null);
    console.log(keywordCategory);

    /* ===== FUNCTION ===== */

    /* ===== RENDER ===== */
    return (
        <UserDashboardPresenter

            // 검색어
            setKeywordCategory={setKeywordCategory}
        />
    );
};

export default UserDashboardContainer;