import EmployeeCard from '../EmployeeCard';
import './EmployeeList.css';

const EmployeeList = ({
    employees,
    onSelectEmployee,
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
                    />
                ))
            }
        </div>
    );
};

export default EmployeeList;