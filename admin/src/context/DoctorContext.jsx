import { createContext } from "react";

// Initialize the context
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const value = {
        // Define your context values here
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children} {/* Render the children components */}
        </DoctorContext.Provider>
    );
}

export default DoctorContextProvider;
