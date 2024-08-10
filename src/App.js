// npm modules
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

// internal components
// import { UserProvider } from './context/Provider'
import Login from './components/display/Login'
import RegistrationForm from './components/display/AccountCreation'
import Main from './components/display/Main'
import TOS from './components/display/TOS'
// import deleteCookies from './components/CookieRemoval'

const App = () => {

  let sessionCookie = Cookies.get('session')
  const Navigation = () => {
    return (
      <nav >
        {/* TOS should always be easily accessible */}
        {<Link className='nav' to="/tos">Terms of Service</Link>}
        <span style={{color: "white"}}>    |    </span>
        {/* only want this to render on page if user does have a valid session cookie */}
        {!sessionCookie && <Link className='nav' to="/main">Use The Tool</Link>}
        <br/>
      </nav>
      
    )
  }

  return (
    // <UserProvider>
    <Router>
      <Navigation />
      <Routes className={'nav'}>
        <Route path="/tos" element={<TOS/>}/>
        {sessionCookie ? (
          <Route path="/main" element={<Main />} />
        ) : (
          <Route path="/main" element={<Main />} /> 
        )}      
      </Routes>
    </Router>
    // </UserProvider>
  )

}

export default App;
