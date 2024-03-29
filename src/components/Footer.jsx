import React from 'react'

function Footer() {
  return (
    <div className=' bg-dark d-flex align-items-center justify-content-center '>
      <div className=' container my-4 '>
       <div className='row'>
        <div className='col-lg-3'>
          <h5 className='text-light mt-4'><i class="fa-solid fa-fire"></i> PROJECT FAIR</h5>
        
        </div>
        <div className='col-lg-3'>
          <h5 className='mt-4  fs-6 mb-3 text-light'>About US</h5>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe mollitia quasi reiciendis culpa. Molestiae omnis aliquid ipsam totam, delectus enim? Aliquid, magnam doloremque quos doloribus quibusdam eligendi aut repellendus saepe!</p>
        </div>
<div className='col-lg-2'>
  <h3 className='mt-4 fs-6 mb-3 text-light'> Links </h3>

<li>Bootstrap</li>
<li>Route</li>
<li>React</li>
</div>

        <div className='col-lg-4'>
          <h5 className='mt-4 fs-6 mb-3 text-white text-center'>Contact US</h5>
          <input className='form-control mx-auto d-block w-50' placeholder='Enter your email' type="text" />
          <button className='mt-2 text-center mx-auto d-block btn btn-primary'>Send</button>
          <p className='text-center my-2'>2024ReactProject ©Aswin.A</p>
          <div className='text-center'>
            <i class="fa-brands fa-github me-2 "></i>
            <i class="fa-brands fa-linkedin me-2 "></i>
            <i class="fa-brands fa-reddit me- 2"></i>
          </div>
          
        </div>
        



       </div>


      </div>
    </div>
  )
}

export default Footer