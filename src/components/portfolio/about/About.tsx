import { openInNewTab } from "../../../utils/generics";
import { useState } from "react";
import { EditDot } from "../editButton/EditButton";
import Modal from "../../modal/Modal";
import "./About.css";
import { useStorage } from "../../../contexts/storageContext";

interface Props {
  login?: string;
  location?: string | null;
  linkedin?: string;
  email?: string | null;
  name?: string;
  img?: string;
  bio?: string;
  pitch?: string | null;
}

export default function About({
  login,
  location,
  linkedin,
  email,
  name,
  img,
  bio,
  pitch
}: Readonly<Props>) {
  const {editable} = useStorage();
  const [modal,setModal] = useState<boolean>(false)

  const linkedinClick = () => {
    if (editable)  setModal(true);
    else console.log('click');
  }

  return (
    <>
      <section className="aboutSection" id="user">
        <article className="aboutUser">
            <figure>
            <div className="portrait">
                {img && <img src={img} alt="user"/>}
            </div>
            {login && <b>{login}</b>}
            {location && <p>{location}</p>}
            {email && <p>{email}</p>}
            </figure>
        </article>
        <aside className="aboutPitch">
            {(name || editable) && <h2>Hello,<br/> I'm { editable ? <input size={20} value={name}/>:<b>{name}</b> }</h2>}
            { pitch && <p>{pitch}</p>}
            <span>
            <button onClick={() => openInNewTab(`https://github.com/${login}`)}>Github</button>
            {(linkedin || editable) && <button onClick={linkedinClick}>LinkedIn<EditDot/></button>}
            </span>
        </aside>
      </section>
      <section className="aboutTextArea" id="about">
        <article>
            <h2>Minha história</h2>
            <textarea disabled={!editable} placeholder={editable?"Adicione sua história":"Não há nenhuma história pra contar!"} value={bio}></textarea>
        </article>
      </section>
      <Modal
        title="Adicionar link"
        isOpen={modal}
        setState={setModal}
        keys={[
          { name: "linkedin", required: true },
        ]}
      />
    </>
  );
}