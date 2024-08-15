import React from "react";
import nortonLogo from './../../images/norton.png';
import uoflHealthLogo from './../../images/uoflHealthLogo.png';

const Home = () => {
    return(
        <div className="app">
            <div className="main">
            <h2>Neonatal AI <img src={nortonLogo} alt="norton logo"/> <img src={uoflHealthLogo} alt="uofl logo"/></h2>
                <h2>
                Welcome to Neonatal.AI - an LLM enabled advocacy tool for healthcare practitioners in the NICU!
                </h2>
            </div>
            
        </div>
    )
}
export default Home;