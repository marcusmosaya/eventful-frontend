import React from "react";
import { Link } from "react-router-dom";
function Bar(){
    return(
        <>
           <nav className="navbar navbar-expand-sm bg-primary">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link className="nav-link" to="#"><em className="h5 text-white">Eventful.com</em></Link>
                  </li>
                </ul>
            </nav>
        </>
    )
}
export default Bar;