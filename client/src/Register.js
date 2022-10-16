
import { post } from "./utilities"
import { useState } from "react"
import "./Auth.css"

function Register() {
    const universities = ["Drexel University", "Harvard University", "MIT", "Villanova University"]
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [university, setUniversity] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        post('/api/register', {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password,
            'university': university
        }).then(res => console.log(res))
    }
    const changeFirstname = (event) => {
        setFirstname(event.target.value)
    }
    const changeLastname = (event) => {
        setLastname(event.target.value)
    }
    const changeEmail = (event) => {
        setEmail(event.target.value)
    }
    const changePassword = (event) => {
        setPassword(event.target.value)
    }
    const changeUniversity = (event) => {
        setUniversity(event.target.value)
    }
    return <div className="form-container">
        <form onSubmit={handleSubmit}>
            <input name="firstname" type="text" placeholder="First Name" onChange={changeFirstname} required />
            <input name="lastname" type="text" placeholder="Last Name" onChange={changeLastname} required />
            <input name="email" type="email" placeholder="Email Address" onChange={changeEmail} required />
            <input name="password" type="password" placeholder="Password" onChange={changePassword} required />
            <select value={university} onChange={changeUniversity}>
                {
                    universities.map((uni) => <option value={uni}>{uni}</option>)
                }
            </select>
            <input type="submit" value="Sign up" />
        </form>
    </div>
}

export default Register