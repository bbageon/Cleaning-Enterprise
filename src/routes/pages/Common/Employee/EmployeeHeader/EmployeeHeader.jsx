import './EmployeeHeader.css';
import { Dropdown } from '../../../../../components';

const EmployeeHeader = ({
    employees,

    selectedDepartment,
    setSelectedDepartment,

    selectedLevel,
    setSelectedLevel,
}) => {
    /* ===== VARIABLES ===== */
    const departmentOptions =['없음', '소속1', '소속2', '소속3', '소속4', '소속5'];
    const levelOptions = ['없음', '직급1', '직급2', '직급3', '직급4', '직급5'];

    /* ===== RENDER ===== */
    return (
        <div className='employee-header-container'>
            <span className='top'>직원관리</span>
            <div className='bottom'>
                <span className='bold'>김재모의 카피바라({employees?.length})</span>
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