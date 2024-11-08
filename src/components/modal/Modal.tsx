import { useForm } from "react-hook-form";
import { useRef } from "react";
import "./Modal.css";
import { enumSocials } from "../../interfaces/search";
import { useStorage } from "../../contexts/storageContext";

interface Props {
  uid?: string;
  isOpen: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  keys: { name: enumSocials; required: boolean }[];
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

export default function Modal({ uid, isOpen, setState, keys }: Readonly<Props>) {
  const modalRef = useRef<HTMLFormElement>(null);
  const { getUserData,editUserData} = useStorage();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  
  const cancel = () => {
    reset();
    setState(false);
  };

  const onSubmit = (data: IModalInput) => {
    if (uid) {
      editUserData(uid,data);
      setState(false);
    }
  };

  const checkModal = (e: React.MouseEvent) => {
    if (!modalRef.current?.contains(e.target as HTMLDivElement)) cancel();
  };

  return isOpen ? (
    <div className="modal" onClick={checkModal}>
      <form ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
        <h2>Adicionar Link</h2>
        {keys.map(({ name, required }) => {
          const input = uid && getUserData(uid)[name]
          return (
            <input
              defaultValue={input}
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
