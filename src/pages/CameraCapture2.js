import React,{useRef,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/CameraDisplay2.css';
function CameraCapture2({setPhotos,photos}){
    console.log(photos)
     const videoRef=useRef(null);
     const canvasRef=useRef(null);
     let navigate=useNavigate();
     const [stream,setStream]=useState(null);
     const [capturedImage,setCapturedimage]=useState(null);
     const [orientation,setOrientation]=useState(window.orientation||0);
     const [img,setImg]=useState(null);
     let eventId=localStorage.getItem('eventId');
     let by=localStorage.getItem(`${eventId}By`);

    const stopCamera=()=>{
        if (stream) {
            stream.getTracks().forEach((track)=>track.stop());
            setStream(null)
        }
    }
    const capturePhoto=()=>{
        console.log(videoRef);
        if(videoRef.current && canvasRef.current){
            const canvas=canvasRef.current;
            const context=canvas.getContext('2d');
            canvas.width=videoRef.current.videoWidth;
            canvas.height=videoRef.current.videoHeight;
     
            context.drawImage(videoRef.current,0,0,canvas.width,canvas.height);
            const imageData=canvas.toDataURL('image/png');
            setPhotos([...photos,imageData]);

            canvas.toBlob((blob)=>{
                const newFile=new File([blob],"canvas-image.png",{type:blob.type});
            },'image/png')         
               
        }
    }
    
    const uploadPhoto=async ()=>{
         await stream.getTracks().forEach((track)=>track.stop());
         setStream(null);
         setTimeout(()=>{
            navigate('/photos/select');
         },1000)
        /*const formData=new FormData();
        console.log(img);
        console.log(capturedImage);
        formData.append('image',capturedImage);
        formData.append('eventId',eventId);
        formData.append('by',by);
        console.log(by);
        console.log(formData)
        if(capturedImage){
            try {
                const response=await fetch(`http://127.0.0.1:5000/photo/${eventId}/upload`,{
                    method:'POST',
                    body:formData,
                });
                console.log(response);
                if (response.ok){
                    alert('upload successful')
                }
                else{

                    alert('Failed')
                }
            } catch (error) {
                console.error(error);
            }
        }else{
            alert("No photo to upload")
        }*/
    }
    
     
    useEffect(()=>{
                 const startCamera=async ()=>{
        try {
            const stream=await navigator.mediaDevices.getUserMedia({video:true});
            setStream(stream);

            if (videoRef.current) {
                videoRef.current.srcObject=stream;
            }
        } catch (error) {
            console.error('Error accessing camera:',error)
        }
     }
        startCamera();
        return()=>{
            if (stream) {
                stream.getTracks().forEach((track)=>track.stop());
            }
        };
         
     },[]);
 
    
    
return(
        <div className="body" >
        <div className={`camera-display `} >
         <div className="camera-view" > 
         <video ref={videoRef} autoPlay playsInline  className="video-feed"></video>
         <canvas ref={canvasRef} style={{display:'none'}}></canvas>
         </div>     
         <button onClick={uploadPhoto} className="upload-button">upload</button>
        <button onClick={capturePhoto } className="shutter-button" >capture</button>
        </div>
        </div>
)
}

export default CameraCapture2;