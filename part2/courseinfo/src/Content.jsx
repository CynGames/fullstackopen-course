import React from 'react'
import Part from './Part'

const Content = ({ parts }) =>
{

    return (
        <>
            { parts.map(part => <Part key={part.id} part={ part.name } numExercises={ part.exercises } />) }
        </>
    )
}

export default Content