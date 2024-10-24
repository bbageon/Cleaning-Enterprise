import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const CustomContext = createContext();

export const CustomProvider = ({
    children
}) => {
    const navigate = useNavigate();

    return (
        <CustomContext.Provider value={{ navigate }}>
            {children}
        </CustomContext.Provider>
    );
};

export const useCustomContext = () => {
    const context = useContext(CustomContext);
    if (!context) {
        throw new Error(`Provider 내에서만 사용 가능`);
    }
    return context;
}