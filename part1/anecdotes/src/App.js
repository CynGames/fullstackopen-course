import { useState } from 'react'

const App = () =>
{
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

    const voteAnecdote = () =>
    {
        const copy = [...points]
        copy[selected] += 1

        setPoints(copy)
    }


    const getRandomNumber = () =>
    {
        let min = 0
        let max = anecdotes.length

        min = Math.ceil(min);
        max = Math.floor(max);

        let randomNumber = Math.floor(Math.random() * (max - min) + min)

        while (randomNumber === selected)
        {
            randomNumber = Math.floor(Math.random() * (max - min) + min)
        }

        return randomNumber
    }

    const getHighestVoted = () => 
    {
        let highestVoted = points[0];
    
        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            
            if (highestVoted === current) continue

            if (current > highestVoted)
            {
                highestVoted = current
            }
        }

        return points.indexOf(highestVoted)
    }



    return (
        <>
            <h1>Anecdote of the day</h1>
            { anecdotes[selected] }
            <br />
            has { points[selected] } votes
            <br />

            <button onClick={ () => setSelected(getRandomNumber()) }>Next Anecdote</button>

            <button onClick={ () => voteAnecdote() }>Vote Anecdote</button>

            <h1>Anecdote with most votes</h1>
            { anecdotes[getHighestVoted()] }
        </>
    )
}

export default App