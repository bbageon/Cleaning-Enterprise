import Profile from '../../../../../../../assets/profile.png';
import { SearchResultSidebar } from '../../Modal/SearchResultSidebar';
import { RequestList } from '../RequestList/RequestList';
import './ScheduleSidebar.css';

export const ScheduleSidebar = ({
    requestList,
    isSearchResult,
}) => {

    return (
        <div className="schedule-sidebar">
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
                    /> :
                    <RequestList
                        requestList={requestList}
                    />
            }
        </div>
    )
}