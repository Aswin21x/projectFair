import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectAPI } from '../services/allApi';
import { updateResponseContext } from '../Context/ContextShare';


function Edit({project}) {

  const {editResponse,setEditResponse} = useContext(updateResponseContext)
  const[projectData,setProjectData] = useState({
  id:project._id ,  title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
    })

    const[preview,setPreview] = useState("")


  const [show,setShow] = useState(false)
  const handleShow = ()=>setShow(true)
  const handleClose = ()=>{
    setShow(false)
  setProjectData({id:project._id ,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""}) 
  setPreview("")
  }


  useEffect(()=>{
    if (projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))

    }else{
      setPreview("")
    }
  },[projectData.projectImage])


  //
  const handleUpdateProject = async ()=>{
    const {id,title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages || !overview || !github || !website){
toast.info("please fill the form completely")
  }else{

    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("overview",overview)
    reqBody.append("website",website)
    reqBody.append("languages",languages)
    reqBody.append("github",github)
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization": `Bearer ${token}`

      }
console.log("proceed to call api");
try{
  const result = await updateProjectAPI(id,reqBody,reqHeader)
  if(result.status==200){
    handleClose()
    //share response to my project component
    setEditResponse(result.data)
  }else{
    console.log(result);
  }
}catch(err){

}
  }
  }
}
  return (

    
  <>
  <button onClick={handleShow} style={{textDecoration:'none'}} className='btn btn-link text-success d-flex fw-bold'><i className='fa-solid fa-edit me-2'></i></button>

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
        <img className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${project?.projectImage}`} alt="project upload pic" />
       </label>
        </div>
        <div className='col-lg-8'>
        <div className='mb-3'>
          <input value={projectData?.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} className=' border rounded p-2 w-100 ' type="text" placeholder='Project Title' />  
          </div>
          <div className='mb-3'>
          <input value={projectData?.languages}  onChange={e=>setProjectData({...projectData,languages:e.target.value})} className=' border rounded p-2 w-100 ' type="text" placeholder='Language Used' />  
          </div>
          <div className='mb-3'>
          <input value={projectData?.github}  onChange={e=>setProjectData({...projectData,github:e.target.value})} className=' border rounded p-2 w-100 ' type="text" placeholder='Project Github link' />  
          </div>
          <div className='mb-3'>
          <input value={projectData?.website}  onChange={e=>setProjectData({...projectData,website:e.target.value})}  className=' border rounded p-2 w-100 ' type="text" placeholder='Project Website link' />  
          </div>
          <div className='mb-3'>
          <input value={projectData?.overview}  onChange={e=>setProjectData({...projectData,overview:e.target.value})}  className=' border rounded p-2 w-100 ' type="text" placeholder='Project Overview' />  
          </div>


        </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
          Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />

  </>


  )
}

export default Edit