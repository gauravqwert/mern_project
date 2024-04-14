// in React, the context is a feature that allows you to store you to sahre state data between components without explicity passing the data through each level of the component tree.it's way to manage global state to share data between components that are not directly connected.

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading,setIsLoading] = useState(true);

    const [services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`

    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    let isLoggedIn = !!token;

    // tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }


    //to fetch the services data from the database

    const getServices = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/data/service", {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`services frontened error : ${error}`);
        }
    }
    // Jwt Authentication
    // to get the currently logging user data


    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://127.0.0.1:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            }
            else{
                console.log("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    };

    useEffect(() => {
        getServices();
        userAuthentication();
    }, []);



    return (<AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, LogoutUser, user, services,authorizationToken,isLoading, }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    // useAuth function now contains the value provided by the AuthContext.Provider higher up in the component tree.

    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;

}

// The value prop of the provider is crucial because it's where you define the data that you want to make accessible to components that consume the context.