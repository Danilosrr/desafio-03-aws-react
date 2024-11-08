import { openInNewTab } from "../../../utils/generics";
import { useState } from "react";
import { EditDot } from "../editButton/EditButton";
import Modal from "../../modal/Modal";
import { useStorage } from "../../../contexts/storageContext";
import { useParams } from "react-router-dom";
import "./About.css";
import { GithubUserData } from "../../../interfaces/github";

interface Props {
  gitUser:GithubUserData | null
}

export default function About({
  gitUser,
}: Readonly<Props>) {
  const {uid} = useParams();
  const {editable,editUserData,getUserData} = useStorage();
  const [modal,setModal] = useState<boolean>(false)

  const linkedinClick = () => {
    if (editable)  {
      setModal(true);
    } else {
      if (uid && getUserData(uid)['linkedin']) {
        openInNewTab(getUserData(uid)['linkedin'])
      }
    };
  }
  
  const saveInput = (e: React.ChangeEvent) => {
    if (uid) {
      const { name, value } = e.target as HTMLInputElement;
      editUserData(uid, { [name]: value });
    }
  };

  const storedUser = uid ? getUserData(uid) : undefined;

  return (
    <>
      <section className="aboutSection" id="user">
        <article className="aboutUser">
            <figure>
            <div className="portrait">
                {gitUser?.avatar_url && <img src={gitUser.avatar_url} alt="user"/>}
            </div>
            {gitUser?.login && <b>{gitUser.login}</b>}
            {gitUser?.location && <p>{gitUser.location}</p>}
            {storedUser?.email && <p>{storedUser.email}</p>}
            </figure>
        </article>
        <aside className="aboutPitch">
            {(storedUser?.name || editable) && <h2>Hello,<br/> I'm { editable ? <input name="name" onChange={saveInput} defaultValue={storedUser?.name}/>:<b>{storedUser?.name}</b> }</h2>}
            { storedUser?.pitch && <p>{storedUser?.pitch}</p>}
            <span>
            {gitUser?.login && <button onClick={() => openInNewTab(`https://github.com/${gitUser.login}`)}>Github</button>}
            {(storedUser?.linkedin || editable) && <button onClick={linkedinClick}>LinkedIn<EditDot/></button>}
            </span>
        </aside>
      </section>
      <section className="aboutTextArea" id="about">
        <article>
            <h2>Minha história</h2>
            <textarea 
              name="bio"
              disabled={!editable} 
              placeholder={editable?"Adicione sua história":"Não há nenhuma história pra contar!"} 
              defaultValue={storedUser?.bio}
              onChange={saveInput}
            ></textarea>
        </article>
      </section>
      { modal && <Modal uid={uid} setState={setModal} keys={[{ name: "linkedin", required: false }]}/> }
    </>
  );
}