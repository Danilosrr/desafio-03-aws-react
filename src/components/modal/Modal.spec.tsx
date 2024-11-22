/* eslint-disable testing-library/no-unnecessary-act */
import {
  act,
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

const renderComponent = async (modal?: any, context?: Object) => {
  const props = { ...initialModalProps, ...modal };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () =>
    render(
      <StorageContext.Provider value={{ ...initialStorageContext, ...context }}>
        <Modal {...props} />
      </StorageContext.Provider>
    )
  );
};

describe("Modal", () => {
  it("should render Modal", async () => {
    await renderComponent();
    expect(screen.getByText("Adicionar Link")).toBeInTheDocument();
  });

  it("should render Custom Modal", async () => {
    await renderComponent({ title: "custom" });
    expect(screen.getByText("custom")).toBeInTheDocument();
  });

  it("should render input", async () => {
    await renderComponent({ title: "custom", keys: [{ name: "summary" }] });
    expect(
      screen.getByPlaceholderText("Descreva sua experiência")
    ).toBeInTheDocument();
  });

  it("should enable submit button", async () => {
    await renderComponent({ keys: [{ name: "linkedin", required: false }] });
    const button = screen.getByText("Salvar");
    expect(button).toBeEnabled();
  });

  it("should disable submit button", async () => {
    await renderComponent({ keys: [{ name: "linkedin", required: true }] });
    const button = screen.getByText("Salvar");
    await waitFor(() => expect(button).toBeDisabled());
  });

  it("should call cancel event on backdrop", async () => {
    await renderComponent({ keys: [{ name: "linkedin", required: false }] });
    const backDrop = screen.getByTestId("backdrop");
    fireEvent.click(backDrop);
    expect(initialModalProps.setState).toBeCalled();
  });

  it("should call 'experience modal' submit event", async () => {
    await renderComponent(
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
    );

    const button = screen.getByText("Salvar");
    fireEvent.click(button);
    await waitFor(() =>
      expect(initialStorageContext.editUserExperience).toBeCalled()
    );
  });

  it("should call cancel event on cancel button", async () => {
    await renderComponent({ keys: [{ name: "linkedin", required: false }] });
    const button = screen.getByText("Cancelar");
    fireEvent.click(button);
    expect(initialModalProps.setState).toBeCalled();
  });

  it("should call 'link modal' submit event", async () => {
    await renderComponent(
      { uid: "1", keys: [{ name: "linkedin", required: false }] },
      { getUserData: () => ({ ...storedUser }) }
    );

    const button = screen.getByText("Salvar");
    fireEvent.click(button);
    await waitFor(() =>
      expect(initialStorageContext.editUserData).toBeCalled()
    );
  });
});
