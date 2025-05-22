import { useReducer, createContext, useMemo } from "react";
import type { Dispatch } from "react";
import type { BudgetActions, BudgetState } from "../reducer/budget-reducer";
import { budgetReducer, initialState } from "../reducer/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses:number,
  remainingBudget:number

};

type BudgetProviderProps = {
  children: React.ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
