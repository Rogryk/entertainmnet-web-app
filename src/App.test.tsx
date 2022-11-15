import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  test("hides side menu and shows burger menu when width is below 490px", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const fireResize = (width: number) => {
      window.innerWidth = width;
      window.dispatchEvent(new Event("resize"));
    };

    act(() => fireResize(489));
    const sidebarMenu = container.getElementsByClassName("sidebar");
    const burgerMenu = container.getElementsByClassName("bm-burger-button");
    expect(sidebarMenu.length).toEqual(0);
    expect(burgerMenu.length).toBeGreaterThan(0);
  });

  test("hides burger menu and shows side menu when width is above 490px", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const fireResize = (width: number) => {
      window.innerWidth = width;
      window.dispatchEvent(new Event("resize"));
    };

    act(() => fireResize(591));
    const sidebarMenu = container.getElementsByClassName("sidebar");
    const burgerMenu = container.getElementsByClassName("bm-burger-button");
    expect(sidebarMenu.length).toBeGreaterThan(0);
    expect(burgerMenu.length).toEqual(0);
  });
});
