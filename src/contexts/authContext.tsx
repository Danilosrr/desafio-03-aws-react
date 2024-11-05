import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

interface AuthContext {
  currentUser: User | null;
  userLoggedIn: boolean;
  signInGithub: () => Promise<UserCredential>;
  signOutGithub: () => Promise<void>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  async function initializeUser(user: React.SetStateAction<User | null>) {
    if (user) {
      setCurrentUser({ ...user } as User);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
  }

  async function signInGithub() {
    const provider = new GithubAuthProvider();
    const request = await signInWithPopup(auth, provider);
    return request;
  }

  async function signOutGithub() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("An error happened");
    } finally {
      setCurrentUser(null);
      setUserLoggedIn(false);
      navigate("/");
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userLoggedIn, signInGithub, signOutGithub }}
    >
      {children}
    </AuthContext.Provider>
  );
}
