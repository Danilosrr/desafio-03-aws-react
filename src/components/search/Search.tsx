import { FaArrowRight } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { useStorage } from "../../contexts/storageContext";
import { useNavigate } from "react-router-dom";
import "./Search.css";

interface IFormInput {
  search: string;
}

export default function Search() {
  const { userData, addUserData } = useStorage();
  const { signInGithub } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    setError,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  const search = watch("search");

  const onSubmit = (data: IFormInput) => {
    try {
      for (const match of userData) {
        if (match.name.startsWith(data.search))
          navigate(`/portfolio/${match.uid}`);
      }
      return setError("search", {
        type: "server",
        message: "O nome que você digitou não está cadastrado!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const user = await signInGithub();
      if (user) {
        const nameInSuggestions = userData.find(
          ({ name }) => name === user.displayName
        );
        if (!nameInSuggestions) {
          addUserData({
            name: user.displayName as string,
            uid: user.providerData[0].uid,
            linkedin: "",
            youtube: "",
            facebook: "",
            twitter: "",
            instagram: "",
            email: "",
            experiences: [],
            bio: "",
          });
        }
        navigate(`/portfolio/${user.providerData[0].uid}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="searchContainer">
      <h2>Digite o nome do usuário que deseja buscar</h2>
      <section className="searchBar">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("search", {
              required: {
                value: true,
                message:
                  "O nome que você digitou não existe ou não está cadastrado!",
              },
            })}
          />
          <button className="primary" type="submit" disabled={!isValid}>
            <FaArrowRight size={25} />
          </button>
          <ul className="suggestions" hidden={false}>
            {userData.map(({ name, uid }) => {
              if (search && name.startsWith(search)) {
                return (
                  <li
                    key={name}
                    onClick={() => {
                      navigate(`/portfolio/${uid}`);
                    }}
                  >
                    <IoPersonSharp size={16} />
                    <p className="label">{name}</p>
                  </li>
                );
              }
              else return <></>
            })}
          </ul>
        </form>
        {errors.search && <p className="warning">{errors.search.message}</p>}
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
