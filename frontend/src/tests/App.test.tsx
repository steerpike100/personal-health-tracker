import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; 
import "@testing-library/jest-dom"; 
import App from "../App";

describe("App Component", () => {
  it("renders Hello, World!", () => {
    render(<App />);
    const textElement = screen.getByText(/Hello, World!/i);
    expect(textElement).toBeInTheDocument();
  });
});
