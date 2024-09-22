import React,{useRef,useState} from "react";
import '../styles/CameraDisplay.css';
function CameraCapture(){

     const videoRef=useRef(null);
     const [stream,setStream]=useState(null);

     const startCamera=async ()=>{
        try {
            const stream=await navigator.mediaDevices.getUserMedia({video:true});
            setStream(stream);

            if (videoRef.current) {
                videoRef.current.srcObject=stream;
            }
        } catch (error) {
            console.error('Error avvessing caamera:',error)
        }
     }
    const stopCamera=()=>{
        if (stream) {
            stream.getTracks().forEach((track)=>track.stop());
            setStream(null)
        }
    };
    const styles={
       

    }

return(
        <div className="camera-container" >
         <div className="camera" > 
         <video ref={videoRef} autoPlay playsInline  className="video"></video>
         </div>
  
        <div className="buttons">
        <button onClick={startCamera} className="shutterButton"  >Start Camera</button>
        </div>
        </div>
)
}

export default CameraCapture;