import React from 'react'
import Button from './Button'
import Title from './Title'

const Feedback = ({updateGood, updateNeutral, updateBad}) =>
{

    return (
        <>
            <Title msg={ "give feedback" } />

            <Button buttonLabel={"good"} callback={updateGood}/>
            <Button buttonLabel={"neutral"} callback={updateNeutral}/>
            <Button buttonLabel={"bad"} callback={updateBad}/>
        </>
    )
}

export default Feedback