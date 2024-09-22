import { useParams,useNavigate } from "react-router";
import React,{useEffect} from "react";
function Qredirect(){
    let navigate=useNavigate();
    let {eventId}=useParams();
    localStorage.setItem('eventId',eventId);
    useEffect((
        ()=>{
            navigate(`/event/confirmation`);
        }
    ),[])
    return(
        <>
        </>
    )
}

export default Qredirect;