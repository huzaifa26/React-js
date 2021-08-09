import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpensesFilter from "../NewExpenses/ExpenseFilter";
function Expenses(props) {
    const [filterYear,setFilterYear]= useState('2020');
    const onFilterchange=(filter)=>{
        setFilterYear(filter);
    }

    const filteredExpense = props.expenseprop.filter(expen =>{
        return (expen.date.getFullYear().toString() === filterYear);
        }
    )   

    return( 
        <div>
            <ExpensesFilter onFilterchange={onFilterchange}/>
            <ExpenseList filteredExpense={filteredExpense}/>
        </div>      
  );
}
export default Expenses;