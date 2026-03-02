import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();

  const { isLoggedIn,setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);   

  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setLoggedUserId(null);
    navigate("/login");

  

  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ?(
        <> 
        <Link to="/private-page-example">Private Page Example</Link>
      <button onClick={handleLogout}>Logout</button>
      </>
  ) : (
     <>   
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      </>
  )}  
     
      
    </nav>
  );
}

export default Navbar;
