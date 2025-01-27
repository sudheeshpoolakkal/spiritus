import { createContext } from "react";

// Initialize the context
export const AppContext = createContext();

const AppContextProvider = (props) => {

    const calculateAge = (dob)=>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear() 
        return age
    }

    const value = {
        calculateAge
    };

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* Render the children components */}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
