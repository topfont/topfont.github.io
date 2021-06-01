import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders topfont github link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Topfont \(GitHub\)/i);
  expect(linkElement).toBeInTheDocument();
});
