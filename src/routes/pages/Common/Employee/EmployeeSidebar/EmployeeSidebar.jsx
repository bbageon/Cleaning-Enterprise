import './EmployeeSidebar.css';
import Profile from '../../../../../assets/profile.png';

/**
 * 업무 담당자 정보
 * --
 */
const EmployeeInfo = ({

}) => {
    return (
        <div className='task-container'>
            <span className='title'>업무 담당자 정보</span>
            <div className='task-profile'>
                <img src={Profile} alt='프로필 이미지' className='profile-image' />
                <div className='employee-info'>
                    <span>김건우</span>
                    <span>청소팀/직원</span>
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

}) => {
    return (
        <div className='task-container summary'>
            <div className='task-summary bluebar'>
                <span>총 수행 업무</span>
                <span>186</span>
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

}) => {

    /* ===== RENDER ===== */
    return (
        <div className="employee-sidebar">
            <div className="profile">
                <img src={Profile} alt="프로필 이미지" className='profile-image' />
                <div className="user-profile-info">
                    <div className="name">김건우 님</div>
                    <div className="english-name">Kim Guenwoo</div>
                </div>
            </div>
            <EmployeeInfo

            />
            <TaskSummary

            />
            <TaskProgress

            />
            <TaskComplete

            />
        </div>
    );
};

export default EmployeeSidebar;