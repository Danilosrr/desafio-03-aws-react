import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { StorageContext } from "../../contexts/storageContext";
import {
  experience,
  initialModalProps,
  initialStorageContext,
  storedUser,
} from "../../utils/testHelpers";
import Modal from "./Modal";

const renderComponent = (modal?: any, context?: Object) => {
  const props = { ...initialModalProps, ...modal };
  render(
    <StorageContext.Provider value={{ ...initialStorageContext, ...context }}>
      <Modal {...props} />
    </StorageContext.Provider>
  );
};

describe("Modal", () => {
  it("should render Modal", async () => {
    waitFor(() => renderComponent());
    expect(screen.getByText("Adicionar Link")).toBeInTheDocument();
  });

  it("should render Custom Modal", () => {
    waitFor(() => renderComponent({ title: "custom" }));
    expect(screen.getByText("custom")).toBeInTheDocument();
  });

  it("should render input", () => {
    renderComponent({ title: "custom", keys: [{ name: "summary" }] });
    expect(
      screen.getByPlaceholderText("Descreva sua experiência")
    ).toBeInTheDocument();
  });

  it("should enable submit button", async () => {
    await waitFor(() =>
      renderComponent({ keys: [{ name: "linkedin", required: false }] })
    );
    const button = screen.getByText("Salvar").closest("button");
    expect(button).toBeEnabled();
  });

  it("should disable submit button", async () => {
    await waitFor(() =>
      renderComponent({ keys: [{ name: "linkedin", required: true }] })
    );
    const button = screen.getByText("Salvar");
    expect(button).toBeDisabled();
  });

  it("should call cancel event on backdrop", async () => {
    renderComponent({ keys: [{ name: "linkedin", required: false }] });
    const backDrop = screen.getByText("Salvar").closest("main");
    fireEvent.click(backDrop as HTMLElement);
    expect(initialModalProps.setState).toBeCalled();
  });

  it("should call 'experience modal' submit event", async () => {
    await waitFor(() =>
      renderComponent(
        {
          uid: "1",
          index: 0,
          keys: [
            { name: "title", required: true },
            { name: "period", required: true },
            { name: "technologies", required: true },
            { name: "summary", required: true },
            { name: "link", required: false },
          ],
        },
        { getUserData: () => ({ ...storedUser, experiences: [experience] }) }
      )
    );

    const button = screen.getByText("Salvar").closest("button");
    fireEvent.click(button as HTMLButtonElement);
    await waitFor(() =>
      expect(initialStorageContext.editUserExperience).toBeCalled()
    );
  });

  it("should call cancel event on cancel button", async () => {
    renderComponent({ keys: [{ name: "linkedin", required: false }] });
    const button = screen.getByText("Cancelar").closest("button");
    fireEvent.click(button as HTMLElement);
    expect(initialModalProps.setState).toBeCalled();
  });

  it("should call 'link modal' submit event", async () => {
    await waitFor(() =>
      renderComponent(
        { uid: "1", keys: [{ name: "linkedin", required: false }] },
        { getUserData: () => ({ ...storedUser }) }
      )
    );

    const button = screen.getByText("Salvar").closest("button");
    fireEvent.click(button as HTMLButtonElement);
    await waitFor(() =>
      expect(initialStorageContext.editUserData).toBeCalled()
    );
  });
});
