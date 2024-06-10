import { HomeScreen } from "./home-screen";
import { render, screen } from "@testing-library/react";

test("renders header", () => {
  render(<HomeScreen />);
  const h1Element = screen.getByText(/Testmatic/i);
  expect(h1Element).toBeInTheDocument();
});
