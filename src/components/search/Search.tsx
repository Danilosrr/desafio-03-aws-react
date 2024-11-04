import { FaArrowRight } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import "./Search.css";

export default function Search() {
  return (
    <main className="searchContainer">
      <h2>Digite o nome do usuário que deseja buscar</h2>
      <section className="searchBar">
        <input placeholder="Digite o nome do usuário" />
        <button className="primary">
          <FaArrowRight size={25} />
        </button>
      </section>
      <section className="line">
        <hr /><b>ou</b><hr />
      </section>
      <section className="login">
        <b>Acesse sua conta com</b>
        <button className="secondary">
          <TbBrandGithubFilled size={16} />
          <p>Github</p>
        </button>
      </section>
    </main>
  );
}
