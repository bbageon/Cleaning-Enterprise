import { useGetRequestCleans } from '../../../../../hooks/RequestCleanHooks';
import { useGetReviews } from '../../../../../hooks/ReviewHooks';
import ReviewDashboardPresenter from './ReviewDashboardPresenter'

const ReviewDashboardContainer = () => {

    /* ===== QUERY ===== */
    const { data: reviewsRes, isLoading: reviewsLoading, isError: reviewsError } = useGetReviews();
    const reviews = reviewsRes?.data || [];
    console.log(reviews);

    const { data: requestCleansRes, isLoading: requestCleansLoading, isError: requestCleansError } = useGetRequestCleans();
    const requestCleans = requestCleansRes?.data || [];

    /* ===== RENDER ===== */
    return (
        <ReviewDashboardPresenter
            reviews={reviews}
            requestCleans={requestCleans}
        />
    );
};

export default ReviewDashboardContainer;