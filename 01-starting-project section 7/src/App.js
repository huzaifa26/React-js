import React, { useState } from 'react';
import Form from './components/Form'
import PersonList from './components/PersonList';




function App() {

  const [appData,setAppData]=useState([])

  const getDataFunction = (username,age) =>{
    setAppData((prevState)=>{
      return [...prevState,{name:username,age:age}]
    })
  }


  return (
    <div>
      <Form getDataFunction={getDataFunction}/>
      <PersonList appData={appData}/>
    </div>
  );
}

export default App;
