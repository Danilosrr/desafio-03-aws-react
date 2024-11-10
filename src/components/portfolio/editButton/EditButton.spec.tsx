import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  IStorageContext,
  StorageContext,
} from "../../../contexts/storageContext";
import EditButton, { EditDot } from "./EditButton";
import { ReactNode } from "react";

const initialContext: IStorageContext = {
  userData: [],
  editable: false,
  addUserData: jest.fn(),
  getUserData: jest.fn(),
  editUserData: jest.fn(),
  editUserExperience: jest.fn(),
  deleteUserExperience: jest.fn(),
  setEditable: jest.fn(),
};

const renderComponent = (Children: ReactNode, context?: Object) => {
  render(
    <StorageContext.Provider value={{ ...initialContext, ...context }}>
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
    await waitFor(()=> fireEvent.click(button))
    expect(initialContext.setEditable).toBeCalled();
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
