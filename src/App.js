// npm modules
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

// internal components
import { UserProvider } from './context/Provider'
import Login from './components/display/Login'
import RegistrationForm from './components/display/AccountCreation'
import Main from './components/display/Main'
import deleteCookies from './components/CookieRemoval'
import GradientButton from './components/common/GradientButton'

const App = () => {

  let sessionCookie = Cookies.get('session')
  const [loginLoading, setLoginLoading] = useState(false)
  const Navigation = () => {
    return (
      <nav>
        {/* only want this to render on page if user does not have a valid session cookie */}
        {!sessionCookie && <Link to="/login"><font size="+2">Login |</font> </Link>}
        {!sessionCookie && <Link to="/register"><font size="+2">Register |</font> </Link>}

        {/* only want this to render on page if user does have a valid session cookie */}
        {!sessionCookie && <Link to="/main"><font size="+2">Main</font></Link>}
        <br/>
        {!sessionCookie && <GradientButton 
        className="logout"
        type="submit" 
        text="LOGOUT"
        loading={loginLoading}
        onClick={ () =>{
          setLoginLoading(true)
          deleteCookies()
          setLoginLoading(false)
          window.location.reload()
        }}
      />}

      </nav>
    )
  }

  return (
    <UserProvider>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<RegistrationForm />} />
        {sessionCookie ? (
          <Route path="/main" element={<Login />} />
        ) : (
          <Route path="/main" element={<Main />} /> 
        )}      
      </Routes>
    </Router>
    </UserProvider>
  )

}

export default App;
