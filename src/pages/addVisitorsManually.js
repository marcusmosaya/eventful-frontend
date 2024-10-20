import React, { useState,useRef, useEffect } from "react";
import { validateEmail,validatePhonenumber,getType } from "../utilities/utility";
import { useParams,useNavigate } from "react-router-dom";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
function AddVisitorsManually(){
    const [visitors,setVisitors]=useState([]);
    const [filteredData,setFilteredData]=useState(visitors);
    const [error,setError]=useState(null);
    let tempError='';
    let token=localStorage.getItem('accessToken');
    let {eventId}=useParams();
    let navigate=useNavigate();
    let tempVisitors;
    const inputRef=useRef()
    const handleAdd=()=>{
       tempError=''
       let value=inputRef.current.value;
       value=value.trim()
       value=value.toLowerCase()
       if(value.length<1){
        return;
       }
       switch (getType(value)) {
        case 'letters':
          console.log(getType(value))
          if(!validateEmail(value)){
            tempError="invalid email address";
            inputRef.current.style.color='red';
            setError(tempError);
          return;
           }
           break;
        case  'numbers':
          console.log(getType(value))
          if(!validatePhonenumber(value)){
            tempError="invalid phone number";
            inputRef.current.style.color='red';
            setError(tempError);
            return
           }
           break;
        default:
          break;
       }
       setError(tempError);
       inputRef.current.style.color='black';
       inputRef.current.value='';
       inputRef.current.focus();
       setVisitors([...visitors,value]);
       setFilteredData(visitors);
    }
    const handleKeyUp=(e)=>{
        console.log(e.target.value);
        if(e.code==='Enter'){
            handleAdd();
        }
    }
    const handleDelete=(e)=>{
        let toDelete=e.target.id.split('-')[1];
        let confirmed=window.confirm('Are you sure this cannot be undone?');
          if(!confirmed){
            return;
          }
          const filtered=visitors.filter(item=>item.toLowerCase()!==toDelete);
         setFilteredData(filtered);
         setVisitors(filtered);
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
                navigate(`/event/${eventId}`);

            }
            if(response.status===401){
              alert('Unauthorized');
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect((()=>{}),[visitors])
    return(
        <>
         <Bar />
         <div className="container" >
            <em>You Can add visitors manually here:</em>
            <div className="row mb-4" >
              <div className="col-6">
                <input type="text"  ref={inputRef} className="form-control"  onKeyUp={handleKeyUp} placeholder="Visitors email address or phone number" />
                <em className="text-danger">{error}</em>
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
            <table className="table table-hover mb-5">
                <thead>
                 <tr>
                    <th>emailPhone</th>
                    <th>Actions</th>
                 </tr>
                </thead>
                <tbody>
                  {
                    visitors.length<1 && <tr className="text-center"><td className="text-center"><em className="h4 text-danger">Empty </em></td></tr> 
                  }
                   {
                    visitors.map((visitor,index)=>(
                        <tr key={index}>
                            <td>{visitor}</td>
                            <td><button className="btn btn-danger" id={`${index}-${visitor}`} onClick={handleDelete} >DELETE</button></td>
                        </tr>
                    ))
                   }   
                </tbody>
            </table>
         </div>
         <Footer />
        </>
    )
}

export default AddVisitorsManually;