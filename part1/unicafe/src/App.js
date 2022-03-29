import { useState } from 'react'
import Feedback from './Feedback'
import Statistics from './Statistics'

const App = () =>
{
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const updateGood = () => setGood(good + 1)
    const updateNeutral = () => setNeutral(neutral + 1)
    const updateBad = () => setBad(bad + 1)

    return (
        <div>
            <Feedback updateGood={updateGood} updateNeutral={updateNeutral} updateBad={updateBad} />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App