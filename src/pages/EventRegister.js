import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../components/Bar";
import { countWords } from "../utilities/utility";
import Footer from "../components/Footer";
function EventRegister(){
    let navigate=useNavigate();
    let token=localStorage.getItem('accessToken');
    const [event,setEvent]=useState({name:'',description:'',startDateTime:'',endDateTime:'',accessibility:''});
    const tempError={name:'',description:'',startDateTime:'',endDateTime:'',accessibility:''};
    const [error,setError]=useState(tempError);
    let [minEnd,setMinEnd]=useState(event.startDateTime);
    const handleChange=(e)=>{
        if([e.target.name]=='startDateTime'){
           setMinEnd(e.target.value);
        }
        setEvent({...event,[e.target.name]:e.target.value})
    }
    let date=new Date();
    let months=['01','02','03','04','05','06','07','08','09','10','11','12'];
    let actualDate=`${date.getFullYear()}-${months[date.getMonth()+1]}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
    console.log(actualDate)
    const validateInput=()=>{
        if(!event.name||!event.description||!event.startDateTime||!event.endDateTime||!event.accessibility){
            alert('Please Fill all the spaces');
            return false;
        }
        if(event.name){
            tempError.name='';
            if(event.name.trim().length<5){
                tempError.name='A an event should have at least 5 characters';
            }

        }
        if (event.description) {
            tempError.description='';
            if(countWords(event.description)<15){
                tempError.description='The description should be at least 15 words long';
            }
        }
        setError(tempError);
        if(tempError.name===''&&tempError.description===''){
           return true;
        }
      return false;
    }
    const handleSubmit=async()=>{
        let isValid=validateInput();
        console.log(tempError);

        if(!isValid){
            return;
        }
        console.log(event)
        try {
            const response=await fetch('http://127.0.0.1:5000/event',{
                headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                method:'POST',
                body:JSON.stringify({
                    name:event.name,
                    description:event.description,
                    startDateTime:new Date(event.startDateTime).toISOString(),
                    endDateTime:new Date(event.endDateTime).toISOString(),
                    accessibility:event.accessibility
                }),
            });
            
            if (response.ok){
                let res=await response.json()
                if(res.success===false){
                   alert(res.message);
                   return;
                }
                else{
                    alert(res.message);
                    setTimeout(()=>{
                       navigate('/event/dashboard')
                    },2000)

                }
                
            }
            else{

                alert('Failed')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
        <Bar />
         <div className="container" > 
            <div className="card mt-5">
               <div className="card-header bg-primary text-center text-white">
                  <em className="h2">Wanna Register an Event?</em>
               </div>
               <div className="card-body" >
                    <div className="form-group mb-2">
                        <label htmlFor="name">Events Name:</label>
                        <input type="text" name="name" id="name" className="form-control" value={event.name} onChange={handleChange} />
                        <em className="text-danger">{error.name}</em>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="description" >Briefly Explain:</label>
                        <textarea id="description" name="description" className="form-control"  value={event.description} onChange={handleChange}   ></textarea>
                        <em className="text-danger">{error.description}</em>
                        <em className="text-success">{event.description.length}</em>
                    </div> 
                    <div className="row mb-2">
                        <div className="col-6">
                        <label htmlFor="startDateTime" >When is the event starting:</label>
                        <input type="datetime-local" name="startDateTime" id="startDate" className="form-control"  min={actualDate} value={event.startDateTime} onChange={handleChange} />
                        </div> 
                       <div className="col-6">
                       <label htmlFor="endDateTime" >When is the event ending:</label>
                          <input type="datetime-local" name="endDateTime" id="endDate" className="form-control" min={minEnd} value={event.endDateTime} onChange={handleChange} /> 
                       </div>  
                    </div> 
                    <div className="form-group mb-2">
                        <label >Accessibility:</label>
                        <div className="row">
                        <div className="col-6">
                             <input type="radio" class="form-check-input" id="public" name="accessibility"  value={true} onChange={handleChange}  />
                             <label className="form-check-label" htmlFor="public">Anyone in the Event can take a photo</label>
                       </div>
                       <div className="col-6">
                             <input type="radio" class="form-check-input" id="private" name="accessibility"  value={false} onChange={handleChange}  />
                             <label className="form-check-label" htmlFor="private">A select number can take photos</label>
                       </div>
                        </div>
                      
                    </div>
                    <div className="form-group mb-1" >
                     <button className="form-control bg-success text-white btn btn-lg" onClick={handleSubmit} >Register My Event</button>
                   </div>
               </div>
            </div>

         </div>
         <Footer />
        </>
    )
}
export default EventRegister;