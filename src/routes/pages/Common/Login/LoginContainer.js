import { useEffect, useState } from "react";
import LoginPresenter from "./LoginPresenter";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../api";
import { isLogin } from "../../../../util";

const LoginContainer = ({
    setCookies,
}) => {
    const navigate = useNavigate();
    const [isShowRegister, setIsShowRegister] = useState(false);
    const [signinUserInfo, setSigninUserInfo] = useState({
        id: '',
        pw: '',
    });

    // 로그인 여부를 확인하여 로그인 되어있는 경우 메인 화면으로 리다이렉트
    useEffect(() => {
        if (isLogin()) {
            navigate('/main');
        }
    }, []);

    const login = async () => {
        const result = await API.postEmployeeSignin(signinUserInfo);
        if (result.status !== 200) {
            console.log(`[LoginContainer][login] Error : ${result.message}`);
            alert(`아이디와 비밀번호를 다시한번 확인해주세요`);
            return;
        }

        setCookies(result.data);
        console.log(result.data.token)

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

            navigate={navigate}
        />
    )
}

export default LoginContainer;