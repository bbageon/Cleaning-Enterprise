import './MainHeader.css';
import { SearchIcon } from '../../../assets/icons';
import Profile from '../../../assets/profile.png';

const MainHeader = () => {
    return (
        <header className="header-container">
            <div className="header-title title">
                요청 목록
            </div>
            <ul className='header-nav'>
                <li className='search'>
                    <SearchIcon />
                    <span>search</span>
                </li>
                <li>any texts</li>
                <li>any texts</li>
                <li>any texts</li>
                <li className="profile-image">
                    <img src={Profile} alt="" />
                </li>
                <li className="profile-info">
                    <span className='name'>김건우님</span>
                    <span className='name-engilsh'>Kim Guenwoo</span>
                </li>
            </ul>
        </header>
    )
}

export default MainHeader;