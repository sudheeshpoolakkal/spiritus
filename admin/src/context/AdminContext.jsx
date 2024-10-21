import { createContext } from "react";

// Initialize the context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const value = {
        // Define your context values here
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children} {/* Render the children components */}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;
