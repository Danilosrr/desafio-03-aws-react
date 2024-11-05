import { FaArrowRight } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";

interface IFormInput {
  search: string;
}

interface Suggestions {
    name: string;
}

export default function Search() {
  const {signInGithub} = useAuth();
  const navigate = useNavigate();
  const [suggestions, setSuggestion] = useState<Suggestions[]>([]);

  const {
    register,
    //setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const getSuggestions = () =>{
    const storedData = localStorage.getItem('desafio-03');
    if (storedData) {
      try {
        if (Array.isArray(JSON.parse(storedData))) {
          setSuggestion(JSON.parse(storedData));
        } 
      } catch (err){
        console.log(err);
      }
    }
  }

  const onSubmit = (data: IFormInput) => {
    //setError("search", { type:"server", message:"O nome que você digitou não está cadastrado!" });
    console.log(JSON.stringify(data));
  };

  const signIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const user = await signInGithub();
      if (user) {
        const nameInSuggestions = suggestions.find(({name}) => name === user.displayName)  
        if (!nameInSuggestions) {
          suggestions.push({name:user.displayName as string});
          localStorage.setItem('desafio-03',JSON.stringify(suggestions));
        }
        navigate("/portfolio");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getSuggestions();
  }, [])

  return (
    <main className="searchContainer">
      <h2>Digite o nome do usuário que deseja buscar</h2>
      <section className="searchBar">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input list="users"
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

      <datalist id="users">
      {suggestions.map(({name})=> { return <option key={name} value={name}></option>})}
      </datalist>
    </main>
  );
}
