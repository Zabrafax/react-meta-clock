import {createContext, useContext, useState} from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
    const [isErrorWindowActive, setIsErrorWindowActive] = useState(false);

    function handleError() {
        setIsErrorWindowActive(true);
    }

    return (
      <ErrorContext.Provider value={{
          isErrorWindowActive,
          handleError,
      }}>
          {children}
      </ErrorContext.Provider>
    );
}

export function useErrorContext() {
    return useContext(ErrorContext)
}