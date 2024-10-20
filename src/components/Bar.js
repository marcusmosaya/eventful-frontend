import React from "react";
import { Link } from "react-router-dom";
function Bar(){
    return(
        <>
           <nav className="navbar navbar-expand-sm bg-white" style={{borderBottom:' 2px solid black'}}>
              <ul className="navbar-nav">
                  <li className="nav-item mx-2">
                      <Link className="nav-link" to="#"><em className="h5 text-primary">EVENTFUL</em></Link>
                  </li>
                </ul>
            </nav>
        </>
    )
}
export default Bar;