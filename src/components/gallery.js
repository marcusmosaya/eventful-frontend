import React from "react";
import { useNavigate } from "react-router-dom";

function Gallery({images,eventId}){
    let navigate=useNavigate();
    return(
      <div className="gallery-container">
        {
          images.length<1 &&<h3>No photos currently uploaded</h3>
        }
       
        { 
          <div className="btn">Download the photos</div>&&
          images.map((image,index)=>(
               <div  key={index} onClick={()=>{navigate(`/photos/${image.photoId}`)}} className="gallery-item" loading='lazy' >
               <img  src={image.path}   alt={image.by}/>
               </div>
        
        ))}

      </div>
    )
}
export default Gallery;