import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// **Pepperoni Checkbox Tests**

test("checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("checkbox toggles checked state when clicked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // Check if checkbox is initially unchecked
  expect(addPepperoni).not.toBeChecked();

  // Simulate user clicking the checkbox
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();

  // Simulate user clicking the checkbox again (uncheck it)
  userEvent.click(addPepperoni);
  expect(addPepperoni).not.toBeChecked();
});

// **Pizza Size Select Tests**

test("pizza size select element initially defaults to 'Small'", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

test("pizza size selection updates 'Your Selection' message", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);

  // Change size to 'Medium' and verify the message
  userEvent.selectOptions(selectSize, "medium");
  expect(screen.getByText(/medium/i)).toBeInTheDocument();

  // Change size to 'Large' and verify the message
  userEvent.selectOptions(selectSize, "large");
  expect(screen.getByText(/large/i)).toBeInTheDocument();
});

test("selecting pizza size updates the displayed order size correctly", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  
  // Default size is Small
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();

  // Update to Medium
  userEvent.selectOptions(selectSize, "medium");
  expect(screen.getByText(/medium cheese/i)).toBeInTheDocument();

  // Update to Large
  userEvent.selectOptions(selectSize, "large");
  expect(screen.getByText(/large cheese/i)).toBeInTheDocument();
});

// **'Your Selection' Text Tests**

test("'Your Selection' initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("changing pizza size and toppings updates 'Your Selection' message", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const selectSize = screen.getByLabelText(/select size/i);

  // Select 'Medium' size and add pepperoni
  userEvent.selectOptions(selectSize, "medium");
  userEvent.click(addPepperoni);
  expect(screen.getByText(/medium pepperoni/i)).toBeInTheDocument();

  // Select 'Large' size and remove pepperoni
  userEvent.selectOptions(selectSize, "large");
  userEvent.click(addPepperoni); // Uncheck pepperoni
  expect(screen.getByText(/large cheese/i)).toBeInTheDocument();
});

// **Contact Info Textbox Tests**

test("contact info input has placeholder text 'email address'", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email address/i);
  expect(emailInput).toBeInTheDocument();
});

test("user can type their email address into the contact info field", () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/enter your email address/i);

  userEvent.type(emailInput, "pizzafan@email.com");

  expect(emailInput).toHaveValue("pizzafan@email.com");
});

// **Submit Order Button Tests**

test("submit order button is present in the form", () => {
  render(<App />);
  const submitButton = screen.getByRole("button", { name: /submit order/i });
  expect(submitButton).toBeInTheDocument();
});

test("clicking 'Submit Order' button displays a thank you message", () => {
  render(<App />);
  
  // Click the submit button to simulate form submission
  userEvent.click(screen.getByRole("button", { name: /submit order/i }));

  // Verify the 'Thank You' message appears
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});

