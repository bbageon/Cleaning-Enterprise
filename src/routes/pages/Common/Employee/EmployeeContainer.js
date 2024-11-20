import { useEffect, useState } from "react";
import { useGetCompanyEmployee } from "../../../../hooks/EmployeeHooks";
import EmployeePresenter from "./EmployeePresenter";

const EmployeeContainer = () => {
    /* ===== STATE ===== */
    const [employees, setEmployees] = useState([]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    /* ===== VARIABLES ===== */

    /* ===== QUERY ===== */
    const { data: employeesDataRes, isLoading: employeesDataLoading, isError: employeesDataError } = useGetCompanyEmployee(1);
    const employeeData = employeesDataRes?.data.employees || [];

    const isLoading = employeesDataLoading;

    /* ===== MUTATE ===== */

    /* ===== EFFECT ===== */

    /* ===== FUNCTION ===== */
    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(employee);
    };

    console.log(selectedEmployee);

    /* ===== RENDER ===== */
    return (
        <EmployeePresenter
            isLoading={isLoading}

            // 직원
            employees={employeeData}

            // 직원 선택 핸들러
            onSelectEmployee={handleSelectEmployee}

            // 선택된 직원
            selectedEmployee={selectedEmployee}
        />
    )
}

export default EmployeeContainer;