import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword,validateEmail } from "../utilities/utility";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
function Login(){
    const [data,setData]=useState({email:'',password:''});
    const tempError={email:'',password:''}
    const [error,setError]=useState(tempError);
    let navigate=useNavigate();
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const confirmValidInput=()=>{
        if(!data.email||!data.password){
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
            if(tempError.email===''&&tempError.password===''){
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
            return;
        }
        try {
            const response=await fetch('http://127.0.0.1:5000/auth/login',{
                headers:{'Content-Type':'Application/json',},
                method:'POST',
                body:JSON.stringify(data),
            });
            console.log(response);
            if (response.ok){
                let res=await response.json()
                console.log(res);
                if(res.success===false){
                   alert(res.message);
                   return;
                }
                localStorage.setItem('accessToken',res.token);
                console.log(localStorage.getItem('accessToken'));
                navigate('/event/dashboard');
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
                        <em className="h2">Welcome Back</em>
                </div>
                <div className="card-body">
                   <div className="form-group mb-1" >
                     <label htmlFor="email" >Email Address:</label>
                     <input type="email" id="email" className="form-control " name="email" value={data.email} onChange={handleChange} />
                     <em className="text-danger" >{error.email}</em>
                   </div>
                   <div className="form-group mb-1" >
                     <label htmlFor="password" >Password:</label>
                     <input type="password" id="password" className="form-control" name="password" value={data.password} onChange={handleChange} />
                     <em className="text-danger" >{error.password}</em>
                   </div>
                   <div className="form-group mb-1" >
                     <button className="form-control bg-success" onClick={handleSubmit} >Login</button>
                   </div>
                </div>
                <div className="card-footer text-center text-success">
                  <Link to='/auth/register'>Don't have an account?</Link>
                </div>

             </div>
         </div>
         <Footer />
        </>
    )
}
export default Login;