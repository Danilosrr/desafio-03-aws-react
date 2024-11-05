import { useParams } from "react-router-dom";
import NavBar from "./navBar/NavBar";

export default function Portfolio() {
  const { name } = useParams();

  return (
    <>
      <NavBar />
    </>
  );
}
