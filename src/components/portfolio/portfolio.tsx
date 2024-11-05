import React, { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";

export default function Portfolio() {
  const { name } = useParams();
  const { signOutGithub } = useAuth();

  const logOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOutGithub();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(name)
  }, []);

  return <button onClick={logOut}>sair</button>;
}
