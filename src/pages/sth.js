import React,{useEffect,useState} from 'react';
function Index(){
    let eventId=localStorage.getItem('eventId');
    let token=localStorage.getItem('accessToken');
    const [images,setImages]=useState([]);
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/photo/${eventId}`,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        }).then((data)=>{
               setImages(data);
           }
         ).catch((error)=>{
            console.log(error);
        })
    },[])

    return(
        <> 
          <div className="container">
           <h1>Image Gallery</h1>
            <Gallery images={images} />

          </div>
        </>
    )
}
export default Index;