import React,{useState,useEffect} from "react";
import { useParams,Link, useNavigate, json} from "react-router-dom";
import Bar from "../components/Bar";
import Footer from "../components/Footer";
function EditPage(){
    const {photoId}=useParams();
    const eventId=localStorage.getItem('eventId');
    const token=localStorage.getItem('accessToken');
    const [photo,setPhoto]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    let navigate=useNavigate();
    const BASE_URL=`http://127.0.0.1:5000`;
    const handleDelete=async ()=>{
        let confirmed=window.confirm('Are you sure you want to delete this cannot be undone?')
        if(confirmed){
            try {
                const response=await fetch(`${BASE_URL}/photo/${eventId}/${photoId}`,{
                    headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
                    method:'DELETE',
                });
                if (response.ok){
                    let res=await response.json()
                    alert(res.message);
                    navigate('/photos');
                }
                else{
        
                    alert('Failed');
                }
                
            } catch (error) {
                
            }
        }
    }
    useEffect(()=>{
        fetch(`${BASE_URL}/photo/${eventId}/${photoId}`,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            if(response.status===403){
                navigate('/auth/login');
            }
            if(response.status===401){
                setLoading(false);

                throw new Error('You are not allow to view this protected resource');
            }
            if(response.status===404){
                setLoading(false);
                throw new Error('File Not Found');
            }
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        }).then((data)=>{
               setPhoto(data);
           }
         ).catch((error)=>{
            console.log(error);
            setError(error);
        }).finally(()=>{
            setLoading(false);
        })
    },[]);
    if(loading)return<div className="text-center text-success"><p>Loading...</p></div> ;
    if(error) return<div className="text-center"><em className="text-danger h5 ">{error.message}</em></div>; 

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
                <div className="btn btn-danger form-control w-75 btn-md text-white" onClick={handleDelete}>DELETE</div><br/>
             </div>
             
        </div>
            
     
    </div>
    <Footer />
    </>
    )
}

export default EditPage;