import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { IoMdPin } from "react-icons/io";
import "./Footer.css";
import { EditDot } from "../editButton/EditButton";
import { useStorage } from "../../../contexts/storageContext";

interface Props {
  email?: string
}

export default function Footer({email}:Readonly<Props>) {
  const { editable } = useStorage();
  
  const showEmail = (email || editable)
  
  return (
    <section className="contactSection" id="contact">
      {showEmail && (
        <article className="email">
          <b>Sinta-se livre para me contatar a qualquer momento!</b>
          {editable?<input value={email}/>:<h5>{email}</h5>}
        </article>
      )}
      <article className="socials">
        <b>Assim que possível, me envie um email para que possamos trabalhar felizes juntos!</b>
        <div className="buttonGroup">
          <figure className="circle">
            <EditDot/>
            <BsInstagram size={22}/>
          </figure>
          <figure className="circle">
            <EditDot/>
            <BsFacebook size={22}/>
          </figure>
          <figure className="circle">
            <EditDot/>
            <BsTwitter size={22}/>
          </figure>
          <figure className="circle">
            <EditDot/>
            <BsYoutube size={22}/>
          </figure>
        </div>
      </article>
      <footer className="copyrightNotice">
        <span><IoMdPin />Brasil</span>
        <p>© 2024, All Rights By Compass UOL</p>
      </footer>
    </section>
  );
}
