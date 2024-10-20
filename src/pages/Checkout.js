import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../components/Bar";
import InvoiceCard from "../components/InvoiceCard";
import PaypalCard from "../components/PaypalCard";
import MobilePaymentCard from "../components/MobilePaymentCard";
function Checkout(){
    const BASE_URL='http://localhost:5000';
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [invoiceData,setInvoiceData]=useState({photosNumber:'',folderSize:'',totalCost:''});
    const [mobilePayment,setMobilePayment]=useState(false)
    let navigate=useNavigate();
    let eventId=localStorage.getItem('eventId');
    let token=localStorage.getItem('accessToken');
    const handleMobilePayment=()=>{
        setMobilePayment(true);
    }
    useEffect(()=>{
        fetch(`${BASE_URL}/event/${eventId}/bill`,{
            headers:{'Content-Type':'Application/json',"Authorization":`Bearer ${token}`},
            method:'GET',
        }).then(response=>{
            if(response.status===403){
                navigate('/auth/login');
            }
            if(response.status===401){
                setLoading(false);

                throw new Error('You are not allow to view this protected resource');
            }
            if(response.status===404){
                setLoading(false);
                throw new Error('File Not Found');
            }
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        }).then((data)=>{
              setInvoiceData(data.response)
              console.log(data)
           }
         ).catch((error)=>{
            console.log(error);
            setError(error);
        }).finally(()=>{
            setLoading(false);
        })
    },[]);
    if(loading)return<div className="text-center text-success"><p>Loading...</p></div> ;
    if(error) return<div className="text-center"><em className="text-danger h5 ">{error.message}</em></div>; 
    return(
        <>
        <Bar/>
        <div className="container">
            {mobilePayment && <MobilePaymentCard setMobilePayment={setMobilePayment} option={'M-PESA'}/>}
        <div className="row mt-5">
            <div className="col">
               <InvoiceCard photosNumber={invoiceData.photosNumber} folderSize={invoiceData.folderSize} totalCost={invoiceData.totalCost} name={invoiceData.name} email={invoiceData.email} invoiceNumber={invoiceData.number}/>
            </div>
            <div className="col  payment-container">
                <div className="row mt-3 ">
                    <div className="col bg-light" onClick={handleMobilePayment}>
                    <img  src="/mpesa-logo.jpg" className="p-1" style={{height:'150px',width:'100%',cursor:'pointer',backgroundColor:'green'}}  />
                    </div>
                </div>
                <div className="row mt-3">
                       <div className="col mt-3">
                          <PaypalCard   />
                       </div>
                    </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Checkout;