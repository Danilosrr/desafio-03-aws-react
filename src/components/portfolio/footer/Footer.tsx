import { IoMdPin } from "react-icons/io";
import "./Footer.css";
import { EditDot } from "../editButton/EditButton";
import { useStorage } from "../../../contexts/storageContext";
import { useState } from "react";
import Modal from "../../modal/Modal";
import { openInNewTab } from "../../../utils/generics";
import facebook from "../../../assets/img/facebook.png";
import instagram from "../../../assets/img/instagram.png";
import twitter from "../../../assets/img/twitter.png";
import youtube from "../../../assets/img/youtube.png";

type socialMedias =
  | "linkedin"
  | "youtube"
  | "twitter"
  | "instagram"
  | "facebook";

interface Props {
  uid: string | undefined;
}

export default function Footer({ uid }: Readonly<Props>) {
  const [modal, setModal] = useState<boolean>(false);
  const [socialMedia, setSocialMedia] = useState<socialMedias>("linkedin");
  const { editable, editUserData, getUserData } = useStorage();

  const saveInput = (e: React.ChangeEvent) => {
    if (uid) {
      const { name, value } = e.target as HTMLInputElement;
      editUserData(uid, { [name]: value });
    }
  };

  const handleClick = (socialMedia: socialMedias) => {
    if (editable) {
      setSocialMedia(socialMedia);
      setModal(true);
    } else if (uid && getUserData(uid)[socialMedia]) {
      openInNewTab(getUserData(uid)[socialMedia]);
    }
  };

  const storedUser = uid ? getUserData(uid) : undefined;

  return (
    <section className="contactSection" id="contact">
      {(storedUser?.email || editable) && (
        <article className="email">
          <b>Sinta-se livre para me contatar a qualquer momento!</b>
          { editable ? <input name="email" aria-label="email" onChange={saveInput} defaultValue={storedUser?.email}/>:<h4>{storedUser?.email}</h4> }
        </article>
      )}
      <article className="socials">
        <b>
          Assim que possível, me envie um email para que possamos trabalhar
          felizes juntos!
        </b>
        <div className="buttonGroup">
          <figure className="circle" onClick={() => handleClick("instagram")}>
            <EditDot />
            <img src={instagram} alt="instagram"/>
          </figure>
          <figure className="circle" onClick={() => handleClick("facebook")}>
            <EditDot />
            <img src={facebook} alt="facebook"/>
          </figure>
          <figure className="circle" onClick={() => handleClick("twitter")}>
            <EditDot />
            <img src={twitter} alt="twitter"/>
          </figure>
          <figure className="circle" onClick={() => handleClick("youtube")}>
            <EditDot />
            <img src={youtube} alt="youtube"/>
          </figure>
        </div>
      </article>
      <footer className="copyrightNotice">
        <span>
          <IoMdPin />
          Brasil
        </span>
        <p>© 2024, All Rights By Compass UOL</p>
      </footer>
      {modal && (
        <Modal
          uid={uid}
          setState={setModal}
          keys={[{ name: socialMedia, required: false }]}
        />
      )}
    </section>
  );
}
