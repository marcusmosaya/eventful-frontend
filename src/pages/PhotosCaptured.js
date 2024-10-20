import React, { useState } from "react";
import Bar from "../components/Bar";
import "../styles/Gallery.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
function CapturedPhotos({photos}){
    let navigate=useNavigate();
    const [selectedPhotos,setselectedPhotos]=useState([]);
    let eventId=localStorage.getItem('eventId');
    const handlePhotoSelection=(photo)=>{
      if(selectedPhotos.includes(photo)){
        setselectedPhotos(selectedPhotos.filter((p)=>p!==photo))
      }else{
        setselectedPhotos([...selectedPhotos,photo])
      }
    }

    const uploadSelectedPhotos=async ()=>{
      const formData=new FormData();
      Array.from(selectedPhotos).forEach((file,index)=>{
        const blob=dataURLToBlob(file);
        formData.append('image',blob,`photo-${index+1}.png`);
      })
      let by=localStorage.getItem(`${eventId}By`)
      formData.append('by',by);
      formData.append('eventId',eventId);
      console.log(formData);
      try {
                const response=await fetch(`http://127.0.0.1:5000/photo/${eventId}/upload`,{
                    method:'POST',
                    body:formData,
                });
                console.log(response);
                if (response.ok){
                    alert('upload successful');
                    navigate('/camera');
                }
                else{

                    alert('Failed')
                }
            } catch (error) {
                console.error(error);
            }
        
    }
    const dataURLToBlob=(dataURL)=>{
       const byteString=atob(dataURL.split(',')[1]);
       const mimeString=dataURL.split(',')[0].split(':')[1].split(';')[0];
       const ab=new ArrayBuffer(byteString.length);
       const ia=new Uint8Array(ab);
       for(let i=0;i<byteString.length;i++){
        ia[i]=byteString.charCodeAt(i);
       }
       return new Blob([ab],{type:mimeString});
    }
    return(
        <>
          <Bar />
          <h2>Select Photos to Upload</h2>
          <div className="gallery-container-1">
          {photos.map((photo,index)=>(
               <div  key={index}  loading='lazy' >
               <img  src={photo} alt={`photo-${index}`} className="img-thumbnail" style={{border:selectedPhotos.includes(photo)?'5px solid #228811':'5px solid transparent',cursor:'pointer'}}     onClick={()=>handlePhotoSelection(photo)}/>
               </div>
        ))}
          </div>
          {
            selectedPhotos.length>0&&<button onClick={uploadSelectedPhotos} className="btn btn-primary" >Upload photos</button>
            
          }
          <Footer />
        </>

    )
}
export default CapturedPhotos;