import React, { act } from "react";
function InvoiceCard({photosNumber,folderSize,totalCost,name,email,invoiceNumber}){
    let actualYear=new Date();
    let month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return(
            <div className="invoice-card mt-3 mb-3">
                 <header>
                    <h5>Invoice #{invoiceNumber}</h5>
                    <p>Date:{actualYear.getDate()},{month[actualYear.getMonth()]},{actualYear.getFullYear()}</p>
                </header>
                <div className="invoice-details">
                    <div className="company-info">
                        <h4>From:</h4>
                        <h4>Eventful.com</h4>
                        <p>info@invoices.eventful.com</p>
                        <p>POBox 100,Nairobi</p>
                    </div>
                    <div className="client-info">
                        <h4>To:</h4>
                        <h4>{name}</h4>
                        <p>{email}</p>
                    </div>
                    </div>
                    <table className="invoice-items">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                           <td>Photos Folder Size</td>
                           <td>{folderSize} MB</td>
                            <td>0.0005</td>
                            <td>${(folderSize*0.0005).toFixed(5)}</td>
                        </tr>
                         <tr>
                         <td>Photos Number</td>
                            <td>{photosNumber}</td>
                            <td>0.02</td>
                            <td>${(photosNumber*0.05).toFixed(2)}</td>
                         </tr> 
                    </tbody>
                    <tfoot>   
                        <td colSpan={3} style={{textAlign:'right'}}><strong>Total:</strong></td> 
                        <td colSpan={2} style={{textAlign:'right',borderBottom:'1px green solid'}}><em style={{borderBottom:'2px green dashed'}}>${totalCost.toFixed(5)}</em></td>
                    </tfoot>
                    </table>

                </div>
                
    )
}
export default InvoiceCard;