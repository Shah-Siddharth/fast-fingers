import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(screen.getAllByRole('option').length).toBe(3);
    expect(screen.getByRole('option', { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /hard/i })).toBeInTheDocument();
  });

  test("user should be able to select different difficulty values", async () => {
    setup();
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: /medium/i })
    )
    expect(screen.getByRole('combobox')).toHaveDisplayValue(/medium/i);
  });

  test("button should be enabled once user inputs username", async () => {
    setup();
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard("username");
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start game/i })).not.toBeDisabled();
  })
})