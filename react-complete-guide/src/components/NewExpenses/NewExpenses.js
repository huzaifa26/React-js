
import "./NewExpenses.css";
import ExpenseForm from "./ExpenseForm";
const NewExpenses=(props)=>{
    const onSaveNewExpenses = (expenseData) => {
        const expenseDataa={
            id:Math.random().toString(),
            ...expenseData,
        }
        props.onSaveApp(expenseDataa);
    }

    return(
        <div className="new-expense">
            <ExpenseForm onSaveNewExpenses={onSaveNewExpenses} />
        </div>
    )
};

export default NewExpenses;