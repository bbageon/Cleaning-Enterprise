import { useState } from 'react';
import UserDashboardPresenter from './UserDashboardPresenter'
import { useGetUsers } from '../../../../../hooks/UserHooks';
import { Skeleton } from '../../../../../components';

const UserDashboardContainer = () => {
    /* ===== STATE ===== */
    const [keywordCategory, setKeywordCategory] = useState(null);

    /* ===== QUERY ===== */
    const { data: usersRes, isLoading: usersLoading, isError: usersError } = useGetUsers();
    const users = usersRes?.data || [];

    const isLoading = usersLoading;

    /* ===== FUNCTION ===== */

    /* ===== RENDER ===== */

    if (isLoading) return <Skeleton />

    return (
        <UserDashboardPresenter
            users={users}

            setKeywordCategory={setKeywordCategory}
        />
    );
};

export default UserDashboardContainer;