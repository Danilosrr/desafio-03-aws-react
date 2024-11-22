import { useForm } from "react-hook-form";
import { useRef } from "react";
import "./Modal.css";
import { enumSocials, enumExperience } from "../../interfaces/search";
import { useStorage } from "../../contexts/storageContext";

interface Props {
  uid?: string;
  index?: number;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  keys: { name: enumSocials | enumExperience; required: boolean }[];
  title?: string;
}

interface IModalInput {
  [name: string]: string;
}

const placeholders = {
  title: "Título",
  period: "Período de atuação",
  technologies: "Habilidades (separe-as por vírgula)",
  summary: "Descreva sua experiência",
  link: "Link do repositório (Opcional)",
  linkedin: "Digite a URL",
  youtube: "Digite a URL",
  twitter: "Digite a URL",
  instagram: "Digite a URL",
  facebook: "Digite a URL",
};

export default function Modal({
  uid,
  index,
  setState,
  keys,
  title,
}: Readonly<Props>) {
  const modalRef = useRef<HTMLFormElement>(null);
  const { getUserData, editUserData, editUserExperience } = useStorage();

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
      if (typeof index === "number") {
        editUserExperience(uid, index, data);
      } else {
        editUserData(uid, data);
      }
      setState(false);
    }
  };

  const checkModal = (e: React.MouseEvent) => {
    if (!modalRef.current?.contains(e.target as HTMLDivElement)) cancel();
  };

  return (
    <main className="modal" data-testid="backdrop" onClick={checkModal}>
      <form ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
        {title ? <h2>{title}</h2> : <h2>Adicionar Link</h2>}
        {typeof index === "number"
          ? keys.map(({ name, required }) => {
              const edit = uid && !!getUserData(uid).experiences[index];
              const input = edit
                ? getUserData(uid).experiences[index][name as enumExperience]
                : "";

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
            })
          : keys.map(({ name, required }) => {
              const input = uid && getUserData(uid)[name as enumSocials];
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
          <button type="submit" className="saveButton" disabled={!isValid}>
            Salvar
          </button>
          <button type="button" className="cancelButton" onClick={cancel}>
            Cancelar
          </button>
        </span>
      </form>
    </main>
  );
}
