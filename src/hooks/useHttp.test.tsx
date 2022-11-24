import { renderHook, waitFor } from "@testing-library/react";
import useHttp from "./useHttp";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

const DUMMY_RESPONSE_OBJECT = {
  id: 1,
  name: "some name",
  value: 25,
};

describe("useHttp, ", () => {
  test("returns expected data on success fetch", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(DUMMY_RESPONSE_OBJECT),
      })
    ) as jest.Mock;
    const { result } = renderHook(useHttp);
    await act(async () => {
      const response = await result.current.sendRequest({
        url: `dummy.json`,
      });
      expect(response).toMatchObject(DUMMY_RESPONSE_OBJECT);
      expect(result.current.error).toBe(null);
      expect(result.current.isLoading).toBe(false);
    });
  });
  test("applies fetched data to provided function", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(DUMMY_RESPONSE_OBJECT),
      })
    ) as jest.Mock;
    const { result } = renderHook(useHttp);
    let temp: {}[];
    const createArrayFromObject = (arg: {}) => {
      temp = [arg, arg];
    };
    await act(async () => {
      result.current.sendRequest(
        {
          url: `dummy.json`,
        },
        createArrayFromObject
      );
    });
    const expectedResult = [DUMMY_RESPONSE_OBJECT, DUMMY_RESPONSE_OBJECT];
    await waitFor(() => {
      expect(temp).toMatchObject(expectedResult);
    });
  });
  test("returns 'Request failed' when response.ok: false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(DUMMY_RESPONSE_OBJECT),
      })
    ) as jest.Mock;
    const { result } = renderHook(useHttp);
    await act(async () => {
      const response = await result.current.sendRequest({
        url: `dummy.json`,
      });
      await waitFor(() => {
        expect(response).toBe("Request failed");
      });
    });
  });

  test("sets isLoading: true when sendRequest is called with no body argument", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(DUMMY_RESPONSE_OBJECT),
      })
    ) as jest.Mock;
    const delayFunction = (arg: any) => {
      setTimeout(() => {
        console.log(arg);
      }, 100);
    };
    const { result } = renderHook(useHttp);
    act(() => {
      result.current.sendRequest(
        {
          url: `dummy.json`,
        },
        delayFunction
      );
    });
    expect(result.current.isLoading).toBe(true);
  });

  test("sets error message when fetch is failed", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(DUMMY_RESPONSE_OBJECT),
      })
    ) as jest.Mock;
    const { result } = renderHook(useHttp);
    await act(async () => {
      await result.current.sendRequest({
        url: `dummy.json`,
      });
    });
    await waitFor(() => {
      expect(result.current.error).toBe("Something went wrong.");
    });
  });
});
