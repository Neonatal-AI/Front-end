// npm modules
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

// internal components
import Home from './components/display/Home'
import Main from './components/display/Main'
import TOS from './components/display/TOS'
// // for later use when handling TOS submission
// import { UserProvider } from './context/Provider'
// import deleteCookies from './components/CookieRemoval'

const App = () => {

  let sessionCookie = Cookies.get('session')
  const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const togglemMenu = () => {
      setIsOpen(!isOpen);
    };
    return (
      <nav aria-haspopup="true" aria-expanded={isOpen} onClick={togglemMenu}>
        {/* link to an about page as home*/}
        {<Link className='nav' to="/">Home</Link>}
        <span style={{color: "white"}}>    |    </span>
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
          <Route path="/" element={<Home/>}/>
          <Route path="/tos" element={<TOS/>}/>
          {sessionCookie ? 
            <Route path='/main' element={<TOS/>} />          
          :
            <Route path="/main" element={<Main/>} />
          }
        </Routes>
    </Router>
    // </UserProvider>
  )

}

export default App;
