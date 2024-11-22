import { act, fireEvent, render, screen } from "@testing-library/react";
import { StorageContext } from "../../../contexts/storageContext";
import {
  initialAuthContext,
  initialStorageContext,
} from "../../../utils/testHelpers";
import NavBar from "./NavBar";
import { AuthContext } from "../../../contexts/authContext";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

const renderComponent = (userContext?: Object, storageContext?: Object) => {
  render(
    <AuthContext.Provider value={{ ...initialAuthContext, ...userContext }}>
      <StorageContext.Provider value={{ ...initialStorageContext, ...storageContext }}>
          <NavBar />
      </StorageContext.Provider>
    </AuthContext.Provider>
  );
};

describe("NavBar logged", () => {
  it("should render component", () => {
    renderComponent();
    expect(screen.getByText("Início")).toBeInTheDocument();
  });

  it("should render user image", () => {
    renderComponent();
    expect(screen.getByTestId("figure")).toBeInTheDocument();
  });

  it("should not render user image", () => {
    renderComponent({ currentUser: { photoURL: null } });
    const img = screen.queryByTestId("figure");
    expect(img).toHaveAttribute("src","");
  });

  it("should call logOut event", async () => {
    renderComponent();
    const button = screen.getByText("Sair");
    fireEvent.click(button);
    expect(initialAuthContext.signOutGithub).toBeCalled();
  });
});

describe("NavBar not logged", () => {
  jest.spyOn(localStorage, 'setItem');

  it("should render component", () => {
    renderComponent({ currentUser: null });
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("should call logIn event", async () => {
    renderComponent({ currentUser: null, signInGithub:()=>initialAuthContext.currentUser});
    const button = screen.getByText("Entrar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => fireEvent.click(button) );
    expect(localStorage.getItem("desafio-03")).toEqual("[{\"name\":\"John Doe\",\"uid\":1}]");
  });

  it("should call logIn event for another user", async () => {
    renderComponent({ currentUser: null, signInGithub:()=>({...initialAuthContext.currentUser, displayName:"not John Doe"})});
    const button = screen.getByText("Entrar");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => fireEvent.click(button) );
    expect(localStorage.getItem("desafio-03")).toEqual("[{\"name\":\"John Doe\",\"uid\":1},{\"name\":\"not John Doe\",\"uid\":1}]");
  });

  beforeAll(()=>{
    window.localStorage.clear();
  })
});
