import { LoginBox } from './components/LoginBox';
import { RegisterBox } from './components/RegisterBox';
import './Login.css';

const LoginPresenter = ({
    isShowRegister,
    setIsShowRegister,

    login,

    signinUserInfo,
    setSigninUserInfo,
}) => {
    return (
        <div
            className="login-container"
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
            </div>
        </div>
    )
}

export default LoginPresenter;