import { openInNewTab } from "../../../utils/generics";
import "./About.css";

interface Props {
  login?: string;
  location?: string | null;
  email?: string | null;
  name?: string;
  img?: string;
}

export default function About({
  login,
  location,
  email,
  name,
  img,
}: Readonly<Props>) {
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
            {name && <h2>Hello,<br/> I'm <b>{name}</b></h2>}
            <p>
            {"Olá, meu nome é Felipe Pato e sou dev há 24 anos, sou um senior experiente e potente, sempre disposto a evoluir!"/*placeholder*/} 
            </p>
            <span>
            <button onClick={() => openInNewTab(`https://github.com/${login}`)}>Github</button>
            <button>LinkedLn</button>
            </span>
        </aside>
      </section>
      <section className="aboutTextArea" id="about">
        <article>
            <h2>Minha história</h2>
            <textarea></textarea> 
        </article>
      </section>
    </>
  );
}
