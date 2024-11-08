import { RiEditFill, RiDeleteBin7Fill, RiAddCircleLine } from "react-icons/ri";
import { useStorage } from "../../../contexts/storageContext";
import { Experience } from "../../../interfaces/search";
import Modal from "../../modal/Modal";
import { useState } from "react";
import "./Experiences.css";
import { useParams } from "react-router-dom";

interface Props {
  data: Experience[]
}

export default function Experiences({data}:Readonly<Props>) {
  const { editable } = useStorage();
  const [modal, setModal] = useState<boolean>(false);
  const {uid} = useParams();

  const addCardButton = (data.length !== 4 && editable)
  const emptyCase = (data.length == 0 && !editable )

  console.log(addCardButton,emptyCase)

  const editCard = () => {
    setModal(true);
  };

  const deleteCard = () => {
    console.log("delete");
  };

  return (
    <section className="experienceSection" id="exp">
      <h2>Experiências</h2>
      <div className="carousel">
        {!!data.length && data.map(({ title, period, technologies, summary, link }) => {
          return (
            <article className="card" key={title}>
              <div className="cardContent">
                <h3>{title}</h3>
                <h4>{period}</h4>
                <span>
                  {technologies.map((name) => {
                    return <b key={name}>{name}</b>;
                  })}
                </span>
                <p>{summary}</p>
                {link && <button>Ver repositório</button>}
              </div>
              {editable && (
                <div className="cardButtons">
                  <span className="edit" onClick={editCard}>
                    <RiEditFill size={64} />
                  </span>
                  <span className="delete" onClick={deleteCard} >
                    <RiDeleteBin7Fill size={64} />
                  </span>
                </div>
              )}
            </article>
          );
        })}
        {emptyCase && <p className="emptyWarning">Não há nada por aqui!</p> }
        {addCardButton && (
          <article className="card">
            <div className="addCard">
              <RiAddCircleLine size={72} />
              <h3>Adicionar card</h3>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
