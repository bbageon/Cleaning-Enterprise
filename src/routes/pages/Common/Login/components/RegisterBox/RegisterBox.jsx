import './RegisterBox.css';

export const RegisterBox = ({
    setIsShowRegister,
}) => {
    return (
        <>
            <h1 className="title">CLEAN KONG REGISTER</h1>
            <div className="form-wrap">
                <input type="text" placeholder='ID' />
                <input type="password" placeholder='PW' />
                <input type="text" placeholder='NAME' />
                <input type="tel" placeholder='PHONE' />
                <div className="form-buttons">
                    <button>REGISTER</button>
                    <button
                        onClick={() => setIsShowRegister(false)}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </>
    )
}