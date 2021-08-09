import NewExpenses from "./components/NewExpenses/NewExpenses";
import Expenses from "./components/Expenses/Expenses";
import { useState } from "react";

function App() {
  const expenseItems=[
    {
      id:'a1',
      date: new Date(2020, 7, 14),
      title:"Car Insurance",
      amount:"$229"
    },
    {
      id:'a2',
      date: new Date(2021, 7, 14),
      title:"Health Insurance",
      amount:"$112.9"
    },
];

const [expense,setExpense]=useState(expenseItems);

  const onSaveApp = (expenseDataa) => {
    setExpense(prevState => {
      return [expenseDataa, ...prevState];
    })
  }

  return (
    <div className="Wrapper">
      <NewExpenses onSaveApp={onSaveApp}/>  
      <Expenses expenseprop={expense} />
    </div>
  );
}

export default App;