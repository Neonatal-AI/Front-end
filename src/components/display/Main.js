import { useState, React} from "react"
import Cookies from 'js-cookie'


// internal image imports
import nortonLogo from './../../images/norton.png'
import uoflHealthLogo from './../../images/uoflHealthLogo.png'

// internal react components
import PrenatalConsult from "./prenatalConsult/PrenatalConsult"
import Handout from "./handout/Handout"

const Main = () => {

    const sessionCookie = Cookies.get('session')

    // view setting hooks and change events
    const [ view, setView] = useState('')
    const [ conaultView, setConsultView] = useState('input')
    const [ handoutView, setHandoutView] = useState('input')
    return (
        
        <div className="app">
        <section className='main'>
            <h2>Neonatal AI <img src={nortonLogo} alt="NortonLogo"/> <img src={uoflHealthLogo} alt="UofLHealthLogo"/></h2>
            
            {view === '' && (
            <h2>Get started by selecting an option!</h2>
            )}
            <div className="selectionArea">
                <button onClick={() => setView("PrenatalConsult")}> Create Prenatal Consult </button>
                <button onClick={()=>setView("Handout")}> Create Handout </button>
            </div>
            
            {view === 'PrenatalConsult' && (
            <PrenatalConsult sessionCookie={sessionCookie} view={conaultView} setFormView={setConsultView}/>
            )}
            {view === 'Handout' && (
            <Handout sessionCookie={sessionCookie} view={handoutView} setFormView={setHandoutView}/>
            )}
        </section>
        </div>
    );
    
}

export default Main
