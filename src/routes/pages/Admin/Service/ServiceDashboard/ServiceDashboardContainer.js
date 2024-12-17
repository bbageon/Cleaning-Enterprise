import { useGetServices } from '../../../../../hooks/ServiceHooks';
import ServiceDashboardPresenter from './ServiceDashboardPresenter'

const ServiceDashboardContainer = () => {

    /* ===== QUERY ===== */
    const { data: servicesRes, isLoading: servicesLoading, isError: servicesError } = useGetServices();
    const services = servicesRes?.data || [];
    console.log(services);

    /* ===== RENDER ===== */
    return (
        <ServiceDashboardPresenter
            services={services}

        />
    );
};

export default ServiceDashboardContainer;