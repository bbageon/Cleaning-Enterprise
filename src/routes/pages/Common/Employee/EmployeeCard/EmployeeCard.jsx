import './EmployeeCard.css';

const EmployeeCard = ({
    employee,
    onSelectEmployee,
    isSelected,
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
            className={`employee-card-container ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectEmployee(employee)}
        >
            <button
                className={`employee-card-select ${isSelected ? 'selected' : ''}`}
            />
            <div className='employee-card-profile'>
                <img src={employee.image.length === 0 ? employee.image : 'https://cleaning-image.s3.ap-northeast-2.amazonaws.com/default_profile.jpeg'} alt='profile image' />
            </div>
            <div className='employee-card-info'>
                <span style={{ fontSize: '1rem'}}>{employee.name}</span>
                <span>{employee.email}</span>
                <span>{employee.department}</span>
                <span>{employee.level}</span>
                <span>{Status[employee.status]}</span>
            </div>
        </div>
    );
};

export default EmployeeCard;