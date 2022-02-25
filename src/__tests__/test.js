import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SettingsProvider, { SettingsContext } from "../context/settings/context";

describe("Testing our Settings Context", () => {
  let Test = () => (
    <SettingsContext.Consumer>
      {(context) => (
        <>
          <p data-testid="test">test</p>
          <p data-testid="hide">{JSON.stringify(context.hide)}</p>
          <p data-testid="sort">{context.sort}</p>
          <p data-testid="numItems">{context.numItems}</p>
        </>
      )}
    </SettingsContext.Consumer>
  );

  it("Should provide a readable hide, sort, and item number values", () => {
    render(
      <SettingsProvider>
        <Test />
      </SettingsProvider>
    );

    expect(screen.getByTestId("hide")).toHaveTextContent("false");
    expect(screen.getByTestId("sort")).toHaveTextContent("difficulty");
    expect(screen.getByTestId("numItems")).toHaveTextContent("3");
  });
});
