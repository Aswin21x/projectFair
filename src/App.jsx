import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pagess/Home'
import Auth from './pagess/Auth'
import Dashboard from './pagess/Dashboard'
import Projects from './pagess/Projects'
import Footer from './components/Footer'
import { tokenAuthContext } from './Context/TokenAuth'
import { useContext } from 'react'
function App() {

  const {isAuthorized,setIsAuthorized}= useContext(tokenAuthContext)


  return (
    <>


<Routes>
  <Route path='/' element={ <Home></Home> }></Route>
  <Route path='/login' element={ <Auth></Auth> }></Route>
  <Route path='/register' element={ <Auth insideRegister></Auth> }></Route>
  <Route path='/dashboard' element={isAuthorized? <Dashboard></Dashboard> :  <Home></Home>}></Route>
  <Route path='/projects' element={isAuthorized? <Projects></Projects> : <Home></Home> }></Route>
  <Route path= '/*' element={<Navigate to={'/'}></Navigate>}></Route>

</Routes>
<Footer></Footer>


    </>
  )
}

export default App
