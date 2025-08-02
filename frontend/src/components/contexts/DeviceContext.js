import {createContext, useContext, useEffect, useState} from "react";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <DeviceContext.Provider value={{
            isMobile
        }}>
            {children}
        </DeviceContext.Provider>
    )
}

export function useDeviceContext() {
    return useContext(DeviceContext);
}