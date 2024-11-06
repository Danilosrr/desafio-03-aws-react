import NavBar from "./navBar/NavBar";
import About from "./about/About";
import { useParams } from "react-router-dom";
import { GithubUserData } from "../../interfaces/github";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/Api";

export default function Portfolio() {
  const [data, setData] = useState<GithubUserData | null>(null);
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
  }, []);

  return (
    <>
      <NavBar />
      <About name={data?.name} img={data?.avatar_url}/>
    </>
  );
}
