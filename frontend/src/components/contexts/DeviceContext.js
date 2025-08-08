import {createContext, useContext, useEffect, useState} from "react";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 768);
            setIsTablet(window.innerWidth <= 1024);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <DeviceContext.Provider value={{
            isMobile,
            isTablet,
        }}>
            {children}
        </DeviceContext.Provider>
    )
}

export function useDeviceContext() {
    return useContext(DeviceContext);
}