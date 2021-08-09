import ExpenseDate from "../NewExpenses/ExpenseDate";
import "./ExpenseItems.css"

function ExpenseItem(props){

    return (
        <div className="ExpenseItem">   
            <div className="ExpenseItemDiv">
                <ExpenseDate date={props.date}/>
                <h2>{props.title}</h2>
            </div>
            <div className="ExpenseItemPrice">
                <h2>{props.amount}</h2>
            </div>
        </div>
    )
}

export default ExpenseItem;