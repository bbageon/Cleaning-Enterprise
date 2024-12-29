import EmployeeCard from '../EmployeeCard';
import './EmployeeList.css';

const EmployeeList = ({
    employees,
    company,
    onSelectEmployee,
    selectedEmployee,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='employee-list-container'>
            {
                employees?.map((employee, index) => (
                    <EmployeeCard
                        key={index}
                        employee={employee}
                        onSelectEmployee={onSelectEmployee}
                        isSelected={selectedEmployee?.id === employee.id}
                    />
                ))
            }
        </div>
    );
};

export default EmployeeList;