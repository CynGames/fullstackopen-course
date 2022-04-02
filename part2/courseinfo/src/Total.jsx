import React from 'react'

const Total = ({ parts }) =>
{

    const mappedExercises = parts.map((part) => part.exercises)

    return (
        <p>Number of exercises { mappedExercises.reduce((prev, curr) => prev + curr, 0) }</p>
    )
}

export default Total