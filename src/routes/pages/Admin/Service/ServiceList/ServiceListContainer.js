import ServiceListPresenter from './ServiceListPresenter'
import { useState } from 'react';

const ServiceListContainer = () => {

    /* ===== STATE ===== */
    const [checkCategory, setCheckCategory] = useState(null);

    /* ===== RENDER ===== */
    return (
        <ServiceListPresenter

            // 서비스 카테고리
            setCheckCategory={setCheckCategory}
        />
    );
};

export default ServiceListContainer;