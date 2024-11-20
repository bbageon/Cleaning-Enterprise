import './EmployeeCard.css';
import Profile from '../../../../../assets/profile.png';

const EmployeeCard = ({
    employee,
    onSelectEmployee,
}) => {
    /* ===== VARIABLES ===== */
    const Status = {
        'ABSENCE': '부재',
        'DAY_OFF': '휴가',
        'WAITING_WORK': '업무 대기 중',
        'WORKING': '근무 중',
        'GET_OFF': '퇴근',
    };

    /* ===== RENDER ===== */
    return (
        <div
            className='employee-card-container'
            onClick={() => {onSelectEmployee(employee)}}
        >
            <button
                className='employee-card-select'
            >

            </button>
            <div className='employee-card-profile'>
                <img src={Profile} />
            </div>
            <div className='employee-card-info'>
                <span>{employee.name}</span>
                <span>{employee.email}</span>
                <span>{employee.department}</span>
                <span>{employee.level}</span>
                <span>{Status[employee.status]}</span>
            </div>
        </div>
    );
};

export default EmployeeCard;