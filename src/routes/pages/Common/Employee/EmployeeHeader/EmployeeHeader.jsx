import './EmployeeHeader.css';
import { Dropdown } from '../../../../../components';

const EmployeeHeader = ({
    employees,
    company,

    selectedDepartment,
    setSelectedDepartment,

    selectedLevel,
    setSelectedLevel,

    // 소속 옵션
    departmentOptions,

    // 직급 옵션
    levelOptions,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='employee-header-container'>
            <span className='top'>직원관리</span>
            <div className='bottom'>
                <span className='bold'>{company.company_name}({employees?.length})</span>
                <div className='employee-header-dropdown'>
                    <Dropdown
                        placeholder={'소속을 선택해 주세요.'}
                        selected={selectedDepartment}
                        setSelected={setSelectedDepartment}
                        options={departmentOptions}
                    />
                    <Dropdown
                        placeholder={'직급을 선택해 주세요.'}
                        selected={selectedLevel}
                        setSelected={setSelectedLevel}
                        options={levelOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeHeader;