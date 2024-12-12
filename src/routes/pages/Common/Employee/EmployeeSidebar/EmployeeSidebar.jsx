import './EmployeeSidebar.css';
import Profile from '../../../../../assets/profile.png';

/**
 * 업무 담당자 정보
 * --
 */
const EmployeeInfo = ({
    selectedEmployee,
}) => {
    return (
        <div className='task-container'>
            <span className='title'>업무 담당자 정보</span>
            <div className='task-profile'>
                <img src={Profile} alt='프로필 이미지' className='profile-image' />
                <div className='employee-info'>
                    <span>{selectedEmployee.name}</span>
                    <span>{selectedEmployee.department}/{selectedEmployee.level}</span>
                </div>
            </div>
        </div>
    );
};

/**
 * 직원 업무 요약
 * --
 */
const TaskSummary = ({
    selectedEmployee,
}) => {
    return (
        <div className='task-container summary'>
            <div className='task-summary bluebar'>
                <span>총 수행 업무</span>
                <span>{selectedEmployee.total_tasks}</span>
            </div>
            <div className='task-summary yellowbar'>
                <span>진행 업무</span>
                <span>186</span>
            </div>
            <div className='task-summary greenbar'>
                <span>완료 업무</span>
                <span>186</span>
            </div>
        </div>
    );
};

/**
 * 진행 업무
 * --
 */
const TaskProgress = ({
    selectedEmployee,
}) => {
    return (
        <div className='task-container'>
            <span className='title'>진행 업무</span>
            <div className='task-wrap'>
                <div className='task-box'>
                    <span className='task-date'>11월 6일 (수)</span>
                    <div className='task-status'>
                        <span>화장실 청소 외 3건</span>
                        <span className='working'>청소 중</span>
                    </div>
                    <span className='task-date'>16:49 - 18:30</span>
                </div>
                <div className='task-box'>
                    <span className='task-date'>11월 6일 (수)</span>
                    <div className='task-status'>
                        <span>화장실 청소 외 3건</span>
                        <span className='working'>청소 중</span>
                    </div>
                    <span className='task-date'>16:49 - 18:30</span>
                </div>
            </div>
        </div>
    );
};

/**
 * 완료 업무
 * --
 */
const TaskComplete = ({

}) => {
    return (
        <div className='task-container'>
            <span className='title'>완료 업무</span>
            <div className='task-wrap'>
                <div className='task-box'>
                    <span className='task-date'>11월 6일 (수)</span>
                    <div className='task-status'>
                        <span>화장실 청소 외 3건</span>
                        <span className='done'>청소 완료</span>
                    </div>
                    <span className='task-date'>16:49 - 18:30</span>
                </div>
                <div className='task-box'>
                    <span className='task-date'>11월 6일 (수)</span>
                    <div className='task-status'>
                        <span>화장실 청소 외 3건</span>
                        <span className='done'>청소 완료</span>
                    </div>
                    <span className='task-date'>16:49 - 18:30</span>
                </div>
            </div>
        </div>
    );
};

// EmployeeSidebar
const EmployeeSidebar = ({
    selectedEmployee,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className="employee-sidebar sidebar">
            <div className="profile">
                <img src={Profile} alt="프로필 이미지" className='profile-image' />
                <div className="user-profile-info">
                    <div className="name">김건우 님</div>
                    <div className="english-name">Kim Guenwoo</div>
                </div>
            </div>
            {
                selectedEmployee &&
                <>
                    <EmployeeInfo
                        selectedEmployee={selectedEmployee}
                    />
                    <TaskSummary
                        selectedEmployee={selectedEmployee}
                    />
                    <TaskProgress
                        selectedEmployee={selectedEmployee}
                    />
                    <TaskComplete
                        selectedEmployee={selectedEmployee}
                    />
                </>
            }
        </div>
    );
};

export default EmployeeSidebar;