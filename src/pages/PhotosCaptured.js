import React, { useState } from "react";
import Bar from "../components/Bar";
import "../styles/Gallery.css"
function CapturedPhotos({photos}){
    const [selectedPhotos,setselectedPhotos]=useState([]);

    const handlePhotoSelection=(photo)=>{
      if(selectedPhotos.includes(photo)){
        setselectedPhotos(selectedPhotos.filter((p)=>p!==photo))
      }else{
        setselectedPhotos([...selectedPhotos,photo])
      }
    }

    const uploadSelectedPhotos=()=>{
      const formData=new FormData();
      selectedPhotos.forEach((photo,index)=>{
        const blob=dataURLToBlob(photo);
        console.log(photo);
        formData.append('image',blob,`photo-${index+1}.png`);  
      })
      console.log(formData.image);
     /* fetch('/upload',{method:'POST',body:formData,}).then((response)=>response.json()).then((data)=>{
        alert(data.message);
      }).catch((error)=>{
        console.log(error);
      })*/
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
    let eventId=localStorage.getItem('eventId');
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
            selectedPhotos.length>0&&(
              <button onClick={uploadSelectedPhotos} className="btn btn-primary" >Upload photos</button>
            )
          }
        </>
    )
}
export default CapturedPhotos;