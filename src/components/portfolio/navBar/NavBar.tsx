import { CiLogin } from "react-icons/ci";
import { useAuth } from "../../../contexts/authContext";
import "./NavBar.css";
import { Suggestion } from "../../../interfaces/search";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { currentUser, signInGithub, signOutGithub } = useAuth();
  const navigate = useNavigate();

  const logOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOutGithub();
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    const storedData = localStorage.getItem("desafio-03");
    try {
      const user = await signInGithub();
      if (user) {

        if (storedData) {
          const suggestion = JSON.parse(storedData) as Suggestion[];
          
          const nameInSuggestions = suggestion.find( ({ name }) => name === user.displayName);
          if (!nameInSuggestions) {
            suggestion.push({ name: user.displayName as string, uid:user.providerData[0].uid });
            localStorage.setItem("desafio-03", JSON.stringify(suggestion));
          }
        } else {
          localStorage.setItem("desafio-03", JSON.stringify([{ name: user.displayName, uid: user.providerData[0].uid }]));
        }
        navigate(`/portfolio/${user.providerData[0].uid}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="portfolioNav">
      <a href="#user">Início</a>
      <a href="#about">Minha história</a>
      <a href="#exp">Experiências</a>
      <a href="#contact">Contato</a>
      {currentUser ? (
        <button className="exit" onClick={logOut}>
          Sair
          <img
            className="userThumbnail"
            src={currentUser.photoURL ? currentUser.photoURL : ""}
            alt="user thumbnail"
          />
        </button>
      ) : (
        <button className="access" onClick={logIn}>
          <CiLogin />
          Entrar
        </button>
      )}
    </nav>
  );
}
