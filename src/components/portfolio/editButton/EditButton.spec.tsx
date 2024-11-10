import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StorageContext } from "../../../contexts/storageContext";
import EditButton, { EditDot } from "./EditButton";
import { ReactNode } from "react";
import { initialStorageContext } from "../../../utils/testHelpers";

const renderComponent = (Children: ReactNode, context?: Object) => {
  render(
    <StorageContext.Provider value={{ ...initialStorageContext, ...context }}>
      {Children}
    </StorageContext.Provider>
  );
};

describe("EditButton", () => {
  it("should render checkmark icon", () => {
    renderComponent(<EditButton />, { editable: true });
    expect(screen.getByRole("save")).toBeInTheDocument();
  });

  it("should render edit icon", () => {
    renderComponent(<EditButton />, { editable: false });
    expect(screen.getByRole("edit")).toBeInTheDocument();
  });

  it("should hide edit icon", async () => {
    renderComponent(<EditButton />, { editable: true });
    const button = screen.getByRole("figure");
    await waitFor(() => fireEvent.click(button));
    expect(initialStorageContext.setEditable).toBeCalled();
  });
});

describe("EditDot", () => {
  it("should render", () => {
    renderComponent(<EditDot />, { editable: true });
    expect(screen.queryByRole("figure")).toBeInTheDocument();
  });

  it("should not render", () => {
    renderComponent(<EditDot />, { editable: false });
    expect(screen.queryByRole("figure")).not.toBeInTheDocument();
  });
});
