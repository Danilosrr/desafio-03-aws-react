import "./Experiences.css";

export default function Experiences() {
  return (
    <section className="experienceSection" id="exp">
      <h2>Experiências</h2>
      <div className="carousel">
        {[0, 1, 2].map((x) => {
          return (
            <article className="card" key={x}>
              <h3>Dev junior na NASA</h3>
              <h4>Junho - 2002 - 2020</h4>
              <span>
                <b>Figma</b>
                <b>React</b>
                <b>Typescript</b>
              </span>
              <p>
                Um projetão fellas da minha cidade que é muito fellas, um
                projeto tão fellas que não deixa de ser fellas, um projetinho
                fellas feito pra ser fellas, agora continuarei escrevendo pra
                ocupar espaço.
              </p>
              <button>Ver repositório</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
