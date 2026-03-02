import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";

function Login() {

  const { setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState (null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contact backend to validate user credentials

    const body= {email, password}

    try {

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, body)
      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      navigate ("/private-page-example");

    } catch (error){
      console.log(error)
      if (error.response.status === 400){
        console.log 
        setErrorMessage(error.response.data.errorMessage)
      } else {
        //here you should to navigate to error page
      }
    }
  };

  return (
    <div>

      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>
      </form>
       {errorMessage && <p>{errorMessage} </p>}
    </div>
  );
}

export default Login;
