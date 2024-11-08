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
  const [index, setIndex] = useState<number>(0);
  const {uid} = useParams();

  const addCardButton = (data.length !== 4 && editable)
  const emptyCase = (data.length == 0 && !editable )

  const addCard = () => {
    setIndex(data.length);
    setModal(true);
  };

  const editCard = (index:number) => {
    console.log(index)
    setIndex(index);
    setModal(true);
  };

  const deleteCard = () => {
    console.log("delete");
  };

  return (
    <section className="experienceSection" id="exp">
      <h2>Experiências</h2>
      <div className="carousel">
        {!!data.length && data.map(({ title, period, technologies, summary, link }, index) => {
          return (
            <article className="card" key={title}>
              <div className="cardContent">
                <h3>{title}</h3>
                <h4>{period}</h4>
                <span>
                  {technologies.split(',').map((name) => {
                    return <b key={name}>{name}</b>;
                  })}
                </span>
                <p>{summary}</p>
                {link && <button>Ver repositório</button>}
              </div>
              {editable && (
                <div className="cardButtons">
                  <span className="edit" onClick={() => editCard(index)}>
                    <RiEditFill size={64} />
                  </span>
                  <span className="delete" onClick={() => editCard(index)} >
                    <RiDeleteBin7Fill size={64} />
                  </span>
                </div>
              )}
            </article>
          );
        })}
        {emptyCase && <p className="emptyWarning">Não há nada por aqui!</p> }
        {addCardButton && (
          <article className="card" onClick={addCard}>
            <div className="addCard">
              <RiAddCircleLine size={72} />
              <h3>Adicionar card</h3>
            </div>
          </article>
        )}
      </div>
      { modal && <Modal 
        uid={uid} 
        setState={setModal} 
        index={index}
        keys={[
          {name: 'title', required:true},
          {name: 'period', required:true},
          {name: 'technologies', required:true},
          {name: 'summary', required:true},
          {name: 'link', required:false}
        ]}
      /> }
    </section>
  );
}
