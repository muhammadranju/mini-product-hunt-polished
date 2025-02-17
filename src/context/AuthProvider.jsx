import { onAuthStateChanged, signOut as logOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refetch, setRefetch] = useState();
  const [loading, setLoading] = useState(true);

  const signOut = () => {
    setUser(null);
    logOut(auth);
    setLoading(false);
    localStorage.removeItem("token");
  };
  const updateUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe;
    };
  }, [refetch]);

  const value = {
    updateUser,
    user,
    loading,
    setUser,
    setLoading,
    signOut,
    setRefetch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
