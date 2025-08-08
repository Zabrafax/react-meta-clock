import {createContext, useContext, useEffect, useState} from "react";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
    const [isSmallHorizontal, setIsSmallHorizontal] = useState(window.innerHeight <= 480);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerHeight > 480);

    useEffect(() => {
        function handleResize() {
            setIsSmallHorizontal(window.innerHeight <= 480);
            setIsMobile(window.innerWidth <= 768);
            setIsTablet(window.innerWidth <= 1024 && window.innerHeight > 480);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <DeviceContext.Provider value={{
            isMobile,
            isTablet,
            isSmallHorizontal
        }}>
            {children}
        </DeviceContext.Provider>
    )
}

export function useDeviceContext() {
    return useContext(DeviceContext);
}