import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { addProjectAPI } from '../services/allApi';
import { addResponseContext } from '../Context/ContextShare';


function Add() {

 const {addResponse,setAddResponse} = useContext(addResponseContext)

  const[projectData,setProjectData] = useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
    })
    console.log(projectData);
  
    const[imageFileStatus,setImageFileStatus] = useState(false)
    const[preview,setPreview] = useState("")
    const [show,setShow] = useState(false)
    const handleShow = ()=>setShow(true)
    const handleClose = ()=>{
    setShow(false)
    setProjectData({  title:"",languages:"",overview:"",github:"",website:"",projectImage:""})
    }
  
    useEffect(()=>{



      if(projectData.projectImage?.type=="image/png" || projectData.projectImage?.type=="image/jpg" ||
      projectData.projectImage?.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectImage))
      }else{
      setPreview("")
      setProjectData({...projectData,projectImage:""})
      setImageFileStatus(false)
      }
    },[projectData.projectImage])

    const handleProjectUpload = async()=>{
      const{title,languages,overview,github,website,projectImage} = projectData
      if(!title ||!overview || !languages ||!github ||!website ||!projectImage){
      toast.warning("please fill the form completely!")
      }else{

        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("overview",overview)
        reqBody.append("website",website)
        reqBody.append("languages",languages)
        reqBody.append("github",github)
        reqBody.append("projectImage",projectImage)

        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization": `Bearer ${token}`

          }
        console.log("proceed to API call");
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            // toast.success(`New Project ${result.data.title} has added successfully!!!`);
            //share response to context
            setAddResponse(result.data)
            handleClose()
          }else{
            toast.warning(result.response.data)
          }
        }
        catch(err){
          console.log(err); 
               }

        }
        }
  
          }
        


        
  return (

  <>
  <button onClick={handleShow} style={{textDecoration:'none'}} className='btn btn-link text-success d-flex fw-bold'><i className='fa-solid fa-plus me-2'>Add Project</i></button>

  <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row'>
        <div className='col-lg-4'>
       <label>
        <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
        <img height={'200px'} width={'200px'} className='img-fluid mt-5' src={preview} alt="project upload pic" />
       </label>
       {!imageFileStatus&&

<div className='text-danger'>*upload only (jpg,jpeg,png)*</div>}



        </div>
        <div className='col-lg-8'>
        <div className='mb-3'>
          <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Title'
          value={projectData.title}  onChange={e=>setProjectData({...projectData,title:e.target.value})} />  
          </div>
          <div className='mb-3'>
          <input className=' border rounded p-2 w-100 ' type="text" placeholder='Language Used' 
           value={projectData.languages}  onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>  
          </div>
          <div className='mb-3'>
          <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Github link' 
           value={projectData.github}  onChange={e=>setProjectData({...projectData,github:e.target.value})} />  
          </div>
          <div className='mb-3'>
          <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Website link'
           value={projectData.website}  onChange={e=>setProjectData({...projectData,website:e.target.value})} />  
          </div>
          <div className='mb-3'>
          <input className=' border rounded p-2 w-100 ' type="text" placeholder='Project Overview' 
           value={projectData.overview}  onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>  
          </div>


        </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
          Cancel
          </Button>
          <Button onClick={handleProjectUpload} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />

  </>
  )
}

export default Add