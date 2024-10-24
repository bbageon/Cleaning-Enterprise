import './MainHeader.css'

const MainHeader = () => {
    return (
        <header className="header-container">
            <div className="header-title title">
                요청 목록
            </div>
            <ul className='header-nav'>
                <li>search</li>
                <li>any texts</li>
                <li>any texts</li>
                <li>any texts</li>
                <li className="profile-image">
                    <img src="" alt="" />
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