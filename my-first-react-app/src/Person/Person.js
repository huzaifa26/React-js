import React from "react";

const person=(props)=>{
    return (
    <div>
        <p>Hi I am {props.name} and I am {props.age} years old.</p>
        <p onClick={props.clicked}></p>
        <input type="text" onChange={props.change}></input>
    </div>
    );
}

export default person;  