import React, { useState,useEffect } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import Bar from "../components/Bar";
import QrCodeGen from "./QrCode";
function Event(){
    let {eventId}=useParams();
    let navigate=useNavigate();
    let [listVisitors,setListVisitors]=useState([{emailPhone:'no'}]);
    const visitorTempList=listVisitors;
    const visitorsTemp=listVisitors;
    const [event,setEvent]=useState({});
    const [loading,setLoading]=useState(true);
    let token=localStorage.getItem('accessToken');
    const url=`http://127.0.0.1:5000/event/${eventId}`;
    const makeChange=()=>{
        navigate(`/event/${eventId}/change`);
    }
    const handleDelete=async (e)=>{
          let dataToDelete=e.target.id.split('-')[1];
          listVisitors.pop(dataToDelete);
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

    const upload=(e)=>{
          let file=e.target.files[0].name;
          let fileArray=file.split('.');
          let extension=fileArray[fileArray.length-1]

          switch (extension) {
            case 'csv':
            case 'xls':
            case 'xlsx':
                alert("You have successfully uploaded the file");    
                return;   
            default:
                alert('This file format is not allowed, we use .xlsx files');
                return; 
          }        
    }
    const handleSpreedShheet=()=>{
        let file=document.createElement('input');
        file.setAttribute('type','file');
        file.setAttribute('multiple',false);
        file.addEventListener('change',upload)
        file.click();
    }
    const handleFilter=(e)=>{
        let val=e.target.value;
        visitorsTemp=visitorTempList.filter((data)=>{
            return data.includes(val)
        })
        console.log(visitorsTemp);
        setListVisitors(visitorsTemp);
        visitorsTemp=listVisitors;
        visitorTempList=listVisitors;
    }
    useEffect(()=>{     
        fetch(url,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data)=>{
           
            setLoading(false);
           setEvent(data);
           }
         ).catch((error)=>{
            console.log(error);
        })

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
           
           }
         ).catch((error)=>{
            console.log(error);
        })
},[])
    if(loading)return <p>Loading...</p>
    return(
        <>
         <Bar/>
         <div className="container">
            <div className="row mt-5" > 
               <div className="col col-lg-6">
                 <div className="card w-100">
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
                       <div className="col-6">Starts</div>
                       <div className="col-6">Ends</div>
                    </div>
                    <div className="row">
                       <div className="col-6">{event.startDateTime.split('.')[0]}</div>
                       <div className="col-6">{event.endDateTime.split('.')[0]}</div>
                    </div>
                    </div>
                    <div className="btn btn-success text-white m-2" onClick={makeChange} >MAKE CHANGES</div>
                </div>
              

              </div>
              <div className="col col-lg-6" >
               <QrCodeGen qrURL={`http://192.168.43.198:3000/event/qr/${eventId}`} />
           </div>
           </div>
           
           {
                event.accessibility||(
                <div className="col" >
                  <em className="text-capitalize h3" >Allowed Visitors:</em>
                  <div className="card">
                   <div className="card-header bg-light border-dark" >
                    <div className="row">
                    <div className="col-6">
                        <input type="search" onKeyUp={handleFilter} className="form-control" placeholder="Quick search..." />
                    </div>
                    </div>
                   </div>
                   <div className="card-body" >
                   <div className="row mt-2 mb-1 px-2">
                        <div className="col-6" >
                        <button className="bg-success text-white btn  w-50" onClick={handleSpreedShheet}>spreedsheet</button>
                        </div>
                        <div className="col-6" >
                        <Link className="bg-success text-white btn  w-50" to={`/event/${eventId}/addVisitor`} >Add Manually</Link>

                        </div>

                    </div>
                   <table className="table table-hover table-striped">
                      <thead className="thead-dark">
                        <tr>
                         <th>emailPhone</th>
                         <th>Actions</th>
                         </tr>
                      </thead>
                    <tbody>
                {
                    listVisitors.map((visitor,index)=>(
                        <tr key={index}>
                            <td>{visitor.emailPhone}</td>
                            <td><button className="btn btn-block btn-danger"  id={`${index}-${visitor.emailPhone}`} onClick={handleDelete} >Delete</button></td>
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
         


        </>
    )
}

export default Event;