import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        username,
        password,
      }, { withCredentials: true });
      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data || "Login error");
    }
  };

  return (
    <div style={{margin:" auto", display:"flex", justifyContent:"space-evenly", flexDirection:"column", backgroundColor:"black", width:"300px", height:"400px", padding:"20px", borderRadius:"20px"}}>
      <label style={{color:"#ffff"}}>
        <h2>
        Login Form
        </h2>
      </label>
      <input style={{padding:"12px"}}  type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input style={{padding:"12px"}} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button style={{width:"140px",margin:"0 auto"}} onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
