import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm=(props)=>{
    //Using multiple states
    const [title,setTitle]=useState('');
    const [amount,setAmount]=useState('');
    const [date,setDate]=useState('');

    //  Using one state
    //const [userData,setUserData] = useState({
    //    title:'',
    //    amount:'',
    //    date:''
    //});

    const titleOnChangeHandler=(event)=>{
        //  Updateing data of state when using multiple states
        setTitle(event.target.value);

        //  Updating data in One state
        //setUserData((prevstate)=>{
        //    setUserData({...prevstate,title:event.target.value})
        //});
    }
    
    const amountOnChangeHandler=(event)=>{
        //  Updateing data of state when using multiple states
        setAmount(event.target.value);

        //  Updating data in One state
        //setUserData((prevstate)=>{
        //    setUserData({...prevstate,amount:event.target.value})
        //});
    }

    const dateOnChangeHandler=(event)=>{
        //  Updateing data of state when using multiple states
        setDate(event.target.value);

        //  Updating data in One state
        //setUserData((prevstate)=>{
        //    setUserData({...prevstate,date:event.target.value})
        //});
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        
        const expenseData={
            title: title,
            amount: +amount,
            date: new Date(date)
        };       

        props.onSaveNewExpenses(expenseData);
        setTitle("");
        setAmount("");
        setDate("");

    }

    return(
        <form onSubmit={onSubmit}>
            <div className="new-expense__control">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={title} onChange={titleOnChangeHandler}></input>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" value={amount} min="0.01" step="0.01" onChange={amountOnChangeHandler}></input>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" value={date} onChange={dateOnChangeHandler}></input>
                </div>
            </div>
            <div className="new-expense__control">
                 <button type="submit">Add Expense</button>
            </div>
        </form>
    )
};

export default ExpenseForm;