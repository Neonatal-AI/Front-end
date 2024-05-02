import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import GradientButton from '../common/GradientButton'


const TOS = () => { 

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'

  const navigate = useNavigate()
  const [banner, setBanners] = useState(null);
  const [ loginLoading, setLoginLoading ] = useState(false)
  
  // meat and potatoes of the login page
  const loginAttempt = async () => {
    setLoginLoading(true)
    const options = {
      method: "POST",
      body: JSON.stringify({
          username: username,
          password: password,
      }),
      headers:{
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
    try{
      const response = await fetch(`${API_URL}/login`, options)
      const data = await response.json()

      if (data.message === "Login Successful") {        
        setBanners("Congrats. Login successful.")
        setTimeout(() => {
          navigate('/main')
          window.location.reload()
        }, 1500);
        
      }else if (data.message === "Incorrect Password" || data.message === "Incorrect Uname") {
        setBanners("Improper credentials! try again or register a new account.")
      }
    return data
    } catch(error){
    console.error(error)
    }
}
  const handleSubmit = (event) => {
    event.preventDefault()
    loginAttempt()
  }
  // Get current date and time
  var now = new Date();
  var datetime = now.toLocaleString();

  // Insert date and time into HTML
  return (
    <div>
      <form className='TOS' onSubmit={handleSubmit}></form>
        <h2>Terms of Service Agreement</h2>
          <p><strong>Effective Date:</strong> <pre dangerouslySetInnerHTML={{__html: datetime}}></pre></p>

          <h3>1. Acceptance of Terms</h3>
          <p>This Terms of Service Agreement ("Agreement") governs your access and use of the [Your Application Name] web application ("Service"), provided by [Your Company Name] ("Company," "we," "us," or "our"). By accessing or using the Service, you ("User" or "you") agree to be bound by this Agreement and our Privacy Policy. If you do not agree to these terms, do not use the Service.</p>

          <h3>2. Description of Service</h3>
          <p>The Service utilizes generative artificial intelligence (AI) technologies to assist healthcare professionals in patient advocacy and documentation within neonatal healthcare settings. The Service offers tools to generate, summarize, and analyze patient data and information to support healthcare delivery.</p>

          <h3>3. User Responsibilities</h3>
          <p>As a user, you agree to:</p>
          <ul>
          <li>Use the Service only for lawful purposes in compliance with all applicable laws and regulations.</li>
          <li>Ensure data input into the Service is accurate and up-to-date.</li>
          <li>Review and validate the Service’s outputs before use or reliance for any clinical decisions or patient care activities.</li>
          <li>Use the Service as a supplementary tool and not as a sole decision-making source in patient care.</li>
          </ul>

          <h3>4. Limitations of AI Generated Content</h3>
          <p>You acknowledge and agree that:</p>
          <ul>
          <li>The AI in the Service functions based on algorithms and data inputs that may not encompass all possible neonatal care nuances and specificities.</li>
          <li>The Service may generate outputs that could contain inaccuracies or "hallucinations" (i.e., generated information that is not based on factual data).</li>
          <li>Reliance on any information provided by the Service is strictly at your own risk.</li>
          </ul>

          <h3>5. Intellectual Property</h3>
          <p>All intellectual property rights in the Service, including but not limited to software, algorithms, interfaces, text, and graphics, are owned by or licensed to us and are protected under copyright and intellectual property laws. You are granted a non-exclusive, non-transferable, limited license to access and use the Service for your professional use subject to these terms.</p>

          <h3>6. Disclaimers</h3>
          <p>The Service is provided "AS IS" and "AS AVAILABLE" without any warranties, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will always be uninterrupted, timely, secure, or error-free.</p>

          <h3>7. Limitation of Liability</h3>
          <p>In no event shall the Company, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

          <h3>8. Indemnification</h3>
          <p>You agree to defend, indemnify, and hold harmless the Company and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these terms, or c) Content posted on the Service.</p>

          <h3>9. Modifications to the Agreement</h3>
          <p>We reserve the right, at our sole discretion, to amend or update these terms at any time. You are advised to review these terms periodically for any changes. Changes to these terms are effective when they are posted on this page.</p>

          <h3>10. Termination</h3>
          <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.</p>

          <h3>11. Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.</p>

          <h3>12. Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us at [Your Contact Information].</p>

          <p>By using the Service, you acknowledge that you have read, understood, and agree to be bound by this Agreement.</p>
          <GradientButton 
            type="submit" 
            text="ACCEPT"
            loading={loginLoading}
          />
    </div>
  )
}
export default TOS