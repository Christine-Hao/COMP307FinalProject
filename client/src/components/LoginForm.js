// backup version ???
import React, {useState} from 'react';
import axios from 'axios';

const loginForm = ({onLogin}) => {

    // useState hook returns an array of: state variable + setter function to update the variable
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:3000/api/users/login",{
                username,
                password,
            });
            onLogin(response.data.token);
        }catch{
            setError("Invalid identity.")
        }
    };

    return(
        <form onSubmit={handleSubmit}> 
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}

        </form>
    )
};

export default LoginForm;