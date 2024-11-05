import React from "react";
import { useAuth } from "../../contexts/authContext";

export default function Portfolio() {
  const { signOutGithub } = useAuth();

  const logOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOutGithub();
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={logOut}>sair</button>;
}
