import {
    ChatRoomIcon,
    DashBoardIcon,
    EmplayeeManageIcon,
    EstimateIcon,
    ListIcon,
    ProfileIcon,
    RecentIcon,
    ReviewIcon,
    ScheduleManageIcon,
    LogOutIcon,
} from '../../../assets/icons';

import './MainNav.css';

const MainNav = () => {
    return (
        <nav className="nav-container">
            <div className="nav-header title">
                AVAVAV
            </div>
            <ul className="main-nav">
                <li>
                    <DashBoardIcon />
                    메인 화면
                </li>
                <li>
                    <ChatRoomIcon />
                    대화방 관리
                </li>
                <li>
                    <ReviewIcon />
                    리뷰 관리 및 청소 내역
                </li>
                <li>
                    <ScheduleManageIcon />
                    일정 관리
                </li>
                <li>
                    <EmplayeeManageIcon />
                    직원 관리
                </li>
                <li className='divide'>
                    <ListIcon />
                    업체 정보 관리
                </li>
                <li>
                    <EstimateIcon />
                    견적서 요청 관리
                </li>
                <li>
                    <ListIcon />
                    청소 요청 목록
                </li>
            </ul>
            <div className="nav-footer">
                <LogOutIcon />
                LogOut
            </div>
        </nav>
    )
}

export default MainNav;