import './EmployeeHeader.css';

/**
 * EmployeeHeader Input
 * --
 */
const EmployHeaderInput = () => {
    return (
        <>
        
        </>
    );
};


const EmployeeHeader = ({
    employees,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='employee-header-container'>
            <span className='employee-header-title'>직원관리</span>
            <span
                className='bold'
                style={{
                    paddingTop: '1rem'
                }}
            >김재모의 카피바라({employees?.length})</span>
            <div className='employee-header-dropdown'>

            </div>
        </div>
    );
};

export default EmployeeHeader;