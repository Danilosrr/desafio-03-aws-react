import React, { ReactNode, useContext, useEffect, useState } from "react";
import { InfoUser } from "../interfaces/search";

const StorageContext = React.createContext<IStorageContext>(
  {} as IStorageContext
);

interface IStorageContext {
  userData: InfoUser[];
  addUserData: (item: InfoUser) => void;
  getUserData: (uid: string) => InfoUser;
  editUserData: (uid: string, prop: Object) => void;
  editUserExperience: (uid: string, index:number, prop: Object) => void;
  deleteUserExperience: (uid: string, index:number) => void;
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
        const updatedArr:InfoUser[] = [];
        JSON.parse(storedData).forEach((el: InfoUser) => {
          updatedArr.push(el)
        });
        setUserData(updatedArr);
      }
    }
  }

  async function addUserData(newItem: InfoUser) {
    setUserData(userData.concat([newItem]));
    localStorage.setItem(localKey, JSON.stringify(userData));
  }

  function getUserData(id: string) {
    return userData.filter(({ uid }) => uid == id)[0];
  }

  function editUserData(id: string, data: Object) {
    const user = getUserData(id);
    console.log(user)
    if (user) {
      const edit = { ...user, ...data };

      const index = userData.findIndex((el) => el.uid === user.uid);
      if (index !== -1) { 
        userData[index] = edit; 
      }
      localStorage.setItem(localKey, JSON.stringify(userData));
      return edit;
    }
    localStorage.setItem(localKey, JSON.stringify(userData));
  }

  function editUserExperience(id:string, index:number, data: Object) {
    const user = getUserData(id);
    if (user) {
      const edit = { ...user.experiences[index], ...data };
      console.log(edit)

      const i = userData.findIndex((el) => el.uid === user.uid);
      if (i !== -1) { 
        userData[i].experiences[index] = edit; 
      }
      localStorage.setItem(localKey, JSON.stringify(userData));
    }
  }

  function deleteUserExperience(id: string, index:number) {
    const user = getUserData(id);
    if (user) {
      const i = userData.findIndex((el) => el.uid === user.uid);
      if (i !== -1) { 
        userData[i].experiences.splice(index,1);
      }
      localStorage.setItem(localKey, JSON.stringify(userData));
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <StorageContext.Provider
      value={{
        userData,
        addUserData,
        getUserData,
        editUserData,
        editUserExperience,
        deleteUserExperience,
        editable,
        setEditable,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
