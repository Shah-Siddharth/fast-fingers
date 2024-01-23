import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

function setup() {
  return render(<App />);
}

describe("Renders the Homepage", () => {
  test("should contain all elements", () => {
    setup();
    expect(screen.getByRole('heading', { name: /fast fingers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the ulitmate typing game/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox').getAttribute("placeholder")).toMatch(/enter your name/i);
    expect(screen.getByRole('combobox')).toHaveDisplayValue(/easy/i);
    expect(screen.getByRole('button', { name: /please enter a username/i })).toBeDisabled();
  });

  test("select box should have correct difficulty values", () => {
    setup();
    screen.debug();
    expect(screen.getAllByRole('option').length).toBe(3);
    expect(screen.getByRole('option', { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /hard/i })).toBeInTheDocument();
  });
})