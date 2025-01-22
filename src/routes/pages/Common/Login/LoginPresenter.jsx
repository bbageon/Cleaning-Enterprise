import { LoginBox } from './components/LoginBox';
import { RegisterBox } from './components/RegisterBox';
import './Login.css';

const LoginPresenter = ({
    isShowRegister,
    setIsShowRegister,

    login,

    signinUserInfo,
    setSigninUserInfo,

    navigate,
}) => {
    return (
        <div
            className="login-container"
            style={{
                position: 'relative',
            }}
        >
            <div className="login-wrap">
                {
                    isShowRegister ?
                        <RegisterBox
                            setIsShowRegister={setIsShowRegister}
                        /> :
                        <LoginBox
                            setIsShowRegister={setIsShowRegister}

                            login={login}

                            signinUserInfo={signinUserInfo}
                            setSigninUserInfo={setSigninUserInfo}
                        />
                }
                <span
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: '#FFFFFF',
                        borderBottom: '1px solid #FFFFFF',
                        paddingBottom: '3px',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/admin')}
                >관리자이신가요?</span>
            </div>
        </div>
    )
}

export default LoginPresenter;