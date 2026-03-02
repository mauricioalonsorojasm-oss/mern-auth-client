import axios from "axios";
import { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState (null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password){
      setErrorMessage (" All fields are required (email, username and password)")
      return
    }

    const body = { email, username, password };
    console.log("Signup form submitted with data:", body);

    // ... contact backend to register the user

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, body)
      console.log("user registered", response)
      navigate("/login")

    } catch (error){
      console.log(error)
      if (error.response.status === 400){
        console.log 
        setErrorMessage(error.response.data.errorMessage)
      }
       else {
        //here you should to navigate to error page
      }
    }




  };

  return (
    <div>

      <h1>Signup Form</h1>
    
      <form onSubmit={handleSignup}>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          //required ={true}
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          //required ={true}
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          //required ={true}
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Signup</button>

        {errorMessage && <p>{errorMessage} </p>}


      </form>
      
    </div>
  );
}

export default Signup;
