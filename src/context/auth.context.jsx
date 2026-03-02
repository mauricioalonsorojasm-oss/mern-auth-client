import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext()

function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isAuthenticatingUser,setIsAuthenticatingUser] = useState (true)

  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    loggedUserId,
    setLoggedUserId
  }

  useEffect(() => {

    authenticateUser();
    
  }, [])    
  const authenticateUser = async () => {
  const token = localStorage.getItem("authToken")

  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setIsLoggedIn(true);
    setLoggedUserId (response.data.payload._id);
    setIsAuthenticatingUser(false)

    console.log (response)
    
  } catch (error) {
    console.log(error)

    setIsLoggedIn(false)
    setLoggedUserId(null)
    setIsAuthenticatingUser(false)
  }
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}