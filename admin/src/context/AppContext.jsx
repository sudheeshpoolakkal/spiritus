import { createContext } from "react";

// Initialize the context
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const value = {
        // Define your context values here
    };

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* Render the children components */}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
