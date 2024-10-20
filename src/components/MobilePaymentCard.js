import React, { useState,useRef } from "react";
import { validatePhonenumber } from "../utilities/utility";
function MobilePaymentCard({option,setMobilePayment}){
    const inputRef=useRef();
    let eventId=localStorage.getItem('eventId');
    const [error,setError]=useState('')
    const hideMobilePayment=()=>{
        setMobilePayment(false)
    }
    const handleMobilePayment=()=>{
        let phoneNumber=inputRef.current.value;
        if(!phoneNumber){
            inputRef.current.style.borderColor='red';
            setError('Please type your phone number');
            return;
        }
        let isValidPhone=validatePhonenumber(phoneNumber);
        console.log(isValidPhone);
        if(!isValidPhone){
            inputRef.current.style.borderColor='red';
            setError('invalid phone number');
            return;
        }
        inputRef.current.style.borderColor='green';
        setError('');
        
        try{
            fetch('http://localhost:5000/pay/mpesa',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    phone:phoneNumber,
                    eventId:eventId
                }),
            }).then((response)=>response.json())
            .then((data)=>{
                if (data.error) {
                    alert('payment failed')
                }else{
                    alert('Payment initiated!please complete the payment')
                }
            });
        }catch(err){
            console.log(err)
        }
        
    }
    return(
        <>
        <div className="mobile-pop">
         <div className="card" >
            <div className="card-header">
                Mobile Money Payments--{option}
            </div>
            <div className="card-body">
                <div className="text-center">
                   <img  src='/mpesa-logo.jpg' className="p-1 bg-success" width={'30%'} height={'60px'}  />
                </div>
               <label htmlFor="phoneNumber"  className="mt-0 mb-2">Phone Number For Payments:</label>
               <input type="text" className="form-control mt-2 mb-1" name="phoneNumber" ref={inputRef} />
               <em className="text-danger">{error}</em>
               <div className="row">
                       <div className="col-6" onClick={handleMobilePayment}>
                          
                          <button className="btn btn-success  w-100">Pay</button>
                        </div>
                       <div className="col-6" onClick={hideMobilePayment}>
                        <button className="btn btn-danger  w-100">CANCEL</button>
                        </div>

               </div>
            </div>
         </div>
         </div>
        </>
    )
}
export default MobilePaymentCard;