import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import { AppProvider } from "./context/AppContext";



describe("Expense Creation", () => {
  test("Should correctly calculate remaining balance after adding and deleting expenses", () => {
    const { getByRole, getByText } = render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    const createNameInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createSaveButton = screen.getByText("Save");

    expect(screen.getByText("Budget: \$1000")).toBeInTheDocument();
    expect(screen.getByText(`Remaining: \$1000`)).toBeInTheDocument();

    fireEvent.change(createNameInput, { target: { value: "item" } });
    fireEvent.change(createCostInput, {target: { value: 100 },});
    fireEvent.click(createSaveButton);

    expect(screen.getByText("Budget: \$1000")).toBeInTheDocument();
    expect(screen.getByText(`Remaining: \$900`)).toBeInTheDocument();
    expect(screen.getByText(`item`)).toBeInTheDocument();
  });
});

describe("Expense Deletion", () => {
  test("Should remove an expense from the list", () => {
    const { getByRole, getByText } = render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    const createNameInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createSaveButton = screen.getByText("Save");

    fireEvent.change(createNameInput, { target: { value: "item" } });
    fireEvent.change(createCostInput, {target: { value: 500 },});
    fireEvent.click(createSaveButton);

    const expensesItem = screen.getByText("item");
    const deleteButton = screen.getByText("x");
    fireEvent.click(deleteButton);

    expect(screen.getByText("Budget: \$1000")).toBeInTheDocument();
    expect(screen.getByText(`Remaining: \$1000`)).toBeInTheDocument();
    expect(expensesItem).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});

describe("Budget Balance Verification", () => {
  test("Should correctly calculate remaining balance after adding and deleting expenses", () => {
    const { getByRole, getByText } = render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    const createNameInput = screen.getByLabelText("Name");
    const createCostInput = screen.getByLabelText("Cost");
    const createSaveButton = screen.getByText("Save");

    fireEvent.change(createNameInput, { target: { value: "item" } });
    fireEvent.change(createCostInput, {target: { value: 500 },});
    fireEvent.click(createSaveButton);

    fireEvent.change(createNameInput, { target: { value: "item" } });
    fireEvent.change(createCostInput, {target: { value: 250 },});
    fireEvent.click(createSaveButton);

    expect(screen.getByText(`Remaining: \$250`)).toBeInTheDocument();

    const deleteButton = screen.getAllByText('x')[0];
    fireEvent.click(deleteButton);

    expect(screen.getByText(`Remaining: \$750`)).toBeInTheDocument();
  });
});

