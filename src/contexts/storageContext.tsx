import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Suggestion } from "../interfaces/search";

const StorageContext = React.createContext<IStorageContext>(
  {} as IStorageContext
);

interface IStorageContext {
  suggestions: Suggestion[];
  //userData: any;
  addSuggestion: (item: Suggestion) => void;
  getUserData: () => void;
  editUserData: () => void;
}

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  //const [userData, setUserData] = useState<any>({});
  const localKey = "desafio-03";

  function loadStorage() {
    const storedData = localStorage.getItem(localKey);
    if (storedData) {
      if (JSON.parse(storedData) instanceof Array) {
        const array = JSON.parse(storedData).map((el: Suggestion) => {
          return {
            name: el.name,
            uid: el.uid,
          };
        });
        setSuggestions(array);
      }
    }
  }

  async function addSuggestion(newItem: Suggestion) {
    setSuggestions(suggestions.concat([newItem]));
  }

  function getUserData() {
    return;
  }

  function editUserData() {
    return;
  }

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    console.log('state changed')
    localStorage.setItem(localKey, JSON.stringify(suggestions));
  }, [suggestions])

  return (
    <StorageContext.Provider
      value={{
        suggestions,
        //userData,
        addSuggestion,
        getUserData,
        editUserData,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
