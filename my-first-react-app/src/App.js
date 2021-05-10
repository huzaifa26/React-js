import React, { useState } from 'react';
import './App.css';
import Person from "./Person/Person";

const App = props => {
  const [personState, setPersonState]= useState({
    person:[
      {name:"huzaifa",age:28},
      {name:"hamza",age:21}
    ],
    
  });

  const [newState, setnewState]=useState({dontshow: false});
  

  const switcheventhandler=(newName)=>{
      setPersonState({
        person:[
          {name: newName,age:28},
          {name:"hamza",age:30}
        ]
      });
  }

  const changeEventHandler=(event)=>{
    setPersonState({
      person:[
        {name: event.target.value,age:28},
        {name:"hamza",age:30}
      ]
    });
  }

  const showbuttonHandler=()=>{
    const doshow=newState.dontshow;
    setnewState({dontshow: !doshow});
  }


    return (
      <div className="App">  
        <h1>Welcome to My First React App</h1> 
        <button onClick={showbuttonHandler}>Switch Names</button>
      { newState.dontshow === true ? 
          <div>
            <Person name={personState.person[0].name} age={personState.person[0].age} change={changeEventHandler}/>
            <Person name={personState.person[1].name} age={personState.person[1].age}>{newState.otherValue}</Person>
          </div>: null
        }
      </div>
    );
  }


export default App;