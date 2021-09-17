import React from "react";
import DashboardCard from "../layout/DashboardCard";

const Dashboard=(props)=>{
    console.log(props.unapprovedUsers.length);
    return(
        <div style={{display:"flex", flexWrap: "wrap"}}>
            <DashboardCard
                name={"Total Admins"}
                length={"3"}
            />
            <DashboardCard
                name={"Total Active Members"}
                length={props.approvedUsers.length}
            />
            <DashboardCard
                name={"Pending Member Approvals"}
                length={props.unapprovedUsers.length}
            />

            <DashboardCard
                name={"Total Tasks"}
                length={props.tasks.length}
            />

            <DashboardCard
                name={"Total Locations"}
                length={props.locations.length}
            />  

        </div>
    )
};

export default Dashboard;