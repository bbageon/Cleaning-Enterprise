import Profile from '../../../../../../../assets/profile.png';
import { SearchResultSidebar } from '../../Modal/SearchResultSidebar';
import { RequestList } from '../RequestList/RequestList';
import './ScheduleSidebar.css';

export const ScheduleSidebar = ({
    requestList,
    isSearchResult,
    assignedEmployees,
    nonAssignedEmployees,

    isSelectRequest,
    selectedRequest,


    handleUnAssignEmployee,
    handleAssignEmployee,
    handleAssign,
    handleCancelAssign,

    showAssignmentEmployee,
    setShowAssignmentEmployee,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className="schedule-sidebar sidebar">
            <div className="profile">
                <img src='https://cleaning-image.s3.ap-northeast-2.amazonaws.com/default_profile.jpeg' alt="프로필 이미지" className='profile-image' />
                <div className="user-profile-info">
                    <div className="name">백승우 님</div>
                    <div className="english-name">Baek seungwoo</div>
                </div>
            </div>
            {
                isSearchResult ?
                    <SearchResultSidebar
                        assignedEmployees={assignedEmployees}
                        nonAssignedEmployees={nonAssignedEmployees}

                        isSelectRequest={isSelectRequest}
                        selectedRequest={selectedRequest}

                        handleUnAssignEmployee={handleUnAssignEmployee}
                        handleAssignEmployee={handleAssignEmployee}
                        handleAssign={handleAssign}
                        handleCancelAssign={handleCancelAssign}

                        showAssignmentEmployee={showAssignmentEmployee}
                        setShowAssignmentEmployee={setShowAssignmentEmployee}
                    /> :
                    <RequestList
                        requestList={requestList}
                    />
            }
        </div>
    )
}