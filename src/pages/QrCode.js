import React, { useState,useRef } from "react";
import {QRCodeCanvas} from 'qrcode.react';
function QrCodeGen({qrURL}){
    const qrRef=useRef();
    const downloadQRCode=()=>{
        const canvas=qrRef.current.querySelector('canvas');
        const pngUrl=canvas.toDataURL('image/png').replace('image/png','image/octet-stream');
        const downloadLink=document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href=pngUrl;
        downloadLink.download='eventQrCode.png';
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    return(
        <>
        <div ref={qrRef} className="text-center">
         <QRCodeCanvas  value={qrURL} size={256} bgColor={'#ffffff'} fgColor={'#4477CC'} level={'L'} includeMargin={true}  /><br/>
         <button onClick={downloadQRCode} className="btn btn-primary form-control w-50" >Download QRCode image</button>
         </div>
        </>
    )
}
export default QrCodeGen;