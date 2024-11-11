import { useState } from "react";
import LoginPresenter from "./LoginPresenter";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../api";

const LoginContainer = () => {
    const navigate = useNavigate();
    const [isShowRegister, setIsShowRegister] = useState(false);
    const [signinUserInfo, setSigninUserInfo] = useState({
        id: '',
        pw: '',
    });

    const login = async () => {
        const result = await API.postEmployeeSignin(signinUserInfo);
        if (result.status !== 200) {
            console.log(`[LoginContainer][login] Error : ${result.message}`);
            alert(`아이디와 비밀번호를 다시한번 확인해주세요`);
            return;
        }

        alert(`${result.data.name}님 환영합니다!`);
        navigate('/main');
    }

    return (
        <LoginPresenter
            isShowRegister={isShowRegister}
            setIsShowRegister={setIsShowRegister}

            login={login}

            signinUserInfo={signinUserInfo}
            setSigninUserInfo={setSigninUserInfo}
        />
    )
}

export default LoginContainer;