import React, { useState, useContext} from "react";
import { AppContext } from "../../context/AppContext";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState<string>("");  // Explicit type for name
  const [cost, setCost] = useState<number>(0);  
  const [num, setNum] = useState<number>(1);


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense = {
      id: num.toString(),  
      name: name,
      cost: cost,
    };
    console.log(num);

    // Exercise: Add add new expense to expenses context array
    setExpenses([...expenses, newExpense]);

    setName("");
    setCost(0);
    setNum(num + 1);
};


  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))} 
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
