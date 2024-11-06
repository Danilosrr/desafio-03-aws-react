import { RiEditFill, RiDeleteBin7Fill, RiAddCircleLine } from "react-icons/ri";
import "./Experiences.css";

function AddCard() {
  return (
    <article className="card">
      <div className="addCard">
        <RiAddCircleLine size={72}/>
        <h3>Adicionar card</h3>
      </div>
    </article>
    )
}

function Card() {
  const editCard = () =>{ console.log('edit') }
  const deleteCard = () =>{ console.log('delete') }

  return (
    <article className="card">
      <div className="cardContent">
        <h3>Dev junior na NASA</h3>
        <h4>Junho - 2002 - 2020</h4>
        <span>
          <b>Figma</b>
          <b>React</b>
          <b>Typescript</b>
        </span>
        <p>
          Um projetão fellas da minha cidade que é muito fellas, um projeto tão
          fellas que não deixa de ser fellas, um projetinho fellas feito pra ser
          fellas, agora continuarei escrevendo pra ocupar espaço.
        </p>
        <button>Ver repositório</button>
      </div>
      <div className="cardButtons">
        <span className="edit"><RiEditFill  size={64} onClick={editCard}/></span>
        <span className="delete"><RiDeleteBin7Fill size={64} onClick={deleteCard}/></span>
      </div>
    </article>
  );
}

export default function Experiences() {
  return (
    <section className="experienceSection" id="exp">
      <h2>Experiências</h2>
      <div className="carousel">
        {[0, 1, 2].map((x) => {
          return <Card key={x} />;
        })}
        {true && <AddCard/>/*placeholder*/}
      </div>
    </section>
  );
}
