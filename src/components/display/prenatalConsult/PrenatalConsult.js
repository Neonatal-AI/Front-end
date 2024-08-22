import {React, useState, useRef} from 'react'

// internal react components
// visual components
import GradientButton from '../common/GradientButton'
import DropdownMenu from '../common/DropdownMenu'
import GetPrenatalConsult from './GetPrenatalConsult'
import Loading from '../common/Loading'

// functional components
import { visibilityToggle } from '../../functions/util'
import { useLocalStorage } from '../../functions/LocalCache'

// tried putting this in util but error ensued from illegal hook use... may be worth debugging for reusability...
const EnableContentEditable = (parentRef) => {
    if (parentRef.current) {
      const children = parentRef.current.querySelectorAll('*');
      children.forEach(child => {
        child.setAttribute('contentEditable', 'true');
      });
    }
  };
// tried putting this in util but error ensued from illegal hook use... may be worth debugging for reusability...
const DisableContentEditable = (parentRef) => {
    if (parentRef.current) {
      const children = parentRef.current.querySelectorAll('*');
      children.forEach(child => {
        child.setAttribute('contentEditable', 'false');
      });
    }
  };


const PrenatalConsult = ({sessionCookie, view='', setFormView}) => {
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

    const parentRef = useRef(null)
    const consultRef = useRef(null)
    const makeEditable = () => {
        EnableContentEditable(parentRef)
        visibilityToggle("False", "edit")
        visibilityToggle("True", "save edits")
    }
    const makeUneditable = () => {
        DisableContentEditable(parentRef)
        setPrenatalConsult(consultRef.current.innerHTML)
        visibilityToggle("True", "edit")
        visibilityToggle("False", "save edits")
    }

    // web hooks for output options
    const [prenatalConsult, setPrenatalConsult] = useLocalStorage('prenatalConsult', null);
    const [prompt, setPrompt] = useLocalStorage('prenatalPrompt', null);
    return(
        <div className='inputForm'>

            { view === 'input' && 
                <div className="PrenatalConsult">

                    <h3>Patient Information</h3>

                    {/* input fields */}
                    <div>                    
                        <div className='inputData'>
                            {/* used in BPD calculator and EPBO calculator */}
                            <label>Estimated Gestational Age (weeks):  </label>
                            <DropdownMenu options={[22, 23, 24, 25]} onSelect={(e)=>setGestationalAge(e)}/>
                            <br/>
                            
                                {/* used in BPD calculator and EPBO calculator */}
                            <label>Estimated birth weight (grams):  </label>
                            <span className="sidenote">Valid Ranges for Calculators: BPD: 501-1250 | EPBO: 401-1000</span>
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
                            <br/><br/>
                            </div>

                            <label htmlFor="pre_eclampsia"> Pre-eclampsia:  </label>
                            <DropdownMenu options={['True', 'False']} onSelect={(e)=>setPreEclampsia(e)}/>
                            <br/>
                            
                            
                                {/* only relevant for the GPT prompt */}
                            <label htmlFor="clinician_notes">Additional Notes:  </label>
                            <br/>
                            <textarea  contentEditable="inherit" rows="9" cols="50" id="clinician_notes" name="clinician_notes" onChange={(e)=>setclinicianNotes(e.target.value)}></textarea> 
                            <br/><br/>
                    </div>
                    {/* buttons for document creation */}
                    
                </div>
                <GradientButton 
                        type="submit" 
                        text="Create Prenatal Consult Docs"
                        // loading={loginLoading} // I need loginLoading back. it only looked like it didn't do anything
                        
                        onClick={async ()=>{
                            setFormView("loading")
                            GradientButton.loading = true;
                            GradientButton.disabled = true;
                            let consult = await Promise.allSettled(
                                [GetPrenatalConsult(    
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
                                    "Proficient",
                                    'false',
                                    ''
                            )]);
                            console.log("This is the consult response...\n",consult)
                            setPrenatalConsult(consult[0].value.document.choices[0].message.content.toString())
                            setPrompt(consult[0].value.prompt)
                            setFormView('output')
                            visibilityToggle('false', "loading");
                        }}
                    />
            </div>}

            {view === 'loading' && (
                                <Loading/>
                                )}

            {view=== 'output' &&(
            <div>
                    <div className="outputForm" ref={parentRef}>
                        <br/>
                        <p id="printable" ref={consultRef} dangerouslySetInnerHTML={{__html: prenatalConsult}} />
                        <br/>
                    </div>
                <button id="edit" onClick={makeEditable} >Edit text</button>
                <button style={{display:'none'}} id="save edits" onClick={makeUneditable} >Commit edits</button>
                <button style={{display:'none'}}>Submit form to database</button>
                <button onClick={() => setFormView('input')}>submit another form</button> 
            </div>)}
        </div>
    )
}
export default PrenatalConsult