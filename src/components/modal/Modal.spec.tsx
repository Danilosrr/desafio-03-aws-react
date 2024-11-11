import { render, screen, waitFor } from "@testing-library/react";
import { StorageContext } from "../../contexts/storageContext";
import { initialStorageContext } from "../../utils/testHelpers";
import Modal from "./Modal";

const initialModalProps = {
  uid: undefined,
  index: undefined,
  title: undefined,
  keys: [],
  setState: jest.fn(),
};

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
    waitFor(() =>
      renderComponent({ title: "custom", keys: [{ name: "summary" }] })
    );
    expect(
      screen.getByPlaceholderText("Descreva sua experiência")
    ).toBeInTheDocument();
  });

  it("should enable submit button", async () => {
    waitFor(() =>
      renderComponent({ keys: [{ name: "linkedin", required: false }] })
    );
    const button = screen.getByText("Salvar").closest("button");
    await waitFor(() => expect(button).toBeEnabled());
  });

  it("should disable submit button", async () => {
    waitFor(() =>
      renderComponent({ keys: [{ name: "linkedin", required: true }] })
    );
    const button = screen.getByText("Salvar").closest("button");
    await waitFor(() => expect(button).toBeDisabled());
  });
});
