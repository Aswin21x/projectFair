import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import TokenAuth, { tokenAuthContext } from '../Context/TokenAuth';


function Header({insideDashBoard}) {

  const {isAuthorized,setIsAuthorized}= useContext(tokenAuthContext)
  const navigate = useNavigate()
const handleLogout = ()=>{
  sessionStorage.clear()
  setIsAuthorized(false)
  navigate('/')
}

  return (
    <div>
  
  <Navbar style={{width:'100%', position:"fixed" , top:"0px" , zIndex:5}} className="bg-dark p-3">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{textDecoration:"none"}}>   <h5 className='text-light fw-bold'> <i class="fa-solid fa-fire"></i> PROJECT FAIR <i class="fa-solid fa-fire"></i> </h5> </Link>
           
          </Navbar.Brand>

          {
  insideDashBoard &&
  <div className='ms-auto'>
    <button onClick={handleLogout} style={{ textDecoration: "none" }} className='btn btn-link text-info fw-bold'> <i class="fa-solid fa-face-sad-tear"></i> LOG OUT </button>
  </div>
}


        </Container>
      </Navbar>

    </div>
  )
}

export default Header