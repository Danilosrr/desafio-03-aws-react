import About from "./About";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StorageContext } from "../../../contexts/storageContext";
import { MemoryRouter, Route, Routes } from "react-router";
import { GithubUserData } from "../../../interfaces/github";
import { openInNewTab } from "../../../utils/generics";
import {
  gitUser,
  initialStorageContext,
  storedUser,
} from "../../../utils/testHelpers";

jest.mock("../../../utils/generics", () => ({
  openInNewTab: jest.fn(),
}));

const renderComponent = (data: GithubUserData | null, context?: Object) => {
  render(
    <StorageContext.Provider value={{ ...initialStorageContext, ...context }}>
      <MemoryRouter initialEntries={["/portfolio/1"]}>
        <Routes>
          <Route path="/portfolio/:uid" element={<About gitUser={data} />} />
        </Routes>
      </MemoryRouter>
    </StorageContext.Provider>
  );
};

describe("AboutSection without storedUser", () => {
  it("should render image", () => {
    renderComponent(gitUser, { getUserData: jest.fn() });
    expect(screen.getByAltText("user")).toBeTruthy();
  });

  it("should render location", () => {
    renderComponent(gitUser);
    expect(screen.getByText(gitUser.location)).toBeInTheDocument();
  });

  it("should render github user", () => {
    renderComponent(gitUser);
    expect(screen.getByText(gitUser.login)).toBeInTheDocument();
  });

  it("should render github button", () => {
    renderComponent(gitUser);
    expect(screen.getByText("Github").closest("button")).toBeEnabled();
  });

  it("should call github button event", () => {
    renderComponent(gitUser);
    const button = screen.getByText("Github");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should not render linkedin button", () => {
    renderComponent(gitUser);
    expect(() => screen.getByText("LinkedIn")).toThrow();
  });

  it("should not render email", () => {
    renderComponent(gitUser);
    expect(() => screen.getByText("email@email.com")).toThrow();
  });

  it("should disable textarea", () => {
    renderComponent(gitUser);
    expect(
      screen.getByPlaceholderText("Não há nenhuma história pra contar!")
    ).not.toBeEnabled();
  });
});

describe("AboutSection with storedUser", () => {
  it("should render linkedin button", () => {
    renderComponent(gitUser, { getUserData: () => storedUser });
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("should call linkedin button event", () => {
    renderComponent(gitUser, { getUserData: () => storedUser });
    const button = screen.getByText("LinkedIn");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should render email", () => {
    renderComponent(gitUser, { getUserData: () => storedUser });
    expect(screen.getByText("email@email.com")).toBeInTheDocument();
  });

  it("should render name", () => {
    renderComponent(gitUser, { getUserData: () => storedUser });
    expect(screen.getByText("storedName")).toBeInTheDocument();
  });

  it("should render pitch", () => {
    renderComponent(gitUser, { getUserData: () => storedUser });
    expect(screen.getByText("pitch")).toBeInTheDocument();
  });

  it("should render bio", () => {
    renderComponent(gitUser, { getUserData: () => storedUser });
    expect(screen.getByText("bio")).toBeInTheDocument();
  });
});

describe("AboutSection editable", () => {
  it("should render modal", async () => {
    renderComponent(gitUser, { editable: true, getUserData: () => storedUser });
    const button = screen.getByText("LinkedIn");
    await waitFor(() => fireEvent.click(button));
    expect(screen.getByText("Adicionar Link")).toBeInTheDocument();
  });

  it("should enable textarea", () => {
    renderComponent(gitUser, { editable: true });
    expect(screen.getByPlaceholderText("Adicione sua história")).toBeEnabled();
  });

  it("should call input onChange event", async () => {
    renderComponent(gitUser, { editable: true, getUserData: () => storedUser });
    const input = screen.getByRole("textbox", { name: "name" });
    fireEvent.change(input, { target: { value: "text" } });
    await waitFor(() => {
      expect(input).toHaveValue("text");
    });
  });

  it("should call textarea onChange event", async () => {
    renderComponent(gitUser, { editable: true, getUserData: () => storedUser });
    const textarea = screen.getByPlaceholderText("Adicione sua história");
    fireEvent.change(textarea, { target: { value: "text" } });
    await waitFor(() => {
      expect(textarea).toHaveValue("text");
    });
  });
});
