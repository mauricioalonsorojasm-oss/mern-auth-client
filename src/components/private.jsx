import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Navigate } from "react-router-dom";


function Private(props){

    const {isLoggedIn} = useContext(AuthContext);

    if (!isLoggedIn){
        return <Navigate to="/login" />
    }
  return props.children;
  
    }

    export default Private;