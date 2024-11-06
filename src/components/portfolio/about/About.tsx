import "./About.css";

interface Props {
  name?: string;
  img?: string ;
}

export default function About({ name,img }: Readonly<Props>) {
  return (
    <section className="aboutSection">
      <article className="aboutUser">
        <figure>
          <div className="portrait">
            {img && <img src={img} alt="user"/>}
          </div>
          <b>Danilosrr</b>
          <p>Paraiba, PB</p>
          <p>danilo_srr@hotmail.com</p>
        </figure>
      </article>
      <aside className="aboutPitch">
        {name && <h2>Hello,<br/> I'm <b>{name}</b></h2>}
        <p>
          Olá, meu nome é Felipe Pato e sou dev há 24 anos, sou um senior
          experiente e potente, sempre disposto a evoluir!
        </p>
        <span>
          <button>Github</button>
          <button>LinkedLn</button>
        </span>
      </aside>
    </section>
  );
}
