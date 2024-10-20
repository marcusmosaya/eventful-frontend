import React from "react";
import axios from 'axios';
import {PayPalScriptProvider,PayPalButtons} from '@paypal/react-paypal-js';
function PaypalCard({amount}){
    const PAYPAL_CLIENT_ID='ARh3apa1si0Jql47U7WAe1OC4p4ixXZ1IVwobsolVWYIpX4biMrTvKFnrssPXUO5e5gnyIHEZbNRfZlb';
    const createOrder=async (data,actions)=>{
       try{
        const res=await axios.post(`http://localhost:5000/pay/paypal/create-order`);
        console.log(res.data.id);
        return res.data.id;

       }catch(error){
        console.log(error)
       }
    }
    const onApprove=(data,actions)=>{
          console.log(data)
        return fetch(`http://localhost:5000/pay/paypal/capture-order`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({orderID:data.id}),    
        }).then(res=>res.json())
        .then(data=>{
            alert('Transaction completed')
        });
    };
    return(
        <>
        <PayPalScriptProvider options={{"client-id":PAYPAL_CLIENT_ID}} >
            <PayPalButtons   createOrder={createOrder} onApprove={onApprove}   />
        </PayPalScriptProvider>
        </>
    )
}
export default PaypalCard;