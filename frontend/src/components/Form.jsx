import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import "../styles/Form.css";

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, {
                username,
                password,
            });

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Invalid Credential Error:", error);
            
        } finally {
            setLoading(false);
        }
    };

    const name = method === "login" ? "Login" : "Register"

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{name}</h2>
            <input
                type="text"
                placeholder="Username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className="form-button" type="submit">{name}</button>
        </form>
    );
}

export default Form;