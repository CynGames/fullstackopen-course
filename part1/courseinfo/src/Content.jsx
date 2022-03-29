import React from 'react'
import Part from './Part'

const Content = ({ parts }) =>
{


    return (
        <>
            <Part part={ parts[0].name } numExercises={ parts[0].exercises } />
            <Part part={ parts[1].name } numExercises={ parts[1].exercises } />
            <Part part={ parts[2].name } numExercises={ parts[2].exercises } />
        </>
    )
}

export default Content