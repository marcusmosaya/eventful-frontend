import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Gallery from '../components/gallery';
import Footer from '../components/Footer';
function Index(){
    let eventId=localStorage.getItem('eventId');
    let token=localStorage.getItem('accessToken');
    let navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [images,setImages]=useState([]);
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
            setLoading(false)
        })
    },[])
    if  (loading) return <div className='text-center'><em className='text-success h5'>Loading...</em></div>;
    if  (error) return <div className='text-center'><em className='text-danger h5'>{error}</em></div>;
    return(
        <> 
          <div className="container">
           <h1>Image Gallery</h1>
            <Gallery images={images} />

          </div>
          <Footer/>
        </>
    )
}
export default Index;