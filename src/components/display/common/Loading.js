import React from "react";
// style imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';



const Loading = () => {
    return(            
        <div id="loading">
            <span style={{alignItems:"center", justifyItems:"center"}}>
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <div style={{color:"white"}}>Loading...</div>
            </span>
        </div>
        )
}
export default Loading