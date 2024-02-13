import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import SERVER_URL from '../services/serverUrl'

function ProjectCard({project}) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    
    <Card className='shadow mb-5 btn ' style={{ width: '20rem' }} onClick={handleShow} >
      <Card.Img variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
      <Card.Body>
        <Card.Title className='text-dark'>{project?.title}</Card.Title>

      </Card.Body>
    </Card>
    
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<Row className='align-items-center'>
  <Col sm={12} md={6}>
  <img height={'200px'} width={'300x'} src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
  </Col>
  <Col sm={12} md={6}>
<h2 className='fw-bold text-danger'>{project?.title}</h2>
<p>Project Overview : <span className='text-success'>{project?.overview}</span></p>
<p>Language used : <span className='text-danger'>{project?.languages}</span> </p>
  </Col>
</Row>

<div className='mt-3'>
  <a href={project?.github} target='_blank' className='btn'> 
  <i style={{color:"black" , cursor:"pointer"}} className='fa-brands fa-github'></i> </a>
  <a href={project?.website}>
  <i style={{color:"black" , cursor:"pointer"}} className='fa-solid fa-link'></i></a>
</div>

        </Modal.Body>
 
      </Modal>

    </>
  )
}

export default ProjectCard