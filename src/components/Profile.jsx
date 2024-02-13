import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import profilepic from '../assets/propic1.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../services/allApi';
import SERVER_URL from '../services/serverUrl';


function Profile() {

  const [open, setOpen] = useState(false);
const [userData, setUserData]=useState({
  username:"",password:"",email:"",github:"",linkedin:"",profileImage:""
})
const [exisitingImage,setExistingImage] = useState("")
const [preview,setPreview] = useState("")

useEffect(()=>{
  if(sessionStorage.getItem("userDetails")){
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.
    email,github:userDetails.github,linkedin:userDetails.linkedin})
    setExistingImage(userDetails.profile)
  }
},[open])


useEffect(()=>{
  if(userData.profileImage){
    setPreview(URL.createObjectURL(userData.profileImage))
  }else{
    setPreview("")
  }
},[userData.profileImage])
console.log(userData);
const handleProfileUpdate = async (e)=>{
  e.preventDefault()
  const {username,password,email,github,linkedin,profileImage}= userData
if(!github || !linkedin ){
  toast.info("Please fill the form completely")
}else{
//proceed to call api
const reqBody = new FormData()
reqBody.append("username",username)
reqBody.append("password",password)
reqBody.append("email",email)
reqBody.append("github",github)
reqBody.append("linkedin",linkedin)
preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",exisitingImage)


const token = sessionStorage.getItem("token")
if(token){
  const reqHeader ={
    "Content-Type":preview?"multipart/form-data":"application/json",
    "Authorization" : `Bearer ${token}`
  }
  try{
    const result = await updateUserProfileAPI(reqBody,reqHeader)
    if(result.status==200){
      setOpen(!open)
      sessionStorage.setItem("userDetails",JSON.stringify(result.data))
    }else{
      console.log(result);
    }
  }catch(err){
    console.log(err);
  }
}

}
}



  return (
    <div className='border p-3 my-4 rounded'>
    <div className= 'justify-content-between d-flex'>
      <h4>Profile</h4>
      <button onClick={()=>setOpen(!open)} className='btn btn-outline-danger'><i class="fa-solid fa-wand-magic-sparkles"></i> </button>
    </div>
    <Collapse in={open}>
        <div className='text-center' id="example-collapse-text">
     

          <form>

          <label className='my-3' >
<input type="file" onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})}  style={{display:'none'}} />
{exisitingImage=="" ?
  <img width={'200px'} height={"200px"} className='img-fluid rounded-circle' src={preview?preview:profilepic} alt="Uplload profile pic" />

:
<img width={'200px'} height={"200px"} className='img-fluid rounded-circle' src={preview?preview:`${SERVER_URL}/Uploads/${exisitingImage}`} alt="Upload profile pic" />

}

          </label>

<div className='mb-3'>            
  <input className='rounded h-25 p-1 w-75' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})} type="text" placeholder='enter your git-hub link here' />
  </div>

  <div className='mb-3'>            
  <input className='rounded h-25 p-1 w-75' value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})} type="text" placeholder='enter your linkedin link here' />
  </div>

<div className='mb-3 d-grid w-75 mx-auto'>
<button onClick={handleProfileUpdate} className='btn btn-success'>Update </button>

</div>

          </form>

 

        </div>
      </Collapse>
      <ToastContainer />


    </div>
  )
}

export default Profile