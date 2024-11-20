import './LoginBox.css';

export const LoginBox = ({
    setIsShowRegister,

    login,

    signinUserInfo,
    setSigninUserInfo,
}) => {
    return (
        <>
            <h1 className="title">CLEAN KONG</h1>
            <div className="form-wrap">
                <input
                    type="text"
                    placeholder='ID'
                    onChange={e => {
                        const id = e.target.value;
                        setSigninUserInfo(prev => {
                            return {
                                ...prev,
                                id,
                            }
                        })
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') login()
                    }}
                    value={signinUserInfo.id}
                    autoFocus
                />
                <input
                    type="password"
                    placeholder='PW'
                    onChange={e => {
                        const pw = e.target.value;
                        setSigninUserInfo(prev => {
                            return {
                                ...prev,
                                pw,
                            }
                        })
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') login()
                    }}
                    value={signinUserInfo.pw}
                />
                <div className="form-buttons">
                    <button
                        onClick={login}
                    >
                        LOGIN
                    </button>
                    {/* <button
                        onClick={() => setIsShowRegister(true)}
                    >
                        REGISTER
                    </button> */}
                </div>
            </div>
        </>
    )
}