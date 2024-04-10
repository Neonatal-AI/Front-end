import { useState, useEffect, React} from "react";
import GradientButton from '../common/GradientButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'js-cookie'

import DropdownMenu from './DropdownMenu';

const Main = () => {
        // variables and hooks
    const sessionCookie = Cookies.get('session')
    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1'

    // web hooks for input fields
    const [gestational_age, setGestationalAge] = useState(null)
    const [birth_weight, setBirthWeight] = useState(null)
    const [singleton, setSingleton] = useState(null)
    const [steroids, setSteroids] = useState(null)
    const [sex, setSex] = useState(null)
    const [ethnicity, setEthnicity] = useState(null)
    const [ruptured_membrane, setRupturedMembrane] = useState(null)
    const [length_of_ruptured_membrane, setLengthOfRupturedMembrane] = useState(null)
    const [pre_eclampsia, setPreEclampsia] = useState(null)
    const [clinician_notes, setclinicianNotes] = useState(null) 

    // web hooks for output options
    const [literacy_level, setLiteracyLevel] = useState(null)
    const [translate, setTranslate] = useState(null)
    const [language, setLanguage] = useState(null)


    const [view, setView] = useState('input') // toggle for view selection
    

    // a bunch of function expressions

    const resetHooks = () => {
        setGestationalAge(null)
        setBirthWeight(null)
        setSingleton(null)
        setSteroids(null)
        setSex(null)
        setEthnicity(null)
        setRupturedMembrane(null)
        setLengthOfRupturedMembrane(null)
        setPreEclampsia(null)
        setclinicianNotes(null)
        setLiteracyLevel(null)
        setTranslate(null)
        setLanguage(null)

    }

    const documentRequest = async () => {
        const document = {
        date: new Date(),
        userid: sessionCookie,
                inputFields: {
                    gestational_age: gestational_age,
                    birth_weight: birth_weight,
                    singleton: singleton,
                    steroids: steroids,
                    sex: sex,
                    ethnicity: ethnicity,
                    ruptured_membrane: ruptured_membrane,
                    length_of_ruptured_membrane:length_of_ruptured_membrane,
                    pre_eclampsia:pre_eclampsia,
                    clinician_notes:clinician_notes
                },
                outputOptions: {
                    literacy_level: literacy_level,
                    translate: translate,
                    language: language
                }
            }
        try {
            const response = await fetch(`${API_URL}/createDocs`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
            'Content-Type': 'application/json',
            id: sessionCookie
            },
            body: JSON.stringify(document),
        })
        if (!response.ok) {
            throw new Error(`HTTP error sending data to server! \n **************************\nstatus: ${response.status}`)
        }
        console.log(response)
            const data = await response.json()
        console.log(data)
        } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        }
    }

      
    return (
        <div className="app">
        <section className='main'>
            <h1>Neonatal Assistant</h1>
            {view === 'input' && (
            <div className="inputForm">
                
                <div className="inputData">
                <h2>Output Options</h2>
                    <label htmlFor="literacy_level">Parental <a href="https://nces.ed.gov/perf_levels.asp">literacy level</a>:</label>
                    <span className="sidenote">Literacy levels defined by National Center for Educational Statistics. See link for details.</span>
                    <DropdownMenu options={["Below Basic", "Basic", "Intermediate", "Proficient"]} onSelect={(e)=>setLiteracyLevel(e)}/>
                    <br/>

                    <label htmlFor="translate">Do they need this document translated?  </label>
                    <DropdownMenu options={["Yes", "No"]} onSelect={(e)=>setTranslate(e)}/>
                    <br/>
                    <div hidden><label htmlFor="translation_language">Language:  </label> <br/>
                    <DropdownMenu id="translateion_language" options={["Spanish", "Mandarin"]} onSelect={(e)=>setLanguage(e)}/></div>
                    <br/>

                    </div>
                {/* input fields */}
                <div className='inputData'> 
                    <h2>Patient Information</h2>
                        {/* used in BPD calculator and EPBO calculator */}
                    <label>Estimated Gestational Age (weeks):  </label>
                    <DropdownMenu options={[22, 23, 24, 25, 26, 27, 28, 29, 30]} onSelect={(e)=>setGestationalAge(e)}/>
                    <br/>
                    
                        {/* used in BPD calculator and EPBO calculator */}
                    <label>Estimated birth weight (grams):  </label>
                    <span className="sidenote">Valid Ranges for Calculators: BPD: 501-1250 | EPBO: 401-1000</span>
                    <textarea rows="1" cols="4" id="birth_weight" name="birth_weight" onChange={(e)=>setBirthWeight(e.target.value)}></textarea> 
                    <br/>

                        {/* used in BPD calculator only */}
                    <label>Singleton birth: </label>
                    <DropdownMenu options={['True', 'False']} onSelect={(e)=>setSingleton(e)}/>
                    <br/>

                        {/* used in BPD calculator only */}
                    <label>Antenatal Steroids: </label>
                                    <span className="sidenote">ANS should only be entered for postnatal day 1.</span>
                    <DropdownMenu options={['True', 'False']} onSelect={(e)=>setSteroids(e)}/>
                    <br/>

                        {/* used in BPD calculator and EPBO calculator */}
                    <label>Infant sex: </label>
                    <DropdownMenu options={['Male', 'Female']} onSelect={(e)=>setSex(e)}/>
                    <br/>

                    {/* used in BPD calculator only */}
                    <label htmlFor="ethnicity">Race / Ethnicity:  </label>
                    <DropdownMenu options={['White', 'Black', 'Hispanic']} onSelect={(e)=>setEthnicity(e)}/>
                    <br/>

                    <label htmlFor="ruptured_membrane"> Ruptured Membrane:  </label>
                    <DropdownMenu options={['True', 'False']} onSelect={(e)=>setRupturedMembrane(e)}/>
                    <br/>

                    <div id="length_of_ruptured_membrane" hidden>
                    <label> Length of Ruptured Membrane:  </label><br/>
                    <DropdownMenu options={[1, 2, 3, 4, 5, 6, 7, 8]} onSelect={(e)=>setLengthOfRupturedMembrane(e)}/>
                    <br/></div>

                    <label htmlFor="pre_eclampsia"> Pre-eclampsia:  </label>
                    <DropdownMenu options={['True', 'False']} onSelect={(e)=>setPreEclampsia(e)}/>
                    <br/>
                    
                                    <br/>
                    
                        {/* only relevant for the GPT prompt */}
                    <label htmlFor="clinician_notes">Additional Notes:  </label>
                    <br/>
                    <textarea rows="9" cols="60" id="clinician_notes" name="clinician_notes" onChange={(e)=>setclinicianNotes(e.target.value)}></textarea> 
                    <br/><br/>

                    

                    </div>
                {/* buttons for document creation */}

                <div className='navBarBottom'>
                <br/>
                <GradientButton 
                    type="submit" 
                    text="Create Prenatal Consult Docs"
                    // loading={loginLoading} // I need loginLoading back. it only looked like it didn't do anything
                    onClick={documentRequest}
                />
                <br></br>
                <br></br>
                
                </div>
            </div>
            )}

            {/* this is the page loading view. no big deal, really... but important nonetheless */}
            {view === 'loading' && (
            <div>
                <span className="flex items-center">
                <FontAwesomeIcon icon={faCircleNotch} spin />
                <span className="ml-2">Loading...</span>
                </span>
            </div>
            )}

            {/*  */}
            
        </section>
        </div>
    );
    
}

export default Main;
