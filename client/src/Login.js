import { post } from "./utilities"
import { useState } from "react"
import "./Auth.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        post('/api/login', {
            'email': email,
            'password': password
        }).then(res => console.log(res))
    }
    const changeEmail = (event) => {
        setEmail(event.target.value)
    }
    const changePassword = (event) => {
        setPassword(event.target.value)
    }
    return <div className="form-container">
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email Address" onChange={changeEmail} required />
            <input name="password" type="password" placeholder="Password" onChange={changePassword} required />
            <input type="submit" value="Sign in" />
        </form>
    </div>
}

export default Login