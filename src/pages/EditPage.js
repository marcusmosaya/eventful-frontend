import React,{useState,useEffect} from "react";
import { useParams,Link, useNavigate} from "react-router-dom";
import Bar from "../components/Bar";
function EditPage(){
    const {photoId}=useParams();
    const eventId=localStorage.getItem('eventId');
    const token=localStorage.getItem('accessToken');
    const [photo,setPhoto]=useState(null)
    let navigate=useNavigate()
    const [image,setImage]=useState({});
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/photo/${eventId}/${photoId}`,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        }).then((data)=>{
               setPhoto(data);
           }
         ).catch((error)=>{
            console.log(error);
        })
    },[]);
    const handleSave=()=>{
        console.log("image saved");
        navigate(-1)
    }
    if (!photo) return <p>Loading ....</p>;
    return(
        <>
        <Bar />
      <div className="container">
        <img src={photo.path} className="img-thumbnail"alt={photo.by} style={{width:'100%',height:'65%'}} loading="lazy"/><br/>
        <div className="row mb-2 mt-2" >
               <span className="col-6">Taken BY</span>
               <em className="col-6">{photo.by}</em>
        </div>
        <div className="row mb-2">
               <span className="col-6">Taken AT</span>
               <em className="col-6">{photo.createdAt}</em>
        </div>
        
        <div className="row">
             <div className="col-6">
                  <Link className="btn btn-primary form-control w-75" to={-1}>Back</Link>
             </div>
             <div className="col-6">
                <div className="btn btn-danger form-control w-75 btn-md text-white">DELETE</div><br/>
             </div>
             
        </div>
            
    
    </div>
    </>
    )
}

export default EditPage;