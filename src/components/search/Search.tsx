import { FaArrowRight } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Suggestion } from "../../interfaces/search";
import "./Search.css";

interface IFormInput {
  search: string;
}

export default function Search() {
  const {signInGithub} = useAuth();
  const navigate = useNavigate();
  const [suggestions, setSuggestion] = useState<Suggestion[]>([]);

  const {
    register,
    setError,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  
  const search = watch("search");

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
    try {
      for (const match of suggestions){
        if (match.name.startsWith(data.search)) return navigate(`/portfolio/${match.uid}`);
      }
      return setError("search", { type:"server", message:"O nome que você digitou não está cadastrado!" })
    } catch (error) {
      console.log(error)
    }
  };

  const signIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const user = await signInGithub();
      if (user) {
        const nameInSuggestions = suggestions.find(({name}) => name === user.displayName)  
        if (!nameInSuggestions) {
          suggestions.push({name:user.displayName as string, uid: user.providerData[0].uid});
          localStorage.setItem('desafio-03',JSON.stringify(suggestions));
        }
        navigate(`/portfolio/${user.providerData[0].uid}`);
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
          <input
            {...register("search", {
              required: {value: true, message: "O nome que você digitou não existe ou não está cadastrado!"}
            })}
          />
          <button className="primary" type="submit" disabled={!search}>
            <FaArrowRight size={25} />
          </button>
          <ul className="suggestions" hidden={false}>
            {suggestions.map(({name})=> { 
              if (search && name.startsWith(search)){
                return <li key={name}>
                <IoPersonSharp size={16}/>
                <p className="label">{name}</p>
              </li>
              }
            })}
          </ul>
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
