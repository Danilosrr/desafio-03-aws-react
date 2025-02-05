import NavBar from "./navBar/NavBar";
import About from "./about/About";
import Experiences from "./experiences/Experiences";
import Footer from "./footer/Footer";
import EditButton from "./editButton/EditButton";
import { useParams } from "react-router-dom";
import { GithubUserData } from "../../interfaces/github";
import { InfoUser } from "../../interfaces/search";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/Api";
import { useAuth } from "../../contexts/authContext";
import { useStorage } from "../../contexts/storageContext";

export default function Portfolio() {
  const [gitUser, setGitUser] = useState<GithubUserData | null>(null);
  const [ storedUser, setStoredUser] = useState<InfoUser | null>(null);
  const { currentUser } = useAuth();
  const { getUserData } = useStorage();
  const { uid } = useParams();

  async function getGit(uid: string) {
    try {
      const git = await getUserInfo(uid);
      setGitUser(git);
      console.log(git);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (uid) getGit(uid);
  }, [uid]);

  useEffect(() => {
    console.log(storedUser)
    if (uid) {
      try {
        const storedUser = getUserData(uid);
        setStoredUser(storedUser);
      } catch (error) {
        console.log(error);
      }
    };
  }, [getUserData, storedUser, uid]);

  return (
    <>
      <NavBar />
      {currentUser?.providerData[0].uid === uid && <EditButton />}
      <About gitUser={gitUser}/>
      <Experiences data={storedUser ? storedUser.experiences : []} />
      <Footer uid={uid}/>
    </>
  );
}
