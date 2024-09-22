import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Bar from "../components/Bar";
function ConfirmVisitor(){
 const [emailPhone,setEmailPhone]=useState({emailPhone:''});
 let eventId=localStorage.getItem('eventId');
 let urlAccesible=`http://127.0.0.1:5000/event/${eventId}/accessible`;
 let urlConfirm=`http://127.0.0.1:5000/event/${eventId}/visitors/confirm`;
 let navigate=useNavigate();
 const handleChange=(e)=>{
    setEmailPhone({...emailPhone,[e.target.name]:e.target.value});
 }
 const handleSubmit=async()=>{
    try {
        const response=await fetch(urlConfirm,{
            headers:{'Content-Type':'Application/json'},
            method:'POST',
            body:JSON.stringify(emailPhone),
        });
        if (response.ok){
            let res=await response.json()
            if(res.success===false){
               alert(res.message);
               return;
            }
            else{
                alert(res.message);
                localStorage.setItem(`${eventId}By`,emailPhone.emailPhone);
                setTimeout(()=>{
                   navigate('/camera')
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
 useEffect(()=>{
    fetch(urlAccesible,{
        headers:{'Content-Type':'Application/json'},
        method:'GET',
    }).then(response=>{
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
    }).then((data)=>{
       if(data.accessibility===true){
         navigate('/camera');
       }
       }
     ).catch((error)=>{
        console.log(error);
    })
 },[]);

  return(
    <>
      <Bar />
      <div className="container text-center">
       <h4>Confirmation.</h4>
         <p>We would like to know if you are allowed to make photos.</p>
         <input type="text" className="form-control" name="emailPhone" placeholder="your email addresss or phone number please" onChange={handleChange} />
         <div className="btn w-50 btn-md btn-block m-5 btn-success text-white" onClick={handleSubmit}>Confirm</div>
      </div>
    </>
  )
}
export default ConfirmVisitor;