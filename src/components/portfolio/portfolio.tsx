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
  const [storedUser, setStoredUser] = useState<InfoUser | null>(null);
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
  function getStored(uid: string) {
    try {
      const storedUser = getUserData(uid);
      setStoredUser(storedUser);
      console.log(storedUser);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (uid) getGit(uid);
  }, []);

  useEffect(() => {
    if (uid) getStored(uid);
  }, [storedUser]);

  return (
    <>
      <NavBar />
      {currentUser?.providerData[0].uid === uid && <EditButton />}
      <About
        name={storedUser?.name}
        img={gitUser?.avatar_url}
        login={gitUser?.login}
        location={gitUser?.location}
        email={gitUser?.email}
        pitch={gitUser?.bio}
        bio={storedUser?.bio}
      />
      <Experiences data={storedUser ? storedUser.experiences : []} />
      <Footer email={storedUser?.email} uid={uid}/>
    </>
  );
}
