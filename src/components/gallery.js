import React from "react";
import { Link } from "react-router-dom";
function Gallery({images,eventId}){
    return(
      <div className="gallery-container">
        {images.map((image,index)=>(
               <Link  to={`/photos/${image.photoId}`} key={index}  className="gallery-item" loading='lazy' >
               <img  src={image.path}  alt={image.by}/>
               </Link>
        
        ))}

      </div>
    )
}
export default Gallery;