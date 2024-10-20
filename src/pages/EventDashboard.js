import React,{useEffect,useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
function EventDashboard(){
    const [events,setEvents]=useState([]);
    const token=localStorage.getItem('accessToken');
    const navigate=useNavigate();
   useEffect(()=>{

        
            fetch('http://127.0.0.1:5000/event/list',{
                headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                method:'GET',
            }).then(response=>{
                if(response.status===403){
                    navigate('/auth/login');
                }
                if(!response.ok){
                    throw new Error('Network response was not ok')
                }
                return response.json();
            }).then((data)=>{
               setEvents(data);
               }
             ).catch((error)=>{
                console.log(error);
            })
            
     
  
   },[])


    return(
        <>
        <Bar />
        <div className="text-capitalize text-center mb-5 bg-light">
        <em className=" h4">Welcome</em>
        </div>
        <div className="container mb-3 bg-light">
        <div className="row mb-3 bg-light">
            <div className="col-6">
                
            </div>
            <div className="col-6 text-left">
               <Link className="btn btn-md btn-success" to='/event/register' >Register an Event</Link>
            </div>
        </div>
        <div className="row">
            <div className="col-6">List of Events</div>
            <div className="col-6">
                <div className="form-group">
                    <input type="search" className="form-control" id="search" placeholder="Quick-search" />
                </div>
            </div>
        </div>
        </div>
        <div className="container">
        <ul className="list-group text-capitalize" >
            {  
                events.map((event)=>(<Link className="list-group-item list-group-item-action"  to={`/event/${event.eventId}`} ><h5>{event.name}</h5></Link>))
              
            }
        </ul>
        </div>
        <Footer/>
        </>
    )
}
export default EventDashboard;