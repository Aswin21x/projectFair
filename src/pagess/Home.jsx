import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import homeimg from '../assets/imgg.svg'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getHomeProjectsAPI } from '../services/allApi';




function Home() {

    
const [allProjects,setAllProjects]= useState([])

const[loginStatus,setLoginStatus]=useState(false)
const navigate = useNavigate()

const getHomeProjects = async ()=>{
    try{
        const result = await getHomeProjectsAPI()
        if(result.status===200){
            setAllProjects(result.data)
        }
    }catch(err){
        console.log(err);
    }
}
console.log(allProjects);
useEffect(()=>{
    getHomeProjects();
    if(sessionStorage.getItem("token")){
        setLoginStatus(true)
    }else{
        setLoginStatus(false)
    }
},[])

const handleNavigate = () =>{


    if(loginStatus===true){
        navigate('/projects')


    }else{
        toast.warning("Please Login First")
    }
}
  return (
    <>
    <div style={{height:"100vh"}} className='w-100 d-flex bg-dark justify-content-center align-items-center'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6'>
                <h1 className='fw-bold fs-1 text-white my-4'><i class="fa-solid fa-fire"></i> PROJECT FAIR <i class="fa-solid fa-fire"></i> </h1>
                    <p style={{ textAlign:'justify' , color:"white"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quisquam, in pariatur ad neque sed. 
                    Quisquam, iste recusandae exercitationem eligendi fuga est officiis fugit doloribus 
                    laboriosam sint vitae distinctio sequi!</p>
                   {loginStatus?  
                   <Link className='btn btn-success text-dark' to={'/dashboard'} >  Manage your projects <i class="fa-regular fa-paper-plane"></i> </Link> :
                   <Link className='btn btn-success text-dark' to={'/login'} > Explore Now <i class="fa-regular fa-paper-plane"></i></Link> 
                   }
                   


                </div>
                <div className='col-lg-1'></div>
                <div className='col-lg-4'>
                    <img className='img-fluid my-5 rounded' src={homeimg} alt="image not found" />
                </div>

            </div>


        </div>

    </div>

    {/* all projects part */}

    <div className='mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
<marquee>
    <div className='d-flex'>

{ allProjects.length > 0 && allProjects.map((project, index)=>(
    <div key={index} className='project me-3'>
    <ProjectCard project={project}/>
</div>

))
    
   
}

</div>
</marquee>


<div className='text-center mb-3'>
    <button onClick={handleNavigate} className='btn btn-success'>View More Projects</button>
</div>

</div>
<ToastContainer autoClose={2000} />

  
    </>
  )
}

export default Home