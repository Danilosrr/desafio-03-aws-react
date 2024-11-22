/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import { AuthContext } from "../../contexts/authContext";
import { StorageContext } from "../../contexts/storageContext";
import {
  initialAuthContext,
  initialStorageContext,
  storedUser,
} from "../../utils/testHelpers";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const renderComponent = (authContext?: Object, storageContext?: Object) => {
  render(
    <AuthContext.Provider value={{ ...initialAuthContext, ...authContext }}>
      <StorageContext.Provider
        value={{ ...initialStorageContext, ...storageContext }}
      >
        <Search />
      </StorageContext.Provider>
    </AuthContext.Provider>
  );
};

describe("Search", () => {
  it("should render component", () => {
    renderComponent();
    expect(
      screen.getByText("Digite o nome do usuário que deseja buscar")
    ).toBeInTheDocument();
  });

  it("should call signIn event", async () => {
    renderComponent({ signInGithub:()=>initialAuthContext.currentUser },{ userData: [storedUser] });
    const button = screen.getAllByRole("button")[1];
    await act( async () => fireEvent.click(button));
    expect(initialStorageContext.addUserData).toBeCalled();
  });

  it("should call search event", async () => {
    renderComponent({ signInGithub:()=>initialAuthContext.currentUser },{ userData: [storedUser] });

    const input = screen.getByRole("textbox");
    const button = screen.getAllByRole("button")[0];
    await act( async () => {
        fireEvent.change(input, { target: { value: storedUser.name } })
    });
    await act( async () => {
        fireEvent.click(button)
    });
    expect(screen.getByText( storedUser.name)).toBeInTheDocument();
  });
});
