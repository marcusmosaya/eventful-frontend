import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Bar from '../components/Bar';
function EventChanges(){
    let {eventId}=useParams();
    let navigate=useNavigate();
    const [event,setEvent]=useState({});
    let token=localStorage.getItem('accessToken');
    const url=`http://127.0.0.1:5000/event/${eventId}`;
    const tempError={name:'',description:'',startDateTime:'',endDateTime:'',accessibility:''};
    const [error,setError]=useState(tempError);
    const [loading,setLoading]=useState(true)
    let [minEnd,setMinEnd]=useState(event.startDateTime);
    const handleChange=(e)=>{
        setEvent({...event,[e.target.name]:e.target.value});
    }
    const handleCancel=async()=>{
        try {
            const response=await fetch(url,{
                headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                method:'DELETE',
            });
            console.log(response);
            if (response.ok){
                let res=await response.json();
                if(res.success===false){
                   alert(res.message);
                   return;
                }
                alert(res.message)
                navigate('/event/dashboard');
            }
            else{

                alert('Failed');
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit=async()=>{
        console.log(event);
        try {
            const response=await fetch(url,{
                headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                method:'PUT',
                body:JSON.stringify({
                    name:event.name,
                    description:event.description,
                    startDateTime:event.startDateTime.toString().slice(0, 19).replace('T', ' '),
                    endDateTime:event.endDateTime.toString().slice(0, 19).replace('T', ' '),
                    accessibility:event.accessibility,
                    previousAccessibility:event.previousAccessibility,
                }),
            });
            console.log(response);
            if (response.ok){
                let res=await response.json()
                console.log(res);
                if(res.success===false){
                   alert(res.message);
                   return;
                }

                navigate(`/event/${eventId}`);
            }
            else{

                alert('Failed');
            }
        } catch (error) {
            console.error(error);
        }
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
            data.previousAccessibility=data.accessibility;
            console.log(data);

            setLoading(false);
           setEvent(data);
           }
         ).catch((error)=>{
            console.log(error);
        })
        
 

},[])
 
  if(loading) return <p>Loading...</p>
  return(
    <>
      <Bar/>
      <div className='container' >
             <div className='text-center mb-5' >
               <em className='text-dark h2 '>Do you want to make changes?</em>
             </div>
           <div className='card mt-3'>
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
                    </div> 
                    <div className="row mb-2">
                        <div className="col-6">
                        <label htmlFor="startDateTime" >When is the event starting:{event.startDateTime.split('.')[0]}</label>
                        <input type="datetime-local" name="startDateTime" id="startDate" className="form-control"  value={event.startDateTime.split('.')[0]} onChange={handleChange} />
                        </div> 
                       <div className="col-6">
                       <label htmlFor="endDateTime" >When is the event ending:{event.endDateTime.split('.')[0]}</label>
                          <input type="datetime-local" name="endDateTime" id="endDate" className="form-control" value={event.endDateTime.split('.')[0]} onChange={handleChange} /> 
                       </div>  
                    </div> 
                    <div className="form-group mb-2">
                        <label >Accessibility:</label>
                        <div className="row">
                            { <>
                                 <div className="col-6">
                                 <input type="radio"  id="public" name="accessibility"   value={1}  checked={event.accessibility===true}  onChange={handleChange}  />
                                 <label className="form-check-label" htmlFor="public">Anyone in the Event can take a photo</label>
                           </div>
                           <div className="col-6">
                                 <input type="radio" id="private" name="accessibility"  value={0}  checked={event.accessibility===false}  onChange={handleChange}  />
                                 <label className="form-check-label" htmlFor="private">A select number can take photos</label>
                           </div>
                           </>
                            }
                       
                        </div>
                      
                    </div>
                     
                     <div className='row' >
                        <div className='col-6' >
                              <button className="btn bg-success text-white btn btn-lg form-control" onClick={handleSubmit}>Make changes To Event</button>
                        </div>
                        <div className='col-6' >
                            <button className="btn bg-danger text-white btn btn-lg form-control" onClick={handleCancel}>Cancel Event</button>
                        </div>
                     </div>

               </div>
           </div>
      </div>
    </>
  )
}

export default EventChanges;