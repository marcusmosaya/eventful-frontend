import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import Gallery from "../components/gallery";
import Bar from "../components/Bar";
import "../styles/Gallery.css";
import Footer from "../components/Footer";
function GalleryPage(){
    let eventId=localStorage.getItem('eventId');
    let token=localStorage.getItem('accessToken');
    const [images,setImages]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    let navigate=useNavigate();
    const handleClick=()=>{
         navigate('/checkout')
    }
    const handleDownload=()=>{
        window.open(`http://localhost:5000/photo/${eventId}/download-zip`,'_blank');
    }
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/photo/${eventId}`,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            if(response.status===403){
                navigate('/auth/login');
            }
            if(response.status===401){
                throw new Error('You are not authorized to access this resource');
            }
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        }).then((data)=>{
               setImages(data);
           }
         ).catch((error)=>{
            console.log(error);
            setError(error);
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    if  (loading) return <div className='text-center'><em className='text-success h5'>Loading...</em></div>;
    if  (error) return <div className='text-center'><em className='text-danger h5'>{error}</em></div>;
    return(
        <>
        <Bar />
      <div className="container">
        <em className="h3" >Photos Gallery </em>&nbsp;{ images.length}<span> photos</span>
        {
          images.length>1 &&<div className="text-center mb-2" style={{position:'fixed',bottom:'5%', right:'0%'}}><button className="btn btn-success btn-sm  w-75" onClick={handleClick}>Wanna Download the photos?</button></div>
        }
        <Gallery images={images} eventId={eventId} />

      </div>
      <Footer />
      </>
    
    )
}
export default GalleryPage;