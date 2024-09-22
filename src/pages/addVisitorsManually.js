import React, { useState,useRef } from "react";
import { useParams } from "react-router-dom";
import Bar from "../components/Bar";
function AddVisitorsManually(){
    const [visitors,setVisitors]=useState([]);
    let token=localStorage.getItem('accessToken');
    let {eventId}=useParams();
    const tempVisitors=[];
    const inputRef=useRef()
    const handleAdd=()=>{
       let value=inputRef.current.value;
       value=value.trim()
       inputRef.current.value='';
       inputRef.current.focus();
       if(value.length<1){
        return;
       }
       setVisitors([...visitors,value]);
    }
    const handleKeyUp=(e)=>{
        console.log(e);
        if(e.code==='Enter'){
            handleAdd();
        }
    }
    const handleAddManually=async ()=>{
        try {
            const response=await fetch(`http://127.0.0.1:5000/event/${eventId}/visitors`,{
                headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                method:'POST',
                body:JSON.stringify({emailPhone:visitors})
            });
            console.log(response);
            if (response.ok){
                let res=await response.json()
                console.log(res);
                if(res.success===false){
                   alert(res.message);
                   return;
                }
                 alert(res.message);
            }
            else{

                alert('Failed');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
         <Bar />
         <div className="container" >
            <em>You Can add visitors manually here:</em>
            <div className="row mb-4" >
              <div className="col-6">
                <input type="text"  ref={inputRef} className="form-control"  onKeyUp={handleKeyUp} placeholder="Visitors email address or phone number" />
              </div>
              <div className="col-6">
                <div className="row" >
                     <div className="col-6">
                        <div className="btn btn-primary" onClick={handleAdd}>
                          ADD
                       </div>
                     </div>
                     <div className="col-6" >
                         <div className="btn btn-success" onClick={handleAddManually}>
                           submit
                        </div>
                     </div>
                </div>
                
               
              </div>

            </div>
            <table className="table table-hover">
                <thead>
                 <tr>
                    <th>emailPhone</th>
                    <th>Actions</th>
                 </tr>
                </thead>
                <tbody>
                   {
                    visitors.map(visitor=>(
                        <tr>
                            <td>{visitor}</td>
                            <td><button className="btn btn-danger" >DELETE</button></td>
                        </tr>
                    ))
                   }   
                </tbody>
            </table>
         </div>
        </>
    )
}

export default AddVisitorsManually;