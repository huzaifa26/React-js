import React from "react";
import Map from "../Map/Map";

const Dashboard=(props)=>{
    return(
    <Map  
        onLoad={map => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
    }}
    />
    )
};

export default Dashboard;