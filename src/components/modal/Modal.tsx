import { useForm } from "react-hook-form";
import "./Modal.css";
import { useRef } from "react";

interface Props {
  isOpen: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  keys: { name: string; required: boolean }[];
  title?: string;
}

interface IModalInput {
  [name: string]: string;
}

export default function Modal({ isOpen, setState, keys, title }: Readonly<Props>) {
  const modalRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cancel = () => {
    setState(false);
  };

  const onSubmit = (data: IModalInput) => {
    console.log("submit", data);
  };

  const checkModal = (e: React.MouseEvent) => {
    if (!modalRef.current?.contains(e.target as HTMLDivElement)) cancel();
  };

  return isOpen ? (
    <div className="modal" onClick={checkModal}>
      <form ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
        {title && <h2>{title}</h2>}
        {keys.map(({ name, required }) => {
          return (
            <input
              placeholder={name}
              key={name}
              {...register(name, {
                value: "name",
                required: {
                  value: required,
                  message: `preencha o campo ${name}`,
                },
              })}
            />
          );
        })}
        <span className="modalButtons">
          <button
            type="submit"
            className="saveButton"
            disabled={!!Object.keys(errors).length}
          >
            Salvar
          </button>
          <button type="button" className="cancelButton" onClick={cancel}>
            Cancelar
          </button>
        </span>
      </form>
    </div>
  ) : (
    <></>
  );
}
