import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
// this is provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userdata, setUserdata] = useState("");
  const [coursesData, setCoursesData] = useState("");
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_SERVER_API;
  let isLoggedIn = !!token;
  let authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    isLoggedIn = true;
    return localStorage.setItem("token", serverToken);
  };
  const LogoutUser = () => {
    isLoggedIn = false;
    setToken("");
    return localStorage.removeItem("token");
  };
  // jwt authorization
  useEffect(() => {
    userAuthentication();
    fetchCoursesData();
  }, []);
  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/user`, {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      if (response.ok) {
        const data = await response.json();
        setUserdata(data.user);
        setLoading(false);
      } else {
        const err = await response.json();
        console.log(err.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("error from userAuth ", error);
    }
  };
  const fetchCoursesData = async () => {
    try {
      const response = await fetch(`${API}/api/v1/courses`, {
        method: "GET",
      });
      if (response.ok) {
        const Data = await response.json();
        setCoursesData(Data.data);
      }
    } catch (error) {
      console.log(`course page error form frontend ${error}`);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        loading,
        isLoggedIn,
        userdata,
        coursesData,
        authorizationToken,
        API
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// this is delevering these provided items to all
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth not used outside the provider");
  }
  return authContextValue;
};
