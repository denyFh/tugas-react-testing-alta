import { act, renderHook } from "@testing-library/react-hooks";
import { useInputValue } from "./useInputValue";

describe("when rendered", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it("return current initial value", () => {
        const { result } = renderHook(() =>
            useInputValue("Gas Coba")
        );

        expect(result.current.value).toEqual("Gas Coba")
    });

    it("changes the value and return the value", () => {
        const { result } = renderHook(() =>
            useInputValue("Gas Coba Lagi")
        );

        act(() => result.current.onChange({target: {value: "Coba Ulang"}}));
        expect(result.current.value).toEqual("Coba Ulang");
    });

    it("it re-rendered with another initial value and updates the value", () => {
        const { result, rerender } = renderHook(({text}) => 
            useInputValue(text), 
            {initialProps: {text: "Gas Coba Tiga"},
        });

        rerender({text: "Berubah"});
        expect(result.current.value).toEqual("Berubah");
    });
})