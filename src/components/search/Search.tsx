import { FaArrowRight } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "./Search.css";

interface IFormInput {
  search: string;
}

export default function Search() {
  const {signInGithub} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    //setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    //setError("search", { type:"server", message:"O nome que você digitou não está cadastrado!" });
    console.log(JSON.stringify(data));
  };

  const signIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signInGithub();
      navigate("/portfolio");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="searchContainer">
      <h2>Digite o nome do usuário que deseja buscar</h2>
      <section className="searchBar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("search", {
              required: {value: true, message: "O nome que você digitou não existe ou não está cadastrado!"}
            })}
          />
          
          <button className="primary" type="submit">
            <FaArrowRight size={25} />
          </button>
        </form>
        {errors.search  &&  <p className="warning">{errors.search.message}</p>}
      </section>
      <section className="line">
        <hr />
        <b>ou</b>
        <hr />
      </section>
      <section className="login">
        <b>Acesse sua conta com</b>
        <button className="secondary" onClick={signIn}>
          <TbBrandGithubFilled size={16} />
          <p>Github</p>
        </button>
      </section>
    </main>
  );
}
