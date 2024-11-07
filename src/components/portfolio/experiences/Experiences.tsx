import { RiEditFill, RiDeleteBin7Fill, RiAddCircleLine } from "react-icons/ri";
import { useStorage } from "../../../contexts/storageContext";
import { Experience } from "../../../interfaces/search";
import "./Experiences.css";

const mock: Experience[] = [
  {
    title: "Dev junior na NASA 1",
    period: "Junho - 2002 - 2020",
    technologies: ["Figma", "React", "Typescript"],
    summary: `Um projetão fellas da minha cidade que é muito fellas, um projeto tão
      fellas que não deixa de ser fellas, um projetinho fellas feito pra ser
      fellas, agora continuarei escrevendo pra ocupar espaço.`,
    link: "url",
  },
  {
    title: "Dev junior na NASA 2",
    period: "Junho - 2002 - 2020",
    technologies: ["Figma", "React", "Typescript"],
    summary: `Um projetão fellas da minha cidade que é muito fellas, um projeto tão
      fellas que não deixa de ser fellas, um projetinho fellas feito pra ser
      fellas, agora continuarei escrevendo pra ocupar espaço.`,
    link: "",
  },
  {
    title: "Dev junior na NASA 3",
    period: "Junho - 2002 - 2020",
    technologies: ["Figma", "React", "Typescript"],
    summary: `Um projetão fellas da minha cidade que é muito fellas, um projeto tão
      fellas que não deixa de ser fellas, um projetinho fellas feito pra ser
      fellas, agora continuarei escrevendo pra ocupar espaço.`,
    link: "",
  }
];

export default function Experiences() {
  const { editable } = useStorage();

  const editCard = () => {
    console.log("edit");
  };

  const deleteCard = () => {
    console.log("delete");
  };

  return (
    <section className="experienceSection" id="exp">
      <h2>Experiências</h2>
      <div className="carousel">
        {mock.map(({ title, period, technologies, summary, link }) => {
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
                  <span className="edit">
                    <RiEditFill size={64} onClick={editCard} />
                  </span>
                  <span className="delete">
                    <RiDeleteBin7Fill size={64} onClick={deleteCard} />
                  </span>
                </div>
              )}
            </article>
          );
        })}
        {mock.length === 3 && editable && (
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
