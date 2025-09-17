import { getAllUsers } from "../api/users.js";
import { createContext, useContext, useEffect, useState } from "react";

export const ControlPanelContext = createContext();

export const useControlPanel = () => {
  const context = useContext(ControlPanelContext);

  if (!context) {
    throw new Error(
      "useControlPanel must be used within a ControlPanelProvider"
    );
  }
  return context;
};

export const ControlPanelProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  const getAll = async () => {
    try {
      const users = await getAllUsers()
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <ControlPanelContext.Provider value={{ users, getAll }}>
      {children}
    </ControlPanelContext.Provider>
  )

};
