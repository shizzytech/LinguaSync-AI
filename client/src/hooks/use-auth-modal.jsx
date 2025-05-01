import React, { createContext, useContext, useState } from "react";

// Define the AuthMode constants
export const AUTH_MODES = {
  LOGIN: "login",
  SIGNUP: "signup"
};

const AuthModalContext = createContext(undefined);

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const openModal = (mode) => {
    setMode(mode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        mode,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};