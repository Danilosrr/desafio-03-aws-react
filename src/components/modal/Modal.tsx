import { useForm } from "react-hook-form";
import { useRef } from "react";
import "./Modal.css";
import { enumKeys } from "../../interfaces/search";

interface Props {
  isOpen: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  keys: { name: enumKeys; required: boolean }[];
  title?: string;
}

interface IModalInput {
  [name: string]: string;
}

const placeholders= {
  title:'Título',
  period: 'Período de atuação',
  technologies: 'Habilidades (separe-as por vírgula)',
  summary: 'Descreva sua experiência',
  link: 'Link do repositório (Opcional)',
  linkedin: 'Digite a URL',
  youtube: 'Digite a URL',
  twitter: 'Digite a URL',
  instagram: 'Digite a URL',
  facebook: 'Digite a URL',
}

export default function Modal({ isOpen, setState, keys, title }: Readonly<Props>) {
  const modalRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
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
              placeholder={placeholders[name]}
              key={name}
              {...register(name, {
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
            disabled={!isValid}
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
