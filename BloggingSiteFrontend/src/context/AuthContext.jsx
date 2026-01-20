import React, { createContext, useEffect, useState } from "react";
import API from "../apiServices/APIService";

// ✅ CONTEXT CREATE
 const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 LOGOUT (upar declare — hoisting issue avoid)
  const logOut = () => {
    localStorage.removeItem("x-api-key");
    localStorage.removeItem("authorId");
    setUser(null);
  };

  // 🔹 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
      logOut(); // token invalid / expired
    } finally {
      setLoading(false);
    }
  };

  // 🔹 PAGE REFRESH PAR USER RAHE
  useEffect(() => {
    const token = localStorage.getItem("x-api-key");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔹 LOGIN
  const logIn = (data) => {
    localStorage.setItem("x-api-key", data.token);
    localStorage.setItem("authorId", data.authorId);
    setUser(data); // optional: fetchProfile()
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
