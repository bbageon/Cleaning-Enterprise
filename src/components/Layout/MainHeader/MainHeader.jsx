import './MainHeader.css';
import { SearchIcon } from '../../../assets/icons';
import Profile from '../../../assets/profile.png';

const MainHeader = ({
    title,
    className = '',
}) => {
    return (
        <header className="header-container">
            <div className="header-title title">
                {title}
            </div>
            <ul className='header-nav'>
                <li className='search'>
                    <SearchIcon />
                    <span className={className}>search</span>
                </li>
                <li className={className}>any texts</li>
                <li className={className}>any texts</li>
                <li className={className}>any texts</li>
                <li className="profile-image">
                    <img src={Profile} alt="" />
                </li>
                <li className="profile-info">
                    <span className='name'>김건우님</span>
                    <span className={`name-english ${className}`}>Kim Guenwoo</span>
                </li>
            </ul>
        </header>
    )
}

export default MainHeader;