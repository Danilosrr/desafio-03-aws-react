import { RiEditFill, RiDeleteBin7Fill, RiAddCircleLine } from "react-icons/ri";
import { useStorage } from "../../../contexts/storageContext";
import { Experience } from "../../../interfaces/search";
import Modal from "../../modal/Modal";
import { useReducer, useState } from "react";
import "./Experiences.css";
import { useParams } from "react-router-dom";
import { openInNewTab } from "../../../utils/generics";

interface Props {
  data: Experience[]
}

export default function Experiences({data}:Readonly<Props>) {
  const { editable, deleteUserExperience } = useStorage();
  const [modal, setModal] = useState<boolean>(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [index, setIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>("Adicionar card");
  const {uid} = useParams();

  const addCardButton = (data.length !== 4 && editable)
  const emptyCase = (data.length === 0 && !editable )

  const addCard = () => {
    setTitle("Adicionar card")
    setIndex(data.length);
    setModal(true);
  };

  const editCard = (index:number) => {
    setTitle("Editar card")
    setIndex(index);
    setModal(true);
  };

  const deleteCard = (index:number) => {
    if (uid) {
      deleteUserExperience(uid,index);
      forceUpdate()
    }
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
                {link && <button onClick={() => openInNewTab(link)}>Ver repositório</button>}
              </div>
              {editable && (
                <div className="cardButtons">
                  <button className="edit" data-testid="edit" onClick={() => editCard(index)}>
                    <RiEditFill size={64} />
                  </button>
                  <button className="delete" data-testid="delete" onClick={() => deleteCard(index)} >
                    <RiDeleteBin7Fill size={64} />
                  </button>
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
        title={title}
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
