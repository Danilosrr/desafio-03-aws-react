import React, { ReactNode, useContext, useEffect, useState } from "react";
import { InfoUser } from "../interfaces/search";

const StorageContext = React.createContext<IStorageContext>(
  {} as IStorageContext
);

interface IStorageContext {
  userData: InfoUser[];
  addUserData: (item: InfoUser) => void;
  getUserData: (uid: string) => InfoUser;
  editUserData: () => void;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [userData, setUserData] = useState<InfoUser[]>([]);
  const [editable, setEditable] = useState<boolean>(false);
  const localKey = "desafio-03";

  function loadStorage() {
    const storedData = localStorage.getItem(localKey);
    if (storedData) {
      if (JSON.parse(storedData) instanceof Array) {
        const array = JSON.parse(storedData).map((el: InfoUser) => {
          return { ...el };
        });
        setUserData(array);
      }
    }
  }

  async function addUserData(newItem: InfoUser) {
    setUserData(userData.concat([newItem]));
  }

  function getUserData(id: string) {
    return userData.filter(({ uid }) => uid == id)[0];
  }

  function editUserData() {
    return;
  }

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    console.log("state changed");
    localStorage.setItem(localKey, JSON.stringify(userData));
  }, [userData]);

  return (
    <StorageContext.Provider
      value={{
        userData,
        addUserData,
        getUserData,
        editUserData,
        editable,
        setEditable,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
