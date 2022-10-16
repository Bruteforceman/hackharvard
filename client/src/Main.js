import { get, post } from "./utilities"
import { useEffect, useState } from "react"
import "./slot.css"

const sports = ['Football', 'Volleyball', 'Basketball', 'Soccer']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

function Main() {
    const [user, setUser] = useState(null)
    const [fields, setFields] = useState(null)
    const [selectedFields, setSelectedFields] = useState(null)
    const [selectedSports, setSelectedSports] = useState(null)
    const [selectedTimes, setSelectedTimes] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const dbUser = await get('/api/whoami')
            const uniDetails = await post('/api/getuniversitydetails', {
                'university': dbUser.university
            })
            setFields(uniDetails.fields)
            if(dbUser.success) {
                setUser(dbUser)
                setSelectedFields(dbUser.fields)
                setSelectedSports(dbUser.sports)
                setSelectedTimes(dbUser.times)
            }
        }
        fetch()
    }, [])
    const selectField = (event, i) => {
        if(selectedFields.some(field => field === event.target.name)) {
            setSelectedFields(selectedFields.filter(field => field !== event.target.name))
        } else {
            setSelectedFields(selectedFields.concat([event.target.name]))
        }
    }
    const selectSport = (event, i) => {
        if(selectedSports.some(sport => sport === event.target.name)) {
            setSelectedSports(selectedSports.filter(sport => sport !== event.target.name))
        } else {
            setSelectedSports(selectedSports.concat([event.target.name]))
        }
    }
    const rowMajor = (i, j) => {
        return i * 24 + j
    }
    const selectTime = (event, i, j) => {
        const ind = rowMajor(i, j)
        if(selectedTimes.some(time => time === ind)) {
            setSelectedTimes(selectedTimes.filter(time => time !== ind))
        } else {
            setSelectedTimes(selectedTimes.concat([ind]))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        post('/api/playlater', {
            'sports': selectedSports,
            'fields': selectedFields,
            'times': selectedTimes
        })
    }

    useEffect(() => {
        console.log(selectedFields)
    }, [selectedFields])

    useEffect(() => {
        console.log(selectedSports)
    }, [selectedSports])

    return (user === null || fields === null) ? <p>You need to be logged in</p> : (<div>
        <p>Name: {user.email} </p>
        <p>University: {user.university} </p>
        <form onSubmit={handleSubmit}>
            <div className="wrapper">
                <div className="field-wrapper">
                {
                    fields.map((field, i) => (
                    <>
                        <input type="checkbox" id={`field${i}`} key={`field${i}`} name={field} onChange={e => selectField(e, i)} defaultChecked={selectedFields.some(item => item === field)}/>
                        <label htmlFor={`field${i}`} key={`field_label${i}`}> {field} </label><br />
                    </>
                    ))
                }
                </div>
                <div className="sport-wrapper">
                {
                    sports.map((sport, i) => (
                    <>
                        <input type="checkbox" id={`sport${i}`} key={`sport${i}`} name={sport} onChange={e => selectSport(e, i)} defaultChecked={selectedSports.some(item => item === sport)} />
                        <label htmlFor={`sport${i}`} key={`sport_label${i}`}> {sport} </label><br />
                    </>
                    ))
                }
                </div>
                <div className="team-wrapper">
                </div>
                <div className="time-wrapper">
                <table>
                    <tr>
                        <th></th>
                        { hours.map(i => <td>{i}</td> ) }
                    </tr>
                    { days.map((day, j) => <tr><th>{day}</th> { 
                        hours.map(i => <td className={selectedTimes.some(time => time === rowMajor(j, i)) ? 
                        "time time-selected" : "time time-normal" } onClick={e => selectTime(e, j, i)}></td> ) } </tr>) }
                </table>
                </div>
                <div className="game-wrapper"></div>
            </div>
            <input type="submit" value="Submit" />
        </form>
    </div>)
}

export default Main;