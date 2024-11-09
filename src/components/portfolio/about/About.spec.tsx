import About from "./About";
import { render, screen } from "@testing-library/react";
import { IStorageContext, StorageContext } from "../../../contexts/storageContext";
import { BrowserRouter } from "react-router-dom";
import { GithubUserData } from "../../../interfaces/github";

const gitUser = {
  name: "john Doe",
  avatar_url: "avatarUrl",
  bio: "John Doe Bio",
  email: "email@email.com",
  id: 1,
  location: "location",
  login: "johnDoeLogin",
};


const renderComponent = (data: GithubUserData | null, contextProps?:Object) => {
  render(
    <StorageContext.Provider value={contextProps as IStorageContext || ({} as IStorageContext)}>
      <BrowserRouter>
        <About gitUser={data} />
      </BrowserRouter>
    </StorageContext.Provider>
  );
};

describe("AboutSection", () => {
  it("should render image", () => {
    renderComponent(gitUser);
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

  it("should not render linkedin button", () => {
    renderComponent(gitUser);
    expect(() => screen.getByText("LinkedIn")).toThrow();
  });
});

describe("AboutSection Editable", () => {
  it("should render linkedin button", async () => {
    renderComponent(gitUser,{editable:true});
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });
});
