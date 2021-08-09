import ExpenseItem from "./ExpenseItems";
import "./ExpenseList.css"

const ExpenseList = (props) => {
    let expenseContent = <p>No items</p>;

    if(props.filteredExpense.length > 0){
        expenseContent = props.filteredExpense.map((expense) => {
            return (<ExpenseItem
                key={expense.id} 
                date={expense.date}
                title={expense.title}
                amount={expense.amount}
            />)
        });
    }

    console.log(props.filteredExpense.length);

    if(props.filteredExpense.length === 0){
        return expenseContent = <p>No items</p>;
    }

    return(
        <ul className="expenses-list">
            {expenseContent}
        </ul>
    )
}

export default ExpenseList;