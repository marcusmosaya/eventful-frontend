import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail,validatePassword } from "../utilities/utility";
import Footer from "../components/Footer";
function Register(){
    const [data,setData]=useState({email:'',password:'',confirmPassword:''});
    const tempError={email:'',password:'',confirmPassword:''};
    const [error,setError]=useState(tempError);
    let navigate=useNavigate();
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const confirmValidInput=()=>{
        if(!data.email||!data.password||!data.confirmPassword){
            alert('Please fill all spaces');
        }else{
            if(data.email){
                tempError.email=''
               if(!validateEmail(data.email)){
                 tempError.email='Invalid Email format'
               }
            }
            if(data.password){
                tempError.password=''
                if(!validatePassword(data.password)){
                    tempError.password='A password should have at least 8 characters with at least a digit,lowercase,uppercase letter and special character.'
                }
            }
            if(data.confirmPassword){
                tempError.confirmPassword=''
                if(data.password!==data.confirmPassword){
                   tempError.confirmPassword='The confirm password does not match password'
                }
            }
            if(tempError.email===''&&tempError.password===''&&tempError.confirmPassword===''){
                return true;
            }
            else{
                setError(tempError);
                return false;
            }
        }
    }
    

    const handleSubmit=async()=>{
        let isValid=confirmValidInput();
        if(!isValid){
            console.log('hiiii');
            return;
        }
        try {
            const response=await fetch('http://127.0.0.1:5000/user/',{
                headers:{'Content-Type':'Application/json'},
                method:'POST',
                body:JSON.stringify({email:data.email,password:data.password}),
            });
            console.log(response);
            if (response.ok){
                let res= await response.json()
                if(res.success===false){
                   alert(res.message);
                   return;
                }
                navigate('/auth/login');
            }
            else{

                alert('Failed')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
         <div className="container" >
             <h2 className="text-dark text-center mt-5" >Eventful.com</h2>
             <div className="card">
                <div className="card-header text-white text-center bg-primary">
                        <em className="h2">Registration</em>
                </div>
                <div className="card-body">
                   <div className="form-group mb-1" >
                     <label htmlFor="email" >Email Address:</label>
                     <input type="email" id="email" className="form-control" name="email" value={data.email} onChange={handleChange} />
                     <em className="text-danger">{error.email}</em>
                   </div>
                   <div className="form-group mb-1" >
                     <label htmlFor="password" >Password:</label>
                     <input type="password" id="password" className="form-control" name="password" value={data.password} onChange={handleChange} />
                     <em className="text-danger">{error.password}</em>
                   </div>
                   <div className="form-group mb-1" >
                     <label htmlFor="confirmPassword" >Confirm Password:</label>
                     <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
                     <em className="text-danger">{error.confirmPassword}</em>
                   </div>
                   <div className="form-group mb-1" >
                     <button className="form-control bg-success" onClick={handleSubmit} >Register</button>
                   </div>
                </div>

             </div>
         </div>
         <Footer />
        </>
    )
}
export default Register;