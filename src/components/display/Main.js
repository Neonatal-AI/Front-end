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


    // relevant to setting the document to be displayed. Might eb something we use... might not
    // const [ViewResume, setViewResume] = useState(null)

    const [view, setView] = useState('input') // toggle for view selection
    const [historyData, setHistoryData] = useState([])


    // a bunch of function expressions

    const resetHooks = () => {
        // an example of resetting the hook, we might want to do something like this with the Neonatal project
        // in particular, we might want to utilize hooks to display items from the history sidebar
        // setOptimizedResume(null)

    }

    const documentRequest = async () => {
        const document = {
            //  data we are using to generate documents: 
            // Date, user agreement cookie, input fields, output options...
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

        // console.log(document)
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
                throw new Error(`HTTP error sending data to server! \n **************************\nstatus: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error)
        }
    }

    const historyPost = async () => {
        // doc to send to database
        const document = {
            date: new Date(),
            userid: sessionCookie
        }
        try {
        const response = await fetch(`${API_URL}/historyPost`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
            'Content-Type': 'application/json',
            id: sessionCookie
            },
            body: JSON.stringify(document),
        })
        if (!response.ok) {
            throw new Error(`HTTP error sending data to server! \n **************************\nstatus: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        }
    }

    // use effect to update values of display fields
    // yeah yeah yeah but we really want to use sockets
    useEffect(() => {
        if (/*optimizedResume !== null && optimizedCover !== null && jobSummary !== null && assessment !== null*/null) {
            historyPost(); // function to post data to database 
            // setViewResume(optimizedResume);
            // setViewCover(optimizedCover);
            // setViewAssessment(assessment);
            resetHooks()
            setView('resume');
        alert("Your application docs are ready!")
        }
    }, [/*optimizedResume, optimizedCover, jobSummary, assessment*/ ]); //these are the items "watched" by useEffect here
    
    // using effect to update history when the page refreshes
    // yeah yeah yeah but we really want to use sockets but this is still useful
    useEffect(() => {
        try{
            const fetchHistory = async () => {
                const response = await fetch(`${API_URL}/historyGet`, {
                    method: 'GET',
                    credentials: 'include', 
                    headers:{
                        id: sessionCookie
                    }
                });

                const data = await response.json();
                setHistoryData(data);
                }
        fetchHistory();
        }catch (error) {
        console.log(error)
        alert("OH NO! we couldn't get the history from the server.")
        }
    }, []);
    
    return (
        <div className="app">
            
            {/* the history sidebar */}
        {/* <section className="side-bar"> */}

            {/* this MIGHT be a router component later...*/}
            {/* <button onClick={() => setView('input')}> */}
            {/* + Create clerical documents */}
            {/* </button> */}

            {/* this MIGHT be a router component later...*/}
            {/* <ul className="history"> */}
            {/* {historyData.map((item, index) => ( */}
                {/* <li key={index} onClick={() => { */}
                    {/* // this is where we will set the view to the historical clerical document */}
                {/* // setViewResume(item.optimizedResume); */}
                {/* // setViewCover(item.optimizedCover); */}
                {/* // setViewAssessment(item.assessment); */}
                {/* setView('resume') */}
            {/* }}> */}
                {/* Display relevant fields from item */}
                {/* {item.date.slice(0,10)} */}
                {/* {<br></br>} */}
                {/* {item.date.slice(10,-5)} */}
                {/* {<br></br>} */}
                {/* {<br></br>} */}
                {/* {item.summary} */}
                {/* </li> */}
            {/* ))} */}
            {/* </ul> */}
            {/* <nav> */}
            {/* <image src="../../../public/norton.jpg" alt="norton logo" style="width: 100px; height: 100px;"/> */}
            {/* <p>This section contains historical clerical documents</p> */}
            {/* </nav> */}
        {/* </section> */}

        {/* this will be a router component*/}
        <section className='main'>
            {/* just the title */}
            <h1>Neonatal Assistant</h1>


            {view === 'input' && (
            <div className="inputForm">
                
                <div className="inputData">
                <h2>Output Options</h2>
                    {/* literacy level */}
                <label htmlFor="literacy_level">Parental <a href="https://nces.ed.gov/perf_levels.asp">literacy level</a>:</label>
                <span className="sidenote">Literacy levels defined by National Center for Educational Statistics. See link for details.</span>
                <DropdownMenu options={["Below Basic", "Basic", "Intermediate", "Proficient"]} onChange={(e)=>setLiteracyLevel(e.target.value)}/>
                <br/>

                    {/* Translation? */}
                <label htmlFor="translate">Do they need this document translated?  </label>
                <DropdownMenu options={["Yes", "No"]} onChange={(e)=>setTranslate(e.target.value)}/>
                <br/>
                <div hidden><label htmlFor="translation_language">Language:  </label> <br/>
                <DropdownMenu id="translateion_language" options={["Spanish", "Mandarin"]} onChange={(e)=>setLanguage(e.target.value)}/></div>
                <br/>

                </div>
                {/* input fields */}
                <div className='inputData'>
                <h2>Patient Information</h2>
                    {/* used in BPD calculator and EPBO calculator */}
                <label>Estimated Gestational Age (weeks):  </label>
                <DropdownMenu options={[22, 23, 24, 25, 26, 27, 28, 29, 30]} onChange={(e)=>setGestationalAge(e.target.value)}/>
                <br/>

                    {/* used in BPD calculator and EPBO calculator */}
                <label>Estimated birth weight (grams):  </label>
                <span className="sidenote">Valid Ranges for Calculators: BPD: 501-1250 | EPBO: 401-1000</span>
                <textarea rows="1" cols="4" id="birth_weight" name="birth_weight" onChange={(e)=>setBirthWeight(e.target.value)}></textarea> 
                <br/>

                    {/* used in BPD calculator only */}
                <label>Singleton birth: </label>
                <DropdownMenu options={['True', 'False']} onChange={(e)=>setSingleton(e.target.value)}/>
                <br/>

                    {/* used in BPD calculator only */}
                <label>Antenatal Steroids: </label>
                <span className="sidenote">ANS should only be entered for postnatal day 1.</span>
                <DropdownMenu options={['True', 'False']} onChange={(e)=>setSteroids(e.target.value)}/>
                <br/>

                    {/* used in BPD calculator and EPBO calculator */}
                <label>Infant sex: </label>
                <DropdownMenu options={['Male', 'Female']} onChange={(e)=>setSex(e.target.value)}/>
                <br/>

                   {/* used in BPD calculator only */}
                <label htmlFor="ethnicity">Race / Ethnicity:  </label>
                <DropdownMenu options={['White', 'Black', 'Hispanic']} onChange={(e)=>setEthnicity(e.target.value)}/>
                <br/>

                <label htmlFor="ruptured_membrane"> Ruptured Membrane:  </label>
                <DropdownMenu options={['True', 'False']} onChange={(e)=>setRupturedMembrane(e.target.value)}/>
                <br/>

                <div id="length_of_ruptured_membrane" hidden>
                <label> Length of Ruptured Membrane:  </label><br/>
                <DropdownMenu options={[1, 2, 3, 4, 5, 6, 7, 8]} onChange={(e)=>setLengthOfRupturedMembrane(e.target.value)}/>
                <br/></div>

                <label htmlFor="pre_eclampsia"> Pre-eclampsia:  </label>
                <DropdownMenu options={['True', 'False']} onChange={(e)=>setPreEclampsia(e.target.value)}/>
                <br/>

                <br/>

                    {/* only relevant for the GPT prompt */}
                <label htmlFor="clinician_notes">Additional Notes:  </label>
                <br/>
                <textarea rows="9" cols="80" id="clinician_notes" name="clinician_notes" onChange={(e)=>setclinicianNotes(e.target.value)}></textarea> 
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
            {view === 'resume' && (
            <div>
                <div className='navBarTop'>
                <button onClick={() => setView('resume')}>View Resume</button> <br></br>
                <button onClick={() => setView('coverLetter')}>View cover letter</button> <br></br>
                <button onClick={() => setView('jobFit')}>View Assessment</button>
                </div>
                <div className='displayArea'>
                <p>Optimized Resume:</p>
                {/* <p dangerouslySetInnerHTML={{__html: ViewResume}} /> */}
                </div>
                <div className='bottomButtons'>
                <button onClick={() => window.location.reload()}>Reload</button>
                </div>
            </div>
            )}
            {view === 'coverLetter' && (
            <div>
                <div className='navBarTop'>
                <button onClick={() => setView('resume')}>View Resume</button> <br></br>
                <button onClick={() => setView('coverLetter')}>View cover letter</button> <br></br>
                <button onClick={() => setView('jobFit')}>View Assessment</button>
                </div>
                <div className='displayArea'>
                <p>Optimized Cover Letter: </p>
                {/* <p dangerouslySetInnerHTML={{__html: ViewCover}} /> */}
                </div>
            <div className='bottomButtons'>
                <button onClick={() => window.location.reload()}>Reload</button>
            </div>
            </div>
            )}
            {view === 'jobFit' && (
            <div>
                <div className='navBarTop'>
                    {/* we could use a simialr toggle for selecting what you want to create */}
                <button onClick={() => setView('resume')}>View Resume</button> <br></br>
                <button onClick={() => setView('coverLetter')}>View cover letter</button> <br></br>
                <button onClick={() => setView('jobFit')}>View Assessment</button>
                </div>
                <div className='displayArea'>
                <p> Assessment: </p>
                {/* <p dangerouslySetInnerHTML={{__html: ViewAssessment}} /> */}
                </div>
                <div className='bottomButtons'>
                <button onClick={() => window.location.reload()}>Reload</button>
                </div>
            </div>
            )}
        </section>
        </div>
    );
    
}

export default Main;

// GPT suggestions:
// Performance improvements:

//     Avoiding Multiple Render Triggers:
//  The useEffect hook is used to trigger certain actions 
// based on the values of optimizedResume, optimizedCover, jobSummary, 
// and assessment. However, it's important to note that the useEffect 
// hook is triggered on every render. To avoid unnecessary triggers, 
// you can consider using separate state variables for each action or 
// combining them into a single state object. This way, you can have 
// more granular control over when each action should be triggered.

//     Error Handling: 
// The code could benefit from better error handling in certain parts,
//  such as handling errors during API requests or displaying error 
//  messages to the user in case of failures. Consider implementing 
//  proper error handling and displaying user-friendly error messages 
//  when needed.

//     Conditional Rendering: The code uses conditional rendering 
// based on the view state variable. While this approach works, it 
// can become difficult to manage when the application grows with 
// more views and complex conditions. Consider using a router 
// library (e.g., React Router) to manage routing and rendering 
// different views based on the URL.

//     File Handling: 
// The code includes commented-out file
//  handling code. If file handling functionality is required, you 
//  can uncomment the code and make necessary modifications. 
//  However, ensure that appropriate error handling and validation 
//  are implemented to handle different scenarios and provide 
//  meaningful feedback to the user.

//     Code Cleanup: 
// There are commented-out sections of code that are not being 
// used. It's a good practice to remove such unused code to keep the codebase clean and 
// maintainable.