import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import authimg from '../assets/imgg2.png'
import { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allApi';
import { Spinner } from 'react-bootstrap';
import { tokenAuthContext } from '../Context/TokenAuth';

function Auth({insideRegister}) {

  const {isAuthorized,setIsAuthorized}= useContext(tokenAuthContext)

  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()

const [userInputData,setUserInputData] = useState({
  username:"",email:"",password:""
})

 const handleRegister = async (e)=>{
  e.preventDefault()
  // console.log(userInputData);
  const {username,email,password}=userInputData
 if(!username || !email || !password){
  // alert("please fill all the data")

  toast.warn('🦄 Please fill all the data!', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
    
 }else{

  try{
    const result = await registerAPI(userInputData)
    console.log(result);
    if (result.status===200){
      toast.success
      (`Welcome ${result.data.username}...Please login to explore our site`)
      setUserInputData({username:"",email:"",password:""})

      //navigate to loggin
      setTimeout(()=>{
        navigate('/login')
      },2000)

    }else{
      toast.error(result.response.data)
    }
  }catch(err){
    console.log(err);
  }
 }
 }

//login
const handleLogin = async (e)=>{
  e.preventDefault()
  const {email,password} = userInputData
  if (!email || !password){
    toast.info("Please fill the form completely")
  }else{
    try{
      const result = await loginAPI({email,password})
      console.log(result);
      if(result.status===200){
        setLoginStatus(true)
        setIsAuthorized(true)

        //store token ,username
        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("userDetails", JSON.stringify(result.data.existingUser))
        setTimeout(()=>{
        setUserInputData({email:"",password:""})
      //navigate to landinf page
      navigate("/")
      setLoginStatus(false)

        },2000);
   

      }else{
        toast.error(result.response.data)
      }
    }catch(err){
      console.log(err);
    }
  }
}


  return (
    
    <div  style={{width:'100%', height:'100vh'}} className='justify-content-center align-items-center d-flex'>
      <div className='container w-75'>
        <Link to={'/'} className='text-dark btn btn-warning my-1' style={{textDecoration:'none'}}> <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Back To Home</Link>
        <div className='card-shadow p-5 bg-info'>
        <div className='row align-items-center'>

        <div className='col-lg-6'>
       <img className='w-100 img-fluid rounded' src={authimg} alt="no image found" />
       </div>

  <div className='col-lg-6'>
  <h1 className='fw-bold text-light mt-2'><i style={{height:'41px'}} class="fa-solid fa-fire"></i> PROJECT FAIR </h1>
  <h5>Sign {insideRegister?'Up':'In'} to your Account</h5>
  
  <Form>
    {
      insideRegister&&
  

 <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="email" placeholder="Enter name" value={userInputData.username} onChange={e=>setUserInputData({...userInputData,username:e.target.value})} />
        </Form.Group>
}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" value={userInputData.email} onChange={e=>setUserInputData({...userInputData,email:e.target.value})} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPswd">
          <Form.Control type="password" placeholder="Enter password" value={userInputData.password} onChange={e=>setUserInputData({...userInputData,password:e.target.value})} />
        </Form.Group>
        {
          insideRegister?
          <div>
            <button onClick={handleRegister} className='btn btn-success mb-2'> Register</button>
            <p className='text-dark'>Already have an Account? Click here to <Link to={'/login'} className='text-light'> Login</Link></p>
          </div> : 
          <div>
            <button onClick={handleLogin} className='btn btn-success mb-2'>Login {loginStatus&& < Spinner animation="grow" variant="danger" />} </button>
            <p className='text-dark'>New User? Click here to <Link to={'/register'} className='text-light'>Register</Link></p>
          </div>
        }
 

    </Form>
  
  
  </div>




        </div>
        </div>
      </div>
      
      <ToastContainer />

    </div>
  )
}

export default Auth