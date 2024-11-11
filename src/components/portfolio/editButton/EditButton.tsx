import { IoMdCheckmark, IoMdCreate } from "react-icons/io";
import { useStorage } from "../../../contexts/storageContext";
import "./EditButton.css";

export default function EditButton() {
  const { editable, setEditable } = useStorage();
  const changeMode = () => {
    setEditable(!editable);
  };

  return (
    <figure className="editPageButton" onClick={changeMode}>
      {editable ? <IoMdCheckmark role="save" size={38} /> : <IoMdCreate role="edit" size={38} />}
    </figure>
  );
}

export function EditDot() {
  const { editable } = useStorage();
  if (editable) {
    return (
      <figure className="editDot">
        <IoMdCreate size={10} />
      </figure>
    );
  } else return <></>;
}
