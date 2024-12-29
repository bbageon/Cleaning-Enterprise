import { MainLayout } from '../../../../components';
import './Employee.css';
import EmployeeHeader from './EmployeeHeader';
import EmployeeList from './EmployeeList';
import EmployeeSidebar from './EmployeeSidebar';

const EmployeePresenter = ({
    isLoading,

    // 직원
    employees,

    // 회사
    company,

    // 직원 선택 핸들러
    onSelectEmployee,

    // 선택된 직원
    selectedEmployee,

    // 소속 선택
    selectedDepartment,
    setSelectedDepartment,

    // 직급 선택
    selectedLevel,
    setSelectedLevel,
}) => {

    // if (isLoading) return <div></div>;

    /* ===== RENDER ===== */
    return (
        <MainLayout
            page={'직원 관리'}
            isShowHeader={false}
            isRight={true}
            isFull={true}
            CustomSidebar={
                <EmployeeSidebar
                    selectedEmployee={selectedEmployee}
                    company={company}
                />
            }
            articleStyle={{
                width: 'calc(100% - 15% - 15%)',
            }}
            articleWrapStyle={{
                paddingTop: '0',
                backgroundColor: '#E5E5E5'
            }}
        >
            <EmployeeHeader
                employees={employees}
                company={company}

                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}

                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}

            />
            <EmployeeList
                employees={employees}
                company={company}
                onSelectEmployee={onSelectEmployee}
                selectedEmployee={selectedEmployee}
            />
        </MainLayout>
    )
}

export default EmployeePresenter;