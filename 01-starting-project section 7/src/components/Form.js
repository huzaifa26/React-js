import { useRef } from "react";
import styles from "./Form.module.css"

function Form(props){
    const userEntered=useRef();
    const ageEntered=useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const username=userEntered.current.value;
        const age=ageEntered.current.value;

        props.getDataFunction(username,age);
        userEntered.current.value="";
        ageEntered.current.value="";
    }

    return(
        <form onSubmit={formSubmitHandler}>
            <label>Username
                <input className={styles.inputText} type="text" ref={userEntered}/>
            </label>
            <label>Age
                <input ref={ageEntered} className={styles.inputText} type="text"/>
            </label>
            <button className={styles['button']} type="submit">Add user</button>
        </form>
    )
}

export default Form;