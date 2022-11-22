import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => {},
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() =>
      screen.getByText(`Loading error. Try refresh. Request failed`)
    );
  });
  const fireResize = (width: number) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  };
  const sidebarMenu = document.getElementsByClassName("sidebar");
  const burgerMenu = document.getElementsByClassName("bm-burger-button");

  test("hides side menu and shows burger menu when width is below 490px", async () => {
    act(() => fireResize(489));
    expect(sidebarMenu.length).toEqual(0);
    expect(burgerMenu.length).toBeGreaterThan(0);
  });

  test("hides burger menu and shows side menu when width is above 490px", () => {
    act(() => fireResize(591));
    expect(sidebarMenu.length).toBeGreaterThan(0);
    expect(burgerMenu.length).toEqual(0);
  });
});
