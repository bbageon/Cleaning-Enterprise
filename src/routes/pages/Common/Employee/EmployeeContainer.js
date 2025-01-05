import { useEffect, useState } from "react";
import { useGetCompanyEmployee } from "../../../../hooks/EmployeeHooks";
import EmployeePresenter from "./EmployeePresenter";
import { useGetCompany } from '../../../../hooks/CompanyHooks';

const EmployeeContainer = () => {
    /* ===== STATE ===== */
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [filteredEmployees, setFilteredEmployees] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const [departmentOptions, setDepartmentOptions] = useState(null);
    const [levelOptions, setLevelOptions] = useState(null);

    /* ===== VARIABLES ===== */

    /* ===== QUERY ===== */

    const { data: companyDataRes, isLoading: companyLoading, isError: companyError } = useGetCompany(1);
    const companyData = companyDataRes?.data || [];

    const { data: employeesDataRes, isLoading: employeesDataLoading, isError: employeesDataError } = useGetCompanyEmployee(1);
    const employeeData = employeesDataRes?.data.employees || [];

    const isLoading = employeesDataLoading;

    /* ===== MUTATE ===== */

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (employeeData.length && !isLoading) {
            const departments = employeeData
                .map(employee => employee.department)
                .filter(Boolean); // 빈 값 제거

            const uniqueDepartments = [... new Set(departments)];
            setDepartmentOptions(['전체', ...uniqueDepartments]);

            const levels = employeeData
                .map(employee => employee.level)
                .filter(Boolean);

            const uniqueLevels = [... new Set(levels)];
            setLevelOptions(['전체', ...uniqueLevels]);
        }
    }, [isLoading, employeeData]);

    useEffect(() => {
        const filteredEmployee = employeeData.map(employee => employee.department === selectedDepartment);
        setFilteredEmployees(filteredEmployee);
    }, [setSelectedDepartment, setSelectedLevel]);

    useEffect(() => {
        
        const filtered = employeeData.filter(employee => {
            const matchesDepartment = selectedEmployee === '전체' || employee.department === selectedDepartment;
            const matchesLevel = selectedLevel === '전체' || employee.level === selectedLevel;
            return matchesDepartment && matchesLevel;
        });
        setFilteredEmployees(filtered);
    }, [selectedDepartment, selectedLevel, employeeData]);

    /* ===== FUNCTION ===== */
    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(employee);
    };

    /* ===== RENDER ===== */
    return (
        <EmployeePresenter
            isLoading={isLoading}

            // 직원
            employees={!selectedDepartment && !selectedDepartment ? employeeData : filteredEmployees}

            // 업체
            company={companyData}

            // 직원 선택 핸들러
            onSelectEmployee={handleSelectEmployee}

            // 선택된 직원
            selectedEmployee={selectedEmployee}

            // 소속 옵션
            departmentOptions={departmentOptions}

            // 직급 옵션
            levelOptions={levelOptions}

            // 소속 선택
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}

            // 직급 선택
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
        />
    )
}

export default EmployeeContainer;