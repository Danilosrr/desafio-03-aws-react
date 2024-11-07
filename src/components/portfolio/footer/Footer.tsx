import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { IoMdPin } from "react-icons/io";
import { EditDot } from "../editButton/EditButton";
import Modal from "../../modal/Modal";
import { useState } from "react";
import { enumKeys } from "../../../interfaces/search";
import "./Footer.css";

type socialMedias = "linkedin" | "youtube" | "twitter" | "instagram" | "facebook";

export default function Footer() {
  const [modal, setModal] = useState<boolean>(false);
  const [socialMedia, setSocialMedia] = useState<socialMedias>("linkedin");

  const email = "danilo_srr@hotmail.com";

  const handleClick = (socialMedia:socialMedias) => {
    setSocialMedia(socialMedia);
    setModal(true);  
  }

  return (
    <section className="contactSection" id="contact">
      {email && (
        <article className="email">
          <b>Sinta-se livre para me contatar a qualquer momento!</b>
          <h5>{email}</h5>
        </article>
      )}
      <article className="socials">
        <b>Assim que possível, me envie um email para que possamos trabalhar felizes juntos!</b>
        <div className="buttonGroup">
          <figure className="circle" onClick={()=>handleClick('instagram')}>
            <EditDot/>
            <BsInstagram size={22}/>
          </figure>
          <figure className="circle" onClick={()=>handleClick('facebook')}>
            <EditDot/>
            <BsFacebook size={22}/>
          </figure>
          <figure className="circle" onClick={()=>handleClick('twitter')}>
            <EditDot/>
            <BsTwitter size={22}/>
          </figure>
          <figure className="circle" onClick={()=>handleClick('youtube')}>
            <EditDot/>
            <BsYoutube size={22}/>
          </figure>
        </div>
      </article>
      <footer className="copyrightNotice">
        <span><IoMdPin />Brasil</span>
        <p>© 2024, All Rights By Compass UOL</p>
      </footer>
      <Modal title={`Adicionar ${socialMedia}`} isOpen={modal} setState={setModal} keys={[{name: socialMedia, required:true}]}/>
    </section>
  );
}
