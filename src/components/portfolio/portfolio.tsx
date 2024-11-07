import NavBar from "./navBar/NavBar";
import About from "./about/About";
import Experiences from "./experiences/Experiences";
import Footer from "./footer/Footer";
import EditButton from "./editButton/EditButton";
import { useParams } from "react-router-dom";
import { GithubUserData } from "../../interfaces/github";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/Api";
import { useAuth } from "../../contexts/authContext";

export default function Portfolio() {
  const [data, setData] = useState<GithubUserData | null>(null);
  const { currentUser } = useAuth();
  const { uid } = useParams();

  async function getData(uid: string) {
    try {
      const request = await getUserInfo(uid);
      setData(request);
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (uid) getData(uid);
  }, [uid]);

  return (
    <>
      <NavBar />
      {currentUser?.providerData[0].uid === uid && <EditButton />}
      <About
        name={data?.name}
        img={data?.avatar_url}
        login={data?.login}
        location={data?.location}
        email={data?.email}
      />
      <Experiences />
      <Footer />
    </>
  );
}
