// import styles from "./PersonList.module.css"
import Card from "../UI/Card";

function PersonList(props){

    let content=null;

    if(props.appData.length>0){
        content=props.appData.map((person)=>{
            return <h1>{person.name} ({person.age} year Old)</h1>
        })
    }
   
    return(
        <Card>
            {content}
        </Card>
    )
}

export default PersonList;