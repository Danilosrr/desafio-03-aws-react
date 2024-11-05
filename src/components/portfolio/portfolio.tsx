import { useParams } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import About from "./about/About";

export default function Portfolio() {
  const { uid } = useParams();

  return (
    <>
      <NavBar />
      <About />
    </>
  );
}
