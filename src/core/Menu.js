import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import { signout,isAuthenticated  } from '../auth/helper';


const currentTab=(history,path)=>{

    // if path changes ...give diff color to link
    if(history.location.pathname===path)
    {
        return {color:"#2ecc72"}
    }
    else{
        return {color: "#FFFFFF"}
    }
};
// history is given to us by link...as props in menu
const Menu = ({history}) => {
    return ( 
        <div>
            <ul 
            style={{cursor:'pointer'}}className=" nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history,"/")}
                     className="nav-link" to="/">
                            Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/cart")}
                     className="nav-link"
                     to="/cart">
                            cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role===0 && (  // if user is Normal user
                    <li  className="nav-item">
                    <Link style={currentTab(history,"/user/dashboard")}
                     className="nav-link" 
                     to="/user/dashboard">
                            U.Dashboard
                    </Link>
                </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role===1 && (  // if user is Admin
                    <li  className="nav-item">
                    <Link style={currentTab(history,"/admin/dashboard")}
                     className="nav-link" 
                     to="/admin/dashboard">
                            A. Dashboard
                    </Link>
                </li>
                )}
                {!isAuthenticated() &&(
                    <Fragment>
                <li  className="nav-item">
                    <Link style={currentTab(history,"/signup")}
                     className="nav-link" 
                     to="/signup">
                            Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signin")}
                     className="nav-link" 
                     to="/signin">
                            Signin
                    </Link>
                </li>
                </Fragment>
                )}
                { isAuthenticated() && (            // only show signout button when user is signed In
                <li className="nav-item">
                    <span style={{color:'yellow'}} className="nav-link"
                    onClick={()=>{
                        signout(()=>{
                            history.push("/")
                        })
                    }}
                    >
                        SignOut
                    </span>
                </li>)}
            </ul>
        </div>
     );
}
 
export default withRouter(Menu);