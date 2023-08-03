import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Autocomplete } from "./autocomplete.component";

// Mock fetchOptions function for testing
const mockFetchOptions = jest.fn(async (searchQuery) => {
  return [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
    { id: 4, name: "Alice Brown" },
    { id: 5, name: "Mike Davis" },
  ];
});

const options = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Brown" },
  { id: 5, name: "Mike Davis" },
];

test("renders autocomplete input", () => {
  render(
    <Autocomplete
      fetchOptions={mockFetchOptions}
      onSelect={() => {}}
      displayOption={(item) => item.name}
    />
  );
  const inputElement = screen.getByPlaceholderText("Search...");
  expect(inputElement).toBeInTheDocument();
});

test("displays loading message while fetching options", async () => {
  render(
    <Autocomplete
      fetchOptions={mockFetchOptions}
      onSelect={() => {}}
      displayOption={(item) => item.name}
    />
  );
  const inputElement = screen.getByPlaceholderText("Search...");
  fireEvent.change(inputElement, { target: { value: "John" } });

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Use act to wrap the code that triggers the asynchronous operation
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate async operation
  });

  expect(screen.queryByText("Loading...")).toBeNull();
});

test("displays options list when options are available", async () => {
  render(
    <Autocomplete
      fetchOptions={mockFetchOptions}
      onSelect={() => {}}
      displayOption={(item) => item.name}
    />
  );
  const inputElement = screen.getByPlaceholderText("Search...");
  fireEvent.change(inputElement, { target: { value: "John" } });

  // Use act to wrap the code that triggers the asynchronous operation
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate async operation
  });

  options.forEach((option) => {
    expect(screen.getByText(option.name)).toBeInTheDocument();
  });
});

test("calls onSelect function when an option is selected", async () => {
  const mockOnSelect = jest.fn();
  render(
    <Autocomplete
      fetchOptions={mockFetchOptions}
      onSelect={mockOnSelect}
      displayOption={(item) => item.name}
    />
  );
  const inputElement = screen.getByPlaceholderText("Search...");
  fireEvent.change(inputElement, { target: { value: "John" } });

  // Use act to wrap the code that triggers the asynchronous operation
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate async operation
  });

  const optionElement = screen.getByText("John Doe");
  fireEvent.click(optionElement);

  expect(mockOnSelect).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
});
