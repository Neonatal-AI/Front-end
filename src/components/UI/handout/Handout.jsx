import {React, useState, useRef} from 'react'
import ReactToPrint from 'react-to-print'

// internal react components
// visual components
import GradientButton from '../common/GradientButton'
import DropdownMenu from '../common/DropdownMenu'
import Loading from '../common/Loading'

// functional components
import FetchDocument from '../../functional/FetchDocument'
import { useLocalStorage } from '../../functional/LocalCache'
import { visibilityToggle } from '../../functional/util'

// tried putting this in util but error ensued from illegal hook use... may be worth debugging for reusability...
const EnableContentEditable = (parentRef) => {
    if (parentRef.current) {
      const children = parentRef.current.querySelectorAll('*')
      children.forEach(child => {
        child.setAttribute('contentEditable', 'true')
      })
    }
  }
const DisableContentEditable = (parentRef) => {
    if (parentRef.current) {
      const children = parentRef.current.querySelectorAll('*')
      children.forEach(child => {
        child.setAttribute('contentEditable', 'false')
      })
    }
  }
  
const Handout = ({sessionCookie, view='', setFormView}) => {
    // variables and hooks
    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1'

    // web hooks for input fields
    const [gestational_age, setGestationalAge] = useState(null)
    const [birth_weight, setBirthWeight] = useState(null)
    const [singleton, setSingleton] = useState('')
    const [steroids, setSteroids] = useState('')
    const [sex, setSex] = useState('')
    const [ethnicity, setEthnicity] = useState('')
    const [ruptured_membrane, setRupturedMembrane] = useState('')
    const [length_of_ruptured_membrane, setLengthOfRupturedMembrane] = useState(null)
    const [pre_eclampsia, setPreEclampsia] = useState('')
    const [clinician_notes, setclinicianNotes] = useState('') 
    
    // web hooks for output options
    const [literacy_level, setLiteracyLevel] = useState('')
    const [translate, setTranslate] = useState('')
    const [language, setLanguage] = useState('')
    
    // hooks for locally stored document
    const [prenatalConsult, setPrenatalConsult] = useLocalStorage('parentalHandout', null)
    const [prompt, setPrompt] = useLocalStorage('handoutPrompt', null)
    const parentRef = useRef(null)
    const handoutRef = useRef(null)

    const makeEditable = () => {
        EnableContentEditable(parentRef)
        visibilityToggle(false, "edit")
        visibilityToggle(true, "save edits")
    }
    const makeUneditable = () => {
        DisableContentEditable(parentRef)
        setPrenatalConsult(handoutRef.current.innerHTML)
        visibilityToggle(true, "edit")
        visibilityToggle(false, "save edits")
    }

    return(
        <div className='inputForm'>

            { view === 'input' && 
                <div className="Handout">

                    <h3>Patient Information</h3>
                    <h3>Output Options</h3>

                    {/* input fields */}
                        <div className='inputData'>
                            {/* used in BPD calculator and EPBO calculator */}
                            <label>Estimated Gestational Age (weeks):  </label>
                                <DropdownMenu options={[22, 23, 24, 25]} onSelect={(e)=>setGestationalAge(e)}/>
                                <br/>
                            {/* used in BPD calculator and EPBO calculator */}
                            <label>Estimated birth weight (grams):  </label>
                                <span className="sidenote">Valid Ranges for Calculators: BPD: 501-1250 | EPBO: 401-1000</span>
                                <br/>
                                <textarea rows="2" cols="6" id="birth_weight" name="birth_weight" onChange={(e)=>setBirthWeight(e.target.value)}></textarea> 
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
                                <DropdownMenu options={['True', 'False']} onSelect={[setRupturedMembrane, (e)=>visibilityToggle(e, "length_of_ruptured_membrane")]}/>
                                <br/>
                            <div id="length_of_ruptured_membrane">
                                <label> Length of Ruptured Membrane:  </label><br/>
                                <DropdownMenu options={[1, 2, 3, 4, 5, 6, 7, 8]} onSelect={(e)=>setLengthOfRupturedMembrane(e)}/>
                            <br/>
                            <br/>
                            </div>
                            <label htmlFor="pre_eclampsia"> Pre-eclampsia:  </label>
                                <DropdownMenu options={['True', 'False']} onSelect={(e)=>setPreEclampsia(e)}/>
                            <br/>                            
                            {/* only relevant for the GPT prompt */}
                            <label htmlFor="clinician_notes">Additional Notes:  </label>
                            <br/>
                            <textarea  contentEditable="inherit" rows="9" cols="50" id="clinician_notes" name="clinician_notes" onChange={(e)=>setclinicianNotes(e.target.value)}></textarea> 
                            <br/>
                            <br/>
                    {/* buttons for document creation */}
                    </div>
                    <div className="inputData">
                            <label htmlFor="literacy_level">Parental <a href="https://nces.ed.gov/nationsreportcard/ltt/reading-descriptions.aspx">literacy level</a>:</label>
                            <span className="sidenote">Literacy levels defined by National Center for Educational Statistics. See link for details.</span>
                            <DropdownMenu id="literacy" options={["Below Basic", "Basic", "Intermediate", "Proficient"]} onSelect={(e)=>setLiteracyLevel(e)}/>
                            <br/>

                            <label htmlFor="translate">Do they need this document translated?  </label>
                            <DropdownMenu options={["True", "False"]} onSelect={ [setTranslate, (e)=>visibilityToggle(e, "translation_language")]}/>
                            <br/>
                            <div id="translation_language" >
                                <label htmlFor="translation_language">Language:  </label> 
                                <br/>
                                <DropdownMenu  options={["Spanish", "Mandarin"]} onSelect={(e)=>setLanguage(e)}/></div>
                            <br/>
                    </div>
                <GradientButton 
                        type="submit" 
                        text="Create Prenatal Consult Docs"
                        onClick={async ()=>{
                            setFormView("loading")
                            GradientButton.loading = true
                            GradientButton.disabled = true
                            let consult = await Promise.allSettled(
                                [FetchDocument(    
                                    sessionCookie, 
                                    API_URL, 
                                    gestational_age, 
                                    birth_weight, 
                                    singleton, 
                                    steroids,
                                    sex,
                                    ethnicity,
                                    ruptured_membrane,
                                    length_of_ruptured_membrane,
                                    pre_eclampsia,
                                    clinician_notes,
                                    literacy_level,
                                    translate,
                                    language,
                                    'handout'
                                    )
                                ]
                            )
                            setPrenatalConsult(consult[0].value.document)
                            setPrompt(consult[0].value.prompt)
                            setFormView('output')
                            visibilityToggle('false', "loading")
                        }}
                    />
                <button onClick={async ()=>{setFormView('output')}}>View most recently generated doc</button>
            </div>}

            {view === 'loading' && (<Loading/>)}

            {view === 'output' &&(
                <div>
                    <div className="outputForm" ref={handoutRef}>
                        <br/>
                        <p id="printable" dangerouslySetInnerHTML={{__html: prenatalConsult}} />
                        <br/>
                    </div>

                    <button id="edit" onClick={makeEditable} >Edit text</button>
                    <button style={{display:'none'}} id="save edits" onClick={makeUneditable} >Commit edits</button>
                    <button style={{display:'none'}}>Commit This Form to Database</button>
                    <ReactToPrint
                        trigger={() => <button>Print This Document</button>}
                        content={() => handoutRef.current} // Ref to the component to be printed
                    />
                    <button onClick={() => setFormView('input')}>Submit Another Form</button>
                </div>)
            }
        </div>
    )
}
export default Handout