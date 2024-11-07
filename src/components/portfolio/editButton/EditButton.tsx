import { IoMdCheckmark, IoMdCreate } from "react-icons/io";
import { useState } from "react";
import "./EditButton.css";

export default function EditButton() {
  const [edit, setEdit] = useState<boolean>(false);

  const changeMode = () => {
    setEdit(!edit);
  };

  return (
    <figure className="editPageButton" onClick={changeMode}>
      {edit ? <IoMdCreate size={40} /> : <IoMdCheckmark size={40} />}
    </figure>
  );
}
