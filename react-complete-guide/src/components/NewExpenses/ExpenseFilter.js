import "../Expenses/ExpenseItems.css"


const ExpensesFilter=(props)=>{

    const filterOnChange = (event) =>{
        props.onFilterchange(event.target.value);
    }
    
    return(
            <div className="filter"> 
            <label htmlFor="year">Choose a car:</label>
            <select id="year" name="year" onChange={filterOnChange}>
                <option value='2020'>2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
            </div>
    )
};

export default ExpensesFilter;