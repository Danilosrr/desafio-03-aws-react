import Footer from "./Footer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StorageContext } from "../../../contexts/storageContext";
import { initialStorageContext, storedUser } from "../../../utils/testHelpers";
import { openInNewTab } from "../../../utils/generics";

jest.mock("../../../utils/generics", () => ({
  openInNewTab: jest.fn(),
}));

const renderComponent = (uid?: string, context?: Object) => {
  render(
    <StorageContext.Provider value={{ ...initialStorageContext, ...context }}>
      <Footer uid={uid ?? undefined} />
    </StorageContext.Provider>
  );
};

describe("Footer Email Section", () => {
  it("should render email", () => {
    renderComponent("1", { getUserData: () => storedUser });
    expect(screen.getByText(storedUser.email)).toBeInTheDocument();
  });

  it("should edit email", async () => {
    renderComponent("1", { editable: true, getUserData: () => storedUser });
    const input = screen.getByRole("textbox", { name: "email" });
    fireEvent.change(input, { target: { value: "changedEmail@email.com" } });

    await waitFor(() => {
      expect(input).toHaveValue("changedEmail@email.com");
    });
  });
});

describe("Footer midia Section", () => {
  it("should call youtube redirect event", () => {
    renderComponent("1", { getUserData: () => storedUser });
    const button = screen.getByAltText("youtube");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should call twitter redirect event", () => {
    renderComponent("1", { getUserData: () => storedUser });
    const button = screen.getByAltText("twitter");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should call facebook redirect event", () => {
    renderComponent("1", { getUserData: () => storedUser });
    const button = screen.getByAltText("facebook");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should call instagram redirect event", () => {
    renderComponent("1", { getUserData: () => storedUser });
    const button = screen.getByAltText("instagram");
    fireEvent.click(button);
    expect(openInNewTab).toBeCalled();
  });

  it("should not call redirect event", async () => {
    renderComponent("1", { editable: true, getUserData: () => storedUser });
    const button = screen.getByAltText("youtube");
    fireEvent.click(button);
    await waitFor(() => {
      expect(openInNewTab).not.toBeCalled();
    });
  });
});
