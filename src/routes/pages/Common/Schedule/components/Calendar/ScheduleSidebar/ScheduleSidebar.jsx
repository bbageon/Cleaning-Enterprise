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

    return (
        <div className="schedule-sidebar sidebar">
            <div className="profile">
                <img src={Profile} alt="프로필 이미지" className='profile-image' />
                <div className="user-profile-info">
                    <div className="name">김건우 님</div>
                    <div className="english-name">Kim Guenwoo</div>
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