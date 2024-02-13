import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsAPI } from '../services/allApi'

function Projects() {


  const [searchKey,setSearchKey]= useState("")



  const [allProjects, setAllProjects]=useState([])

  const getAllProjects = async ()=>{
    try{
      const token = sessionStorage.getItem("token")
      if (token){
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await getAllProjectsAPI(searchKey,reqHeader)
        if (result.status === 200){
          setAllProjects(result.data);

        }

      }
    } catch (err){
      console.log(err);
    }
  };
  console.log(allProjects);
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
    


  return (
    <div>

      <Header></Header>
      <div style={{marginTop:'100px'}} className='container-fluid'>
<div className='d-flex justify-content-between'>
<h1> All Projects</h1>
<input onChange={e=>setSearchKey(e.target.value)} style={{width:"300px"}} className='rounded p-2' placeholder='Seach project by language' type="text" />
</div>

<Row className="mt-5">
 { allProjects.length>0? allProjects.map((project,index)=>(
  <Col key={index} sm={12} md={6} lg={4}> 
  <ProjectCard project={project}/>
</Col>

 )) :
    <div className='fw-bold'>Nothing to see</div>
 }

</Row>


      </div>
    </div>
  )
}

export default Projects