import { useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import "./About.css";

export default function About() {
  const { currentUser } = useAuth();

  useEffect(()=>{
    
  }, [])
  return (
    <section className="aboutSection">
      <article>image</article>
      <aside className="aboutPitch">
        {currentUser && <h2>Hello, I'm <b>{currentUser.displayName}</b></h2>}
      </aside>
    </section>
  );
}
