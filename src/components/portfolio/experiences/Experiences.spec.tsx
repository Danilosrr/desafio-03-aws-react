import Experiences from "./Experiences";
import { experience, initialStorageContext, storedUser } from "../../../utils/testHelpers";
import { StorageContext } from "../../../contexts/storageContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Experience } from "../../../interfaces/search";
import { openInNewTab } from "../../../utils/generics";

jest.mock("../../../utils/generics", () => ({
  openInNewTab: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ uid: 1 }),
}));

const renderComponent = (array: Experience[], context?: Object) => {
  render(
    <StorageContext.Provider value={{ ...initialStorageContext, ...context }}>
      <Experiences data={array} />
    </StorageContext.Provider>
  );
};

describe("experienceSection with data", () => {
  it("should render title", () => {
    renderComponent([experience]);
    expect(screen.getByText(experience.title)).toBeInTheDocument();
  });
  it("should render title", () => {
    renderComponent([experience]);
    expect(screen.getByText(experience.title)).toBeInTheDocument();
  });

  it("should render technologies", () => {
    renderComponent([experience]);
    expect(
      screen.getByText(experience.technologies.split(",")[0])
    ).toBeInTheDocument();
  });

  it("should render summary", () => {
    renderComponent([experience]);
    expect(screen.getByText(experience.summary)).toBeInTheDocument();
  });

  it("should render link button", () => {
    renderComponent([experience]);
    expect(screen.getByText("Ver repositório")).toBeInTheDocument();
  });

  it("should call link button event", () => {
    renderComponent([experience]);
    const button = screen.getByText("Ver repositório");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should render edit button on hover", () => {
    renderComponent([experience], { editable: true });
    expect(screen.getByRole("edit")).toBeInTheDocument();
  });

  it("should call edit button event", async () => {
    renderComponent([experience], { editable: true, getUserData: () => storedUser });
    const button = screen.getByRole("edit");
    await waitFor(()=>fireEvent.click(button));
    expect(screen.getByText("Editar card")).toBeInTheDocument();
  });

  it("should render delete button on hover", () => {
    renderComponent([experience], { editable: true });
    expect(screen.getByRole("delete")).toBeInTheDocument();
  });

  it("should call delete button event", async () => {
    renderComponent([experience], { editable: true, getUserData: () => storedUser });
    const button = screen.getByRole("delete");
    await waitFor(()=>fireEvent.click(button));
    expect(initialStorageContext.deleteUserExperience).toBeCalled();
  });
});

describe("experienceSection with no data", () => {
  it("should render empty warning", () => {
    renderComponent([]);
    expect(screen.getByText("Não há nada por aqui!")).toBeInTheDocument();
  });

  it("should render addCard button", () => {
    renderComponent([], { editable: true });
    expect(screen.getByText("Adicionar card")).toBeInTheDocument();
  });


  it("should call addCard event", async () => {
    renderComponent([experience], { editable: true, getUserData: () => storedUser });
    const button = screen.getByText("Adicionar card");
    await waitFor(()=>fireEvent.click(button));
    expect(screen.getAllByText("Adicionar card").length).toBe(2);
  });
});
