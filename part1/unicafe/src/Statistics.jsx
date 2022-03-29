import React from 'react'
import StatisticsLine from './StatisticsLine'
import Title from './Title'

const Statistics = ({ good, neutral, bad }) =>
{
    let all = good + neutral + bad
    let posFeedback = (good / all) * 100

    if (all === 0)
    {
        return (
            <>
                <Title msg={ "statistics" } />
                <div> No feedback given </div>
            </>
        )
    }

    return (
        <>
            <Title msg={ "statistics" } />

            <StatisticsLine text={ "good" } value={ good } />
            <StatisticsLine text={ "neutral" } value={ neutral } />
            <StatisticsLine text={ "bad" } value={ bad } />
            <StatisticsLine text={ "all" } value={ all } />
            <StatisticsLine text={ "average" } value={ (good - bad) / all } />
            <StatisticsLine text={ "positive" } value={ posFeedback } endText="%" />
        </>
    )
}

export default Statistics