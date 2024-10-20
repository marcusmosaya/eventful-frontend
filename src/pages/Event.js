import React, { useState,useEffect } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import Bar from "../components/Bar";
import QrCodeGen from "./QrCode";
import Footer from "../components/Footer";
function Event(){
    let {eventId}=useParams();
    let navigate=useNavigate();
    let [listVisitors,setListVisitors]=useState([{emailPhone:'none'}]);
    let [filteredVisitor,setFilteredData]=useState(listVisitors);
    const [error,setError]=useState(null);
    const [event,setEvent]=useState({});
    const [loading,setLoading]=useState(true);
    const [happend,sethappened]=useState(false);
    let token=localStorage.getItem('accessToken');
    const url=`http://127.0.0.1:5000/event/${eventId}`;
    const makeChange=()=>{
        navigate(`/event/${eventId}/change`);
    }
    const handleViewPhotos=()=>{
        localStorage.setItem('eventId',eventId);
        navigate('/photos');
    }
    const handleDelete=async (e)=>{
          let dataToDelete=e.target.id.split('-')[1];
          let confirmed=window.confirm('Are you sure this cannot be undone?')
          if(!confirmed){
            return;
          }
          try {
            const response=await fetch(`http://127.0.0.1:5000/event/${eventId}/visitors`,{
                headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                method:'DELETE',
                body:JSON.stringify({emailPhone:dataToDelete})
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
                 fetch(`http://127.0.0.1:5000/event/${eventId}/visitors`,{
                    headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                    method:'GET',
                }).then(response=>{
                    if(!response.ok){
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then((data)=>{
                   setListVisitors(data);
                   setFilteredData(data);
                   
                   }
                 ).catch((error)=>{
                    console.log(error);
                })

            }
            else{

                alert('Failed');
            }

        } catch (error) {
            console.error(error);
        }
    }
    const sedFile=async (file)=>{
      const formData=new FormData();
      console.log(file.files[0])
      formData.append('image',file.files[0]);
      console.log(formData);
      try {
        const response=await fetch(`http://127.0.0.1:5000/photo/${eventId}/upload`,{
            method:'POST',
            body:formData,
        });
        console.log(response);
        if (response.ok){
            alert('upload successful')
        }
        else{

            alert('Failed')
        }
    } catch (error) {
        console.error(error);
    }
}
    

    const upload=(e)=>{
          let spreadSheet=e.target;
          console.log(spreadSheet);
          let file=e.target.files[0].name;
          let fileArray=file.split('.');
          let extension=fileArray[fileArray.length-1]
          if(extension=='xlsx'){
            sedFile(spreadSheet);
            alert("You have successfully uploaded the file");    

          } else{
            alert('This file format is not allowed, we use .xlsx files');
                
    }
}
    const handleSpreedShheet=()=>{
        let file=document.createElement('input');
        file.setAttribute('type','file');
        file.setAttribute('multiple',false);
        file.id='spreadSheet';
        file.addEventListener('change',upload);
        file.click();
    }
    const handleFilter=(e)=>{
        let val=e.target.value;
        const filtered=listVisitors.filter(item=>item.emailPhone.toLowerCase().includes(val));
        setFilteredData(filtered);
        if(handleDelete==''){
            setFilteredData(listVisitors);
        }
       
    }
    useEffect(()=>{     
        fetch(url,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
          
            if(response.status===401){
                setLoading(false);
                throw new Error('You are not authorized to access this resource');
            }
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data)=>{
           
            setLoading(false);
           setEvent(data);
           if((new Date(data.endDateTime.split('.')[0]).toISOString())<(new Date().toISOString())){
               sethappened(true);
           }
           }
         ).catch((error)=>{
            setError(error);
            console.log(error);
        })

       fetch(`http://127.0.0.1:5000/event/${eventId}/visitors`,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            
            if(response.status===401){
                setLoading(false);
                throw new Error('You are not authorized to access this resource');
            }
            if(response.status===404){
                setLoading(false);
                throw new Error('File Not Found');
            }
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data)=>{
           setListVisitors(data);
           setFilteredData(data)
           
           }
         ).catch((error)=>{
            setLoading(false);
            setError(error)
            console.log(error);
        })
},[])
    if(loading)return<div className="text-center text-success"><p>Loading...</p></div> ;
    if(error) return<div className="text-center"><em className="text-danger h5 ">{error.message}</em></div>; 
    return(
        <>
         <Bar/>
         <div className="container">
            <div className="row mt-5" > 
               <div className="col col-lg-6">
                 <div className="card w-100 mb-4">
                    <div className="card-body">
                    
                       <div className="row  mb-3">
                       <div className="col text-center text-dark h4"><em className="text-center">{event.name}</em></div>
                    </div>
                    <div className="row mb-3">
                       <div className="col"><span>DESCRIPTION:</span></div>
                    </div>
                    <div className="row ">
                    <div className="col text-justify"><p>{event.description}</p></div>
                    </div>
                    <div className="row">
                       <div className="col-6">{!happend?'Starts':'Started'}</div>
                       <div className="col-6">{!happend?'Ends':'Ended'}</div>
                    </div>
                    <div className="row">
                       <div className="col-6">{ new Date(event.startDateTime.split('.')[0]).toDateString()},{new Date(event.startDateTime.split('.')[0]).toLocaleTimeString()}</div>
                       <div className="col-6">{ new Date(event.endDateTime.split('.')[0]).toDateString()},{new Date(event.endDateTime.split('.')[0]).toLocaleTimeString()}</div>
                    </div>
                    </div>
                   {!happend && <div className="btn btn-success text-white m-2" onClick={makeChange} >MAKE CHANGES</div>}
                    <button className="btn  btn-dark m-2" onClick={handleViewPhotos}>View Photos</button>

                </div>
              
              </div>
           {!happend&&   <div className="col col-lg-6" >
               <QrCodeGen qrURL={`http://192.168.43.198:3000/event/qr/${eventId}`} />
           </div>}
           </div>
           
            {
                event.accessibility||(
               <div className="col mt-4" >
                  <em className="text-capitalize h3">{! happend?'Allowed Visitors:':'Those Who Visited'}</em>
                  <div className="card">
                   <div className="card-header bg-light border-dark" >
                    <div className="row">
                   { !happend &&   (<div className="col-6">
                        <input type="search" onKeyUp={handleFilter} className="form-control" placeholder="Quick search..." />
                    </div>)}
                    </div>
                   </div>
                   <div className="card-body" >
                 { !happend &&   <div className="row mt-2 mb-1 px-2">
                        <div className="col-6" >
                        <button className="bg-success text-white btn  w-75" onClick={handleSpreedShheet}>spreedsheet</button>
                        </div>
                        <div className="col-6" >
                        <Link className="bg-success text-white btn  w-75" to={`/event/${eventId}/addVisitor`} >Add Manually</Link>

                        </div>

                    </div>}
                   <table className="table table-hover table-striped">
                      <thead className="thead-dark">
                        <tr>
                         <th>emailPhone</th>
                       { !happend && <th>Actions</th>}
                         </tr>
                      </thead>
                    <tbody>
                        {
                            filteredVisitor.length<1&&<h3>No visitors yet</h3>
                        }
                {
                    filteredVisitor.map((visitor,index)=>(
                        <tr key={index}>
                            <td>{visitor.emailPhone}</td>
                         { !happend &&  <td><button className="btn btn-block btn-danger"  id={`${index}-${visitor.emailPhone}`} onClick={handleDelete} >Delete</button></td>}
                        </tr>
                    ))
                }
                 </tbody>
                 </table>
                   </div>


                  </div>
                  
                </div>
                )
           }
           
         </div>
         <Footer />


        </>
    )
}

export default Event;